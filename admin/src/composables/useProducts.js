import { ref } from 'vue'
import router from '../router'
import { BASE_URL, getToken, clearToken } from '../utils'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref(null)

  function authJsonHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    }
  }

  async function readError(res, fallback) {
    const body = await res.json().catch(() => null)
    return body?.message || fallback
  }

  function handleUnauthorized(res) {
    if (res.status === 401) {
      clearToken()
      router.push('/login')
      return true
    }
    return false
  }

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/admin/products`, {
        headers: authJsonHeaders(),
      })
      if (handleUnauthorized(res)) return
      if (!res.ok) throw new Error(await readError(res, `Failed to load packs (${res.status})`))
      products.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // method: 'POST' | 'PATCH' | 'DELETE'; после успеха перечитывает список
  async function mutate(method, path, payload) {
    saving.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/admin/products${path}`, {
        method,
        headers: authJsonHeaders(),
        body: payload !== undefined ? JSON.stringify(payload) : undefined,
      })
      if (handleUnauthorized(res)) return false
      if (!res.ok) {
        error.value = await readError(res, `Request failed (${res.status})`)
        return false
      }
      await fetchProducts()
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      saving.value = false
    }
  }

  return {
    products,
    loading,
    saving,
    error,
    fetchProducts,
    createProduct: (payload) => mutate('POST', '', payload),
    updateProduct: (id, payload) => mutate('PATCH', `/${id}`, payload),
    deleteProduct: (id) => mutate('DELETE', `/${id}`),
  }
}
