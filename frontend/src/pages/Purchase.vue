<script setup>
import { usePurchase } from "@/composables/usePurchase";
import { onMounted, ref } from "vue";

const { fetchProducts, products, createCheckout } = usePurchase()

const curProductId = ref('')
const subtotal = ref(0)

const creditPacks = ref([
  { qty: 5, price: '$20', popular: false, select: true },
  { qty: 14, price: '$56', popular: true, select: false },
  { qty: 30, price: '$120', popular: false, select: false },
])

const selectPack = (qty, productId, amount) => {
  curProductId.value = productId;
  subtotal.value = amount 
   console.log(subtotal.value);
  products.value.forEach((pack) => {
    pack.select = pack.qty === qty
  })
}

onMounted(() => {
  fetchProducts()
  
})
</script>

<template>
  <main class="p-8 max-w-2xl mx-auto space-y-8">
    <router-link :to="{ name: 'Billing' }" class="inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-lg">arrow_back</span>
      Back to Billing
    </router-link>

    <div class="space-y-2">
      <h1 class="text-4xl font-extrabold text-on-surface tracking-tight headline">Make a Purchase</h1>
      <p class="text-on-surface-variant text-sm max-w-xl">One-time purchase of Pro Credits. No subscription.</p>
    </div>

    <div class="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-5">
      <div class="grid grid-cols-3 gap-2">
        <button @click="selectPack(pack.qty, pack.id, pack.subtotal)"
          v-for="pack in products"
          :key="pack.qty"
          type="button"
          :class="pack.select
            ? 'relative flex flex-col items-center gap-0.5 py-3 rounded-lg border-2 border-primary bg-indigo-50/60 text-primary'
            : 'flex flex-col items-center gap-0.5 py-3 rounded-lg border border-outline-variant/30 text-on-surface hover:border-primary/40 hover:bg-indigo-50/40 transition-colors'"
        >
          <span v-if="pack.popular" class="absolute -top-2 right-2 text-[0.5625rem] font-bold bg-primary text-on-primary px-1.5 py-0.5 rounded-full">Popular</span>
          <span class="text-lg font-extrabold headline">{{ pack.qty }}</span>
          <span :class="pack.popular ? 'text-[0.625rem]' : 'text-[0.625rem] text-on-surface-variant'">{{ pack.subtotal }}</span>
        </button>
      </div>
      <div>
        <label class="text-xs font-medium text-on-surface-variant">Promo code</label>
        <div class="flex gap-2 mt-1.5">
          <input value="ATELIER20" class="flex-1 min-w-0 bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm font-medium tracking-wide uppercase text-on-surface placeholder:text-slate-400 placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim" placeholder="Enter code"/>
          <button type="button" class="px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold hover:bg-surface-container-highest transition-colors">Apply</button>
        </div>
        <p class="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-2"><span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">check_circle</span>Code applied — 20% off</p>
      </div>
      <div class="space-y-1.5 pt-2 border-t border-slate-100 text-sm">
        <div class="flex justify-between text-on-surface-variant"><span>Subtotal</span><span>${{ subtotal }}</span></div>
        <div class="flex justify-between text-emerald-600"><span>Discount (ATELIER20)</span><span>−$11.20</span></div>
        <div class="flex justify-between text-on-surface font-bold text-base pt-1"><span>Total</span><span>$44.80</span></div>
      </div>
      <button @click="createCheckout(curProductId)" type="button" class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 rounded-lg font-bold shadow-[0_10px_20px_rgba(79,70,229,0.18)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">lock</span>Pay $44.80</button>
      <p class="flex items-center justify-center gap-1 text-[0.6875rem] text-slate-400"><span class="material-symbols-outlined text-sm">verified_user</span>Secure pseudo-payment · test mode</p>
    </div>
  </main>
</template>
