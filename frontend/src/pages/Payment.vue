<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePayment } from '@/composables/usePayment'

const route = useRoute()
const router = useRouter()
const checkoutId = route.params.checkoutId

const { checkout, loading, processing, notFound, error, fetchCheckout, pay, decline } = usePayment()

const formattedAmount = computed(() =>
  checkout.value ? `${(checkout.value.amount / 100).toFixed(2)} ${checkout.value.currency}` : ''
)

const resultRoute = (status) =>
  status === 'paid'
    ? { name: 'PaymentSuccess', params: { checkoutId } }
    : { name: 'PaymentFail', params: { checkoutId } }

onMounted(async () => {
  const chk = await fetchCheckout(checkoutId)
  if (chk && chk.status !== 'pending') router.replace(resultRoute(chk.status))
})

async function onPay() {
  const status = await pay(checkoutId)
  if (status) router.replace(resultRoute(status))
}

async function onDecline() {
  const status = await decline(checkoutId)
  if (status) router.replace(resultRoute(status))
}
</script>

<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-10 py-3 bg-white dark:bg-slate-900">
      <div class="flex items-center gap-4 text-slate-900 dark:text-slate-100">
        <div class="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">DEVFED</h2>
      </div>
    </header>

    <main class="flex flex-1 items-center justify-center px-4 py-12">
      <div class="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-6">
        <div v-if="loading" class="text-center text-slate-500 dark:text-slate-400 py-8">
          Loading checkout...
        </div>

        <template v-else-if="notFound">
          <div class="flex flex-col items-center gap-3 text-center py-4">
            <span class="material-symbols-outlined text-5xl text-slate-400">error</span>
            <h1 class="text-slate-900 dark:text-slate-100 text-2xl font-bold">Checkout not found</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">This payment link is invalid or has expired.</p>
          </div>
        </template>

        <template v-else-if="checkout && checkout.status === 'pending'">
          <div class="flex flex-col items-center gap-2 text-center">
            <div class="w-14 h-14 rounded-full bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-3xl" style="font-variation-settings:'FILL' 1">lock</span>
            </div>
            <h1 class="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight">Confirm your payment</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Test payment — no real money involved.</p>
          </div>

          <div class="rounded-lg bg-slate-50 dark:bg-slate-800 p-5 space-y-2 text-sm">
            <div class="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Product</span>
              <span class="font-semibold text-slate-900 dark:text-slate-100">{{ checkout.productTitle }}</span>
            </div>
            <div v-if="checkout.credits" class="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Credits</span>
              <span class="font-semibold text-slate-900 dark:text-slate-100">{{ checkout.credits }}</span>
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Total</span>
              <span class="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{{ formattedAmount }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <button
              type="button"
              :disabled="processing"
              @click="onPay"
              class="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg font-bold transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay {{ formattedAmount }}
            </button>
            <button
              type="button"
              :disabled="processing"
              @click="onDecline"
              class="w-full h-12 rounded-lg font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Decline
            </button>
          </div>
        </template>

        <p v-if="error" class="text-sm text-rose-600 text-center">{{ error }}</p>

        <p class="flex items-center justify-center gap-1 text-[0.6875rem] text-slate-400">
          <span class="material-symbols-outlined text-sm">verified_user</span>
          Secure pseudo-payment · test mode
        </p>
      </div>
    </main>
  </div>
</template>
