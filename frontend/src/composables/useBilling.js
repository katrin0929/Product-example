import { ref } from "vue";
import { authFetch } from "./useApi";

const BASE_URL = "http://localhost:3009";

export function useBilling() {
    async function getPaymentMethods() {
        const res = await authFetch(`${BASE_URL}/payment-methods`, {
            method: "GET",
        });
        
        
        const data = await res.json();
        console.log(data);
        
        return data;
    }
    return { getPaymentMethods };
}

