import { ref } from "vue";
import { authFetch } from "./useApi";


const BASE_URL = "http://localhost:3009";



export function usePaymentMethodEdit() {
    const data = ref({
      cardholderName: "",
      expMonth: "",
      expYear: "",
      isDefault: true,
    });

    let defaultState = {};

    async function savePaymentMethod(paymentMethodId, newSettings) {
      
      const fields = [
        "cardholderName",
        "expMonth",
        "expYear",
        "isDefault",
      ];

      console.log(fields);

      console.log(defaultState);
      console.log(newSettings);
      
      
      const data = fields.reduce((acc, field) => {
        if (defaultState[field] !== newSettings[field]) {
          acc[field] = newSettings[field];
        }
        return acc;
      }, {});
    
      

      const res = await authFetch(`${BASE_URL}/payment-methods/${paymentMethodId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      return await res.json();
    }

    async function getPaymentMethod(paymentMethodId) {
      const res = await authFetch(
        `${BASE_URL}/payment-methods/${paymentMethodId}`,
        {
          method: "GET",
        },
      );

      const paymentData = await res.json();
      data.value.cardholderName = paymentData.cardholderName
      data.value.expMonth = paymentData.expMonth
      data.value.expYear = paymentData.expYear
      data.value.isDefault = paymentData.isDefault
    }
    return { savePaymentMethod, getPaymentMethod, data }
}