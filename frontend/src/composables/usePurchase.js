import { ref } from "vue";
import { authFetch } from "./useApi";
import router from "../router/index";

 export function usePurchase() {
    const BASE_URL = "http://localhost:3009";
    const products = ref([]);
    const jsonHeaders = { "Content-Type": "application/json" };
    

    async function fetchProducts() {

        try {
        const res = await authFetch(`${BASE_URL}/products`, {
            method: "GET",
        });
        if (!res.ok) throw new Error(`Failed to load documents (${res.status})`);
        const items = await res.json();
        console.log(items);
        
        products.value = items.map(toCreditPack);
        } catch (e) {
        console.log(e.message);
        }
    }

    function toCreditPack(item) {
        return { qty: item.credits, id: item.id, price: item.amount, subtotal: item.amount, popular: false, select: false };
        
    }

    async function createCheckout(productId) {
      const res = await authFetch(`${BASE_URL}/checkout`, {      
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({
          productId,
        }),
      });
      const data = await res.json()
      const paymentUrl = data.paymentUrl.match(/\/pay.*/)[0];

      if (res.ok) {
        router.push(paymentUrl)
      }
    }
    return { fetchProducts, products, createCheckout };

 }