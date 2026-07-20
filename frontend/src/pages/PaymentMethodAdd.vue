<script setup>
import { usePaymentMethodAdd } from '@/composables/usePaymentMethodAdd';
import { ref } from "vue";

const { saveCard } = usePaymentMethodAdd()

const data = ref({
  "cardNumber": "",
  "cardholderName": "",
  "expMonth": "",
  "expYear": "",
  "isDefault": true
})

</script>

<template>
  <main class="p-8 max-w-2xl mx-auto space-y-8">
    <router-link :to="{ name: 'Billing' }" class="inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-lg">arrow_back</span>
      Back to Billing
    </router-link>

    <div class="space-y-2">
      <h1 class="text-4xl font-extrabold text-on-surface tracking-tight headline">Add Payment Method</h1>
      <p class="text-on-surface-variant text-sm max-w-xl">Add a new card to your account. It will be available for all future purchases.</p>
    </div>

    <div class="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <label class="text-xs font-medium text-on-surface-variant">Card number</label>
        <div class="relative mt-1.5">
          <input v-model="data.cardNumber" placeholder="1234 5678 9012 3456" class="w-full bg-surface-container-low border-none rounded-lg pl-3 pr-10 py-2.5 text-sm font-medium tracking-wide text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"/>
          <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">credit_card</span>
        </div>
      </div>

      <div>
        <label class="text-xs font-medium text-on-surface-variant">Cardholder name</label>
        <input v-model="data.cardholderName" placeholder="Jane Doe" class="w-full mt-1.5 bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"/>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-xs font-medium text-on-surface-variant">Expiry month</label>
          <input v-model.number="data.expMonth" placeholder="MM" class="w-full mt-1.5 bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"/>
        </div>
        <div>
          <label class="text-xs font-medium text-on-surface-variant">Expiry year</label>
          <input v-model.number="data.expYear" placeholder="YYYY" class="w-full mt-1.5 bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"/>
        </div>
        <div>
          <label class="text-xs font-medium text-on-surface-variant">CVC</label>
          <input type="password" placeholder="•••" maxlength="4" class="w-full mt-1.5 bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"/>
        </div>
      </div>

      <label class="flex items-center justify-between gap-4 p-4 rounded-lg bg-surface-container-low cursor-pointer">
        <div>
          <p class="text-sm font-semibold text-on-surface">Set as default</p>
          <p class="text-xs text-on-surface-variant">Use this card for all future payments</p>
        </div>
        <input v-model="isDefault" type="checkbox" checked class="sr-only peer"/>
        <span class="relative w-11 h-6 shrink-0 rounded-full bg-slate-300 peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"></span>
      </label>

      <div class="flex gap-3 pt-2">
        <button @click="saveCard(data)" type="button" class="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 rounded-lg font-bold shadow-[0_10px_20px_rgba(79,70,229,0.18)] hover:opacity-90 transition-opacity">
          <span class="material-symbols-outlined text-lg" style="font-variation-settings:'FILL' 1">add_card</span>
          Save card
        </button>
        <router-link :to="{ name: 'Billing' }" class="px-6 py-3 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold flex items-center hover:bg-surface-container-highest transition-colors">Cancel</router-link>
      </div>

      <p class="flex items-center justify-center gap-1 text-[0.6875rem] text-slate-400"><span class="material-symbols-outlined text-sm">verified_user</span>Secure pseudo-payment · test mode</p>
    </div>
  </main>
</template>
