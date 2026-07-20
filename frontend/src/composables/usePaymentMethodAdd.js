import router from "@/router";
import { authFetch } from "./useApi";
import { ref } from "vue";

const BASE_URL = "http://localhost:3009";


export function usePaymentMethodAdd() {

  const jsonHeaders = { "Content-Type": "application/json" };
  let defaultState = {};
  const error = ref(null);

  async function readError(res, fallback) {
    const body = await res.json().catch(() => null);
    return body?.message || fallback;
  }

  async function saveCard(paymentSettings) {
    error.value = null;

    const fields = [
      "cardNumber",
      "cardholderName",
      "expMonth",
      "expYear",
      "isDefault",
    ];
    const data1 = fields.reduce((acc, field) => {
      if (defaultState[field] !== paymentSettings[field]) {
        acc[field] = paymentSettings[field];
      }
      return acc;
    }, {});

    const data = { ...data1 };
    const res = await authFetch(`${BASE_URL}/payment-methods`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(data),
    });


    if (!res.ok) {
      error.value = await readError(res, `Save failed (${res.status})`);
      return null;
    }

    const mt = await res.json();
    defaultState = { ...mt };
    if(res.ok) {
        router.push('/Billing')
    }

    return mt;
  }
  return { saveCard, error };
}