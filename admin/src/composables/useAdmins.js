import { ref } from 'vue'
import { adminFetch } from './useAdminApi'

export function useAdmins() {
  const admins = ref([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref(null)

  async function fetchAdmins() {
    loading.value = true
    error.value = null
    try {
      const res = await adminFetch('/admin/admins')
      if (res !== null) admins.value = res
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function mutate(method, path, payload) {
    saving.value = true
    error.value = null
    try {
      const res = await adminFetch(`/admin/admins${path}`, { method, body: payload })
      if (res === null) return false
      await fetchAdmins()
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      saving.value = false
    }
  }

  return {
    admins,
    loading,
    saving,
    error,
    fetchAdmins,
    createAdmin: (payload) => mutate('POST', '', payload),
    deleteAdmin: (id) => mutate('DELETE', `/${id}`),
  }
}
