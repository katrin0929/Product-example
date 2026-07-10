export const BASE_URL = 'http://localhost:3009'

// Отдельный ключ, чтобы не пересекаться с 'tokens' основного клиента
const TOKEN_KEY = 'admin_tokens'

export function getToken() {
  try {
    return JSON.parse(localStorage.getItem(TOKEN_KEY))?.accessToken ?? null
  } catch {
    return null
  }
}

export function setToken(accessToken, expiresIn) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ accessToken, expiresIn }))
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}
