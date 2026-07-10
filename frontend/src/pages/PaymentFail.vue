<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePayment } from '@/composables/usePayment'

const route = useRoute()
const router = useRouter()
const checkoutId = route.params.checkoutId

const { checkout, loading, notFound, fetchCheckout } = usePayment()

const formattedAmount = computed(() =>
  checkout.value ? `${(checkout.value.amount / 100).toFixed(2)} ${checkout.value.currency}` : ''
)

onMounted(async () => {
  const chk = await fetchCheckout(checkoutId)
  // Страница результата открыта не для того статуса — вернуть на нужную
  if (chk && chk.status === 'pending') router.replace({ name: 'Payment', params: { checkoutId } })
  if (chk && chk.status === 'paid') router.replace({ name: 'PaymentSuccess', params: { checkoutId } })
})
</script>

<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
    <main class="flex flex-1 items-center justify-center px-4 py-12">
      <div class="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-6">
        <div v-if="loading" class="text-center text-slate-500 dark:text-slate-400 py-8">
          Loading...
        </div>

        <template v-else-if="notFound">
          <div class="flex flex-col items-center gap-3 text-center py-4">
            <span class="material-symbols-outlined text-5xl text-slate-400">error</span>
            <h1 class="text-slate-900 dark:text-slate-100 text-2xl font-bold">Checkout not found</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">This payment link is invalid or has expired.</p>
          </div>
        </template>

        <template v-else-if="checkout">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-600">
              <span class="material-symbols-outlined text-4xl" style="font-variation-settings:'FILL' 1">cancel</span>
            </div>
            <h1 class="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight">Payment declined</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">
              The payment of <span class="font-semibold text-slate-900 dark:text-slate-100">{{ formattedAmount }}</span>
              for <span class="font-semibold text-slate-900 dark:text-slate-100">{{ checkout.productTitle }}</span> was not processed.
            </p>
          </div>

          <router-link
            to="/Billing"
            class="w-full h-12 rounded-lg font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            Back to Billing
          </router-link>
        </template>
      </div>
    </main>
  </div>
</template>
