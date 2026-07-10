import { ref } from 'vue'
import { adminFetch } from './useAdminApi'

export function useUsers() {
  const users = ref([])
  const detail = ref(null) // { user, summary } из GET /admin/users/:id
  const loading = ref(false)
  const saving = ref(false)
  const error = ref(null)

  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const res = await adminFetch('/admin/users')
      if (res !== null) users.value = res
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchUser(userId) {
    error.value = null
    try {
      const res = await adminFetch(`/admin/users/${userId}`)
      if (res !== null) detail.value = res
    } catch (e) {
      error.value = e.message
    }
  }

  // После успешной мутации перечитывает список и открытую detail-панель
  async function mutate(method, path, payload) {
    saving.value = true
    error.value = null
    try {
      const res = await adminFetch(path, { method, body: payload })
      if (res === null) return false
      await fetchUsers()
      if (detail.value) {
        await fetchUser(detail.value.user.id).catch(() => {
          detail.value = null
        })
      }
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      saving.value = false
    }
  }

  function deleteUser(userId) {
    if (detail.value?.user.id === userId) detail.value = null
    return mutate('DELETE', `/admin/users/${userId}`)
  }

  return {
    users,
    detail,
    loading,
    saving,
    error,
    fetchUsers,
    fetchUser,
    updateUser: (id, payload) => mutate('PATCH', `/admin/users/${id}`, payload),
    blockUser: (id) => mutate('POST', `/admin/users/${id}/block`),
    unblockUser: (id) => mutate('POST', `/admin/users/${id}/unblock`),
    deleteUser,
  }
}
