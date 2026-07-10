<script setup>
</script>

<template>
  <main class="p-8 max-w-2xl mx-auto space-y-8">
    <router-link :to="{ name: 'Billing' }" class="inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-lg">arrow_back</span>
      Back to Billing
    </router-link>

    <div class="space-y-2">
      <h1 class="text-4xl font-extrabold text-on-surface tracking-tight headline">Edit Payment Method</h1>
      <p class="text-on-surface-variant text-sm max-w-xl">Update the details of your saved card. The card number cannot be changed — add a new card instead.</p>
    </div>

    <div class="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-5">
      <div class="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low">
        <div class="w-12 h-8 rounded bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-[0.625rem] font-extrabold tracking-wider">VISA</div>
        <div class="flex-1"><p class="text-sm font-semibold text-on-surface">•••• •••• •••• 4242</p><p class="text-xs text-on-surface-variant">Expires 09 / 2028</p></div>
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] font-bold bg-emerald-100 text-emerald-700">Default</span>
      </div>

      <div>
        <label class="text-xs font-medium text-on-surface-variant">Cardholder name</label>
        <input value="Jane Doe" class="w-full mt-1.5 bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"/>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-xs font-medium text-on-surface-variant">Expiry month</label>
          <input value="09" placeholder="MM" class="w-full mt-1.5 bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"/>
        </div>
        <div>
          <label class="text-xs font-medium text-on-surface-variant">Expiry year</label>
          <input value="2028" placeholder="YYYY" class="w-full mt-1.5 bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"/>
        </div>
      </div>

      <label class="flex items-center justify-between gap-4 p-4 rounded-lg bg-surface-container-low cursor-pointer">
        <div>
          <p class="text-sm font-semibold text-on-surface">Set as default</p>
          <p class="text-xs text-on-surface-variant">Use this card for all future payments</p>
        </div>
        <input type="checkbox" checked class="sr-only peer"/>
        <span class="relative w-11 h-6 shrink-0 rounded-full bg-slate-300 peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"></span>
      </label>

      <div class="flex gap-3 pt-2">
        <button type="button" class="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 rounded-lg font-bold shadow-[0_10px_20px_rgba(79,70,229,0.18)] hover:opacity-90 transition-opacity">
          <span class="material-symbols-outlined text-lg" style="font-variation-settings:'FILL' 1">save</span>
          Save changes
        </button>
        <router-link :to="{ name: 'Billing' }" class="px-6 py-3 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold flex items-center hover:bg-surface-container-highest transition-colors">Cancel</router-link>
      </div>

      <button type="button" class="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-rose-200 text-rose-600 text-sm font-medium hover:bg-rose-50 transition-colors">
        <span class="material-symbols-outlined text-lg">delete</span>
        Remove card
      </button>
    </div>
  </main>
</template>
