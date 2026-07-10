import router from '../router'
import { BASE_URL, getToken, clearToken } from '../utils'

// Общий fetch-helper админки.
// Возвращает распарсенный JSON (или true для 204); null — если случился 401 и мы ушли на /login.
// Прочие ошибки бросает Error(message) с текстом из тела ответа.
export async function adminFetch(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    clearToken()
    router.push('/login')
    return null
  }

  if (!res.ok) {
    const payload = await res.json().catch(() => null)
    throw new Error(payload?.message || `Request failed (${res.status})`)
  }

  return res.status === 204 ? true : res.json()
}
