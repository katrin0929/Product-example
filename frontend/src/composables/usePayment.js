import { ref } from "vue";

const BASE_URL = "http://localhost:3009";

// Публичная страница оплаты: эндпоинты checkout не требуют auth-заголовков
export function usePayment() {
  const checkout = ref(null);
  const loading = ref(false);
  const processing = ref(false);
  const notFound = ref(false);
  const error = ref(null);

  async function fetchCheckout(checkoutId) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${BASE_URL}/checkout/${checkoutId}`);
      if (res.status === 404) {
        notFound.value = true;
        return null;
      }
      if (!res.ok) throw new Error(`Failed to load checkout (${res.status})`);
      checkout.value = await res.json();
      return checkout.value;
    } catch (e) {
      error.value = e.message;
      return null;
    } finally {
      loading.value = false;
    }
  }

  // action: 'pay' | 'decline'; возвращает итоговый статус или null при ошибке
  async function submitOutcome(checkoutId, action) {
    processing.value = true;
    error.value = null;
    try {
      const res = await fetch(`${BASE_URL}/checkout/${checkoutId}/${action}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Payment request failed (${res.status})`);
      if (checkout.value) checkout.value = { ...checkout.value, status: data.status };
      return data.status;
    } catch (e) {
      error.value = e.message;
      return null;
    } finally {
      processing.value = false;
    }
  }

  return {
    checkout,
    loading,
    processing,
    notFound,
    error,
    fetchCheckout,
    pay: (checkoutId) => submitOutcome(checkoutId, "pay"),
    decline: (checkoutId) => submitOutcome(checkoutId, "decline"),
  };
}
