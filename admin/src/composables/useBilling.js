import { ref } from 'vue'
import { adminFetch } from './useAdminApi'
import router from '../router'
import { BASE_URL, getToken, clearToken } from '../utils'

export function useBilling() {
  const checkouts = ref([])
  const payments = ref([])
  const invoices = ref([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref(null)

  async function fetchList(path, target) {
    const res = await adminFetch(path)
    if (res !== null) target.value = res
  }

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      await Promise.all([
        fetchList('/admin/checkouts', checkouts),
        fetchList('/admin/payments', payments),
        fetchList('/admin/invoices', invoices),
      ])
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // POST-действие + перечитывание всех списков (дёшево, вкладки остаются консистентными)
  async function mutate(path) {
    saving.value = true
    error.value = null
    try {
      const res = await adminFetch(path, { method: 'POST' })
      if (res === null) return false
      await fetchAll()
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      saving.value = false
    }
  }

  // adminFetch парсит JSON, поэтому скачивание файла делает собственный fetch -> blob -> <a download>
  async function downloadInvoice(invoiceId, number) {
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/admin/invoices/${invoiceId}/download`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      if (res.status === 401) {
        clearToken()
        router.push('/login')
        return
      }
      if (!res.ok) throw new Error(`Download failed (${res.status})`)

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${number}.html`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      error.value = e.message
    }
  }

  return {
    checkouts,
    payments,
    invoices,
    loading,
    saving,
    error,
    fetchAll,
    cancelCheckout: (id) => mutate(`/admin/checkouts/${id}/cancel`),
    refundPayment: (id) => mutate(`/admin/payments/${id}/refund`),
    downloadInvoice,
  }
}
