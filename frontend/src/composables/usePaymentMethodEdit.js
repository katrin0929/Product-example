import { ref } from "vue";
import { authFetch } from "./useApi";


const BASE_URL = "http://localhost:3009";



export function usePaymentMethodEdit() {

    let defaultState = {};

    async function savePaymentMethod(paymentMethodId, newSettings) {
      
      const fields = [
        "cardholderName",
        "expiryMonth",
        "expiryYear",
        "checkbox",
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
    return { savePaymentMethod }
}