import { ref } from 'vue'
import router from '../router'
import { BASE_URL, getToken, setToken, clearToken } from '../utils'

export function useAdminAuth() {
  const admin = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function readError(res, fallback) {
    const body = await res.json().catch(() => null)
    return body?.message || fallback
  }

  async function signIn(email, password) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        error.value = await readError(res, `Login failed (${res.status})`)
        return false
      }
      const data = await res.json()
      setToken(data.accessToken, data.expiresIn)
      admin.value = data.admin
      router.push('/')
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchMe() {
    try {
      const res = await fetch(`${BASE_URL}/admin/auth/me`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      if (res.status === 401 || res.status === 403) {
        signOut()
        return null
      }
      if (!res.ok) return null
      admin.value = await res.json()
      return admin.value
    } catch {
      return null
    }
  }

  function signOut() {
    clearToken()
    admin.value = null
    router.push('/login')
  }

  return { admin, loading, error, signIn, fetchMe, signOut }
}
