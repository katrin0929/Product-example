<script setup>
import { ref } from "vue";


const totalSpent = "$10000"
const availableCredits = "14"
const paymentPendingAmount = "$50"
const paymentPendingCount = "1"




const summary = [
  { icon: 'account_balance_wallet', tone: 'bg-indigo-50 text-primary', tag: 'Lifetime', value: '$2,480.00', label: 'Total Spent' },
  { icon: 'toll', tone: 'bg-emerald-50 text-emerald-600', tag: 'Balance', value: '14', label: 'Available Credits' },
  { icon: 'hourglass_top', tone: 'bg-amber-50 text-amber-600', tag: 'Processing', value: '$49.00', label: '1 Payment Pending' },
]

const statusClass = {
  Paid: { pill: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  Pending: { pill: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  Refunded: { pill: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
  Failed: { pill: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500' },
}

const payments = [
  { invoice: 'INV-2026-0142', desc: 'Pro Credits — 30 pack', date: 'Jun 14, 2026', amount: '$120.00', status: 'Pending' },
  { invoice: 'INV-2026-0138', desc: 'Pro Credits — 14 pack', date: 'May 28, 2026', amount: '$56.00', status: 'Paid' },
  { invoice: 'INV-2026-0121', desc: 'Pro Credits — 5 pack', date: 'May 02, 2026', amount: '$20.00', status: 'Paid' },
  { invoice: 'INV-2026-0098', desc: 'Pro Credits — 30 pack', date: 'Apr 11, 2026', amount: '$108.00', status: 'Refunded' },
  { invoice: 'INV-2026-0087', desc: 'Pro Credits — 14 pack', date: 'Mar 19, 2026', amount: '$56.00', status: 'Failed' },
  { invoice: 'INV-2026-0061', desc: 'Pro Credits — 5 pack', date: 'Feb 07, 2026', amount: '$20.00', status: 'Paid' },
]

const creditPacks = ref([
  { qty: 5, price: '$20', popular: false, select: true },
  { qty: 14, price: '$56', popular: true, select: false },
  { qty: 30, price: '$120', popular: false, select: false },
])

const selectPack = (qty) => {
  creditPacks.value.forEach((pack) => {
    pack.select = pack.qty === qty
  })
}
</script>

<template>
  <main class="p-8 max-w-7xl mx-auto space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="space-y-2">
        <h1 class="text-4xl font-extrabold text-on-surface tracking-tight headline">Billing</h1>
        <p class="text-on-surface-variant text-sm max-w-xl">Buy credits, redeem promo codes, and download invoices for every payment on your account.</p>
      </div>
      <button type="button" class="group relative flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 hover:shadow-[0px_10px_20px_rgba(79,70,229,0.2)] active:scale-95">
        <span class="material-symbols-outlined text-lg" style="font-variation-settings:'FILL' 1">add_card</span>
        <span>Buy Credits</span>
      </button>
    </div>

    <!-- Summary stats -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-50 text-primary"><span class="material-symbols-outlined">account_balance_wallet</span></div>
          <span class="text-[0.6875rem] font-bold text-slate-400 tracking-widest uppercase">Lifetime</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mb-1 headline"> {{ totalSpent }} </p>
        <p class="text-sm font-medium text-slate-500"> Total Spent</p>
      </div>

      <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600"><span class="material-symbols-outlined">toll</span></div>
          <span class="text-[0.6875rem] font-bold text-slate-400 tracking-widest uppercase">Balance</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mb-1 headline"> {{ availableCredits }} </p>
        <p class="text-sm font-medium text-slate-500"> Available Credits</p>
      </div>

      <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-amber-50 text-amber-600"><span class="material-symbols-outlined">hourglass_top</span></div>
          <span class="text-[0.6875rem] font-bold text-slate-400 tracking-widest uppercase">Processing</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mb-1 headline"> {{ paymentPendingAmount }} </p>
        <p class="text-sm font-medium text-slate-500">Payments pending: {{ paymentPendingCount }}</p>
      </div>

      
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- Payment history -->
      <section class="lg:col-span-2 space-y-6">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="text-2xl font-bold tracking-tight headline">Payment History</h2>
            <p class="text-sm text-on-surface-variant mt-1">A record of every charge, refund, and downloadable invoice.</p>
          </div>
          <button type="button" class="text-primary text-sm font-bold hover:underline flex items-center gap-1"><span class="material-symbols-outlined text-base">file_download</span> Export CSV</button>
        </div>
        <div class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Invoice</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider text-right">Receipt</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="p in payments" :key="p.invoice" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4"><p class="text-sm font-semibold text-slate-900">{{ p.invoice }}</p><p class="text-xs text-slate-400">{{ p.desc }}</p></td>
                <td class="px-6 py-4 text-sm text-on-surface-variant">{{ p.date }}</td>
                <td class="px-6 py-4 text-sm font-semibold text-slate-900">{{ p.amount }}</td>
                <td class="px-6 py-4"><span :class="['inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold', statusClass[p.status].pill]"><span :class="['w-1.5 h-1.5 rounded-full', statusClass[p.status].dot]"></span>{{ p.status }}</span></td>
                <td class="px-6 py-4 text-right">
                  <button type="button" :class="p.status === 'Failed' ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-primary transition-colors'"><span class="material-symbols-outlined">download</span></button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-surface-container-low/30">
            <p class="text-xs text-on-surface-variant">Showing <span class="font-semibold text-on-surface">6</span> of 18 payments</p>
            <div class="flex items-center gap-1">
              <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-lg">chevron_left</span></button>
              <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-primary text-on-primary">1</button>
              <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">2</button>
              <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">3</button>
              <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-lg">chevron_right</span></button>
            </div>
          </div>
        </div>
      </section>

      <!-- Right rail -->
      <aside class="space-y-6">
        <!-- One-time purchase -->
        <div class="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-5">
          <div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary" style="font-variation-settings:'FILL' 1">shopping_bag</span><h3 class="text-lg font-bold tracking-tight headline">Make a Purchase</h3></div>
          <p class="text-xs text-on-surface-variant -mt-2">One-time purchase of Pro Credits. No subscription.</p>
          <div class="grid grid-cols-3 gap-2">
            <button @click="selectPack(pack.qty)"
              v-for="pack in creditPacks"
              :key="pack.qty"
              type="button"
              :class="pack.select
                ? 'relative flex flex-col items-center gap-0.5 py-3 rounded-lg border-2 border-primary bg-indigo-50/60 text-primary'
                : 'flex flex-col items-center gap-0.5 py-3 rounded-lg border border-outline-variant/30 text-on-surface hover:border-primary/40 hover:bg-indigo-50/40 transition-colors'"
            >
              <span v-if="pack.popular" class="absolute -top-2 right-2 text-[0.5625rem] font-bold bg-primary text-on-primary px-1.5 py-0.5 rounded-full">Popular</span>
              <span class="text-lg font-extrabold headline">{{ pack.qty }}</span>
              <span :class="pack.popular ? 'text-[0.625rem]' : 'text-[0.625rem] text-on-surface-variant'">{{ pack.price }}</span>
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
            <div class="flex justify-between text-on-surface-variant"><span>Subtotal</span><span>$56.00</span></div>
            <div class="flex justify-between text-emerald-600"><span>Discount (ATELIER20)</span><span>−$11.20</span></div>
            <div class="flex justify-between text-on-surface font-bold text-base pt-1"><span>Total</span><span>$44.80</span></div>
          </div>
          <button type="button" class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 rounded-lg font-bold shadow-[0_10px_20px_rgba(79,70,229,0.18)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">lock</span>Pay $44.80</button>
          <p class="flex items-center justify-center gap-1 text-[0.6875rem] text-slate-400"><span class="material-symbols-outlined text-sm">verified_user</span>Secure pseudo-payment · test mode</p>
        </div>

        <!-- Payment method -->
        <div class="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between"><h3 class="text-lg font-bold tracking-tight headline">Payment Method</h3><router-link :to="{ name: 'PaymentMethodEdit' }" class="text-primary text-sm font-bold hover:underline">Edit</router-link></div>
          <div class="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low">
            <div class="w-12 h-8 rounded bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-[0.625rem] font-extrabold tracking-wider">VISA</div>
            <div class="flex-1"><p class="text-sm font-semibold text-on-surface">•••• •••• •••• 4242</p><p class="text-xs text-on-surface-variant">Expires 09 / 2028</p></div>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] font-bold bg-emerald-100 text-emerald-700">Default</span>
          </div>
          <router-link :to="{ name: 'PaymentMethodAdd' }" class="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-outline-variant/40 text-on-surface-variant text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"><span class="material-symbols-outlined text-lg">add</span>Add payment method</router-link>
        </div>
      </aside>
    </div>
  </main>
</template>
