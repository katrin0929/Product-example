<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useBilling } from '@/composables/useBilling'

const {
  checkouts, payments, invoices, loading, saving, error,
  fetchAll, cancelCheckout, refundPayment, downloadInvoice,
} = useBilling()

const tabs = [
  { key: 'checkouts', label: 'Checkouts', icon: 'shopping_cart' },
  { key: 'payments', label: 'Payments', icon: 'credit_card' },
  { key: 'invoices', label: 'Invoices', icon: 'receipt' },
]

const statusOptions = {
  checkouts: ['all', 'pending', 'paid', 'failed'],
  payments: ['all', 'paid', 'refunded'],
  invoices: [],
}

const statusClass = {
  paid: { pill: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  pending: { pill: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  failed: { pill: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500' },
  refunded: { pill: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
}

const activeTab = ref('checkouts')
const search = ref('')
const statusFilter = ref('all')

watch(activeTab, () => {
  statusFilter.value = 'all'
})

onMounted(fetchAll)

const formatMoney = (minor, currency) =>
  minor == null ? '—' : `${(minor / 100).toFixed(2)} ${currency || ''}`
const formatDate = (iso) => new Date(iso).toLocaleString('en-US')

const matches = (row, extra) =>
  `${row.userEmail || ''} ${extra || ''}`.toLowerCase().includes(search.value.trim().toLowerCase())

const filteredCheckouts = computed(() => checkouts.value.filter((c) =>
  (statusFilter.value === 'all' || c.status === statusFilter.value) && matches(c, c.productTitle)))

const filteredPayments = computed(() => payments.value.filter((p) =>
  (statusFilter.value === 'all' || p.status === statusFilter.value) && matches(p, p.productTitle)))

const filteredInvoices = computed(() => invoices.value.filter((inv) => matches(inv, inv.number)))

function onCancel(chk) {
  if (confirm(`Cancel pending checkout for ${chk.userEmail || chk.userId}?`)) {
    cancelCheckout(chk.id)
  }
}

function onRefund(payment) {
  if (confirm(`Refund ${formatMoney(payment.amount, payment.currency)} to ${payment.userEmail || payment.userId}? Credits will be revoked.`)) {
    refundPayment(payment.id)
  }
}
</script>

<template>
  <main class="p-8 max-w-6xl mx-auto space-y-8">
    <div class="space-y-2">
      <h2 class="text-3xl font-extrabold text-on-surface tracking-tight headline">Billing</h2>
      <p class="text-on-surface-variant text-sm">All checkouts, payments, and invoices across users.</p>
    </div>

    <!-- Sub-tabs -->
    <div class="flex items-center gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        @click="activeTab = tab.key"
        :class="[
          'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-colors',
          activeTab === tab.key
            ? 'bg-secondary-container text-on-secondary-container'
            : 'text-on-surface-variant hover:text-primary',
        ]"
      >
        <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <p v-if="error" class="rounded-lg bg-error-container text-on-error-container text-sm px-4 py-3">{{ error }}</p>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative flex-1 min-w-64">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">search</span>
        <input
          v-model="search"
          type="text"
          :placeholder="activeTab === 'invoices' ? 'Search by email or invoice number' : 'Search by email or product'"
          class="w-full bg-surface-container-lowest shadow-sm border-none rounded-lg pl-10 pr-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
        />
      </div>
      <div v-if="statusOptions[activeTab].length" class="flex items-center gap-1">
        <button
          v-for="s in statusOptions[activeTab]"
          :key="s"
          type="button"
          @click="statusFilter = s"
          :class="[
            'px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-colors',
            statusFilter === s
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-lowest text-on-surface-variant shadow-sm hover:text-primary',
          ]"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div v-if="loading" class="p-8 text-center text-sm text-on-surface-variant">Loading...</div>

      <!-- Checkouts -->
      <template v-else-if="activeTab === 'checkouts'">
        <div v-if="!filteredCheckouts.length" class="p-8 text-center text-sm text-on-surface-variant">No checkouts found.</div>
        <table v-else class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-low/50">
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Credits</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="chk in filteredCheckouts" :key="chk.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <p class="text-sm font-semibold text-slate-900">{{ chk.userEmail || '—' }}</p>
                <p class="text-xs text-slate-400">{{ chk.id }}</p>
              </td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ chk.productTitle }}</td>
              <td class="px-6 py-4 text-sm font-semibold text-slate-900">{{ formatMoney(chk.amount, chk.currency) }}</td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ chk.credits || 0 }}</td>
              <td class="px-6 py-4">
                <span :class="['inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold capitalize', statusClass[chk.status]?.pill]">
                  <span :class="['w-1.5 h-1.5 rounded-full', statusClass[chk.status]?.dot]"></span>
                  {{ chk.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ formatDate(chk.createdAt) }}</td>
              <td class="px-6 py-4 text-right">
                <button
                  v-if="chk.status === 'pending'"
                  type="button"
                  @click="onCancel(chk)"
                  :disabled="saving"
                  class="text-slate-400 hover:text-error transition-colors disabled:opacity-50"
                  title="Cancel checkout"
                >
                  <span class="material-symbols-outlined">cancel</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <!-- Payments -->
      <template v-else-if="activeTab === 'payments'">
        <div v-if="!filteredPayments.length" class="p-8 text-center text-sm text-on-surface-variant">No payments found.</div>
        <table v-else class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-low/50">
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Credits</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <p class="text-sm font-semibold text-slate-900">{{ payment.userEmail || '—' }}</p>
                <p class="text-xs text-slate-400">{{ payment.id }}</p>
              </td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ payment.productTitle }}</td>
              <td class="px-6 py-4 text-sm font-semibold text-slate-900">{{ formatMoney(payment.amount, payment.currency) }}</td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ payment.credits || 0 }}</td>
              <td class="px-6 py-4">
                <span :class="['inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold capitalize', statusClass[payment.status]?.pill]">
                  <span :class="['w-1.5 h-1.5 rounded-full', statusClass[payment.status]?.dot]"></span>
                  {{ payment.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ formatDate(payment.createdAt) }}</td>
              <td class="px-6 py-4 text-right">
                <button
                  v-if="payment.status === 'paid'"
                  type="button"
                  @click="onRefund(payment)"
                  :disabled="saving"
                  class="text-slate-400 hover:text-error transition-colors disabled:opacity-50"
                  title="Refund payment"
                >
                  <span class="material-symbols-outlined">currency_exchange</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <!-- Invoices -->
      <template v-else>
        <div v-if="!filteredInvoices.length" class="p-8 text-center text-sm text-on-surface-variant">No invoices found.</div>
        <table v-else class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-low/50">
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Invoice</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="inv in filteredInvoices" :key="inv.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <p class="text-sm font-semibold text-slate-900">{{ inv.number }}</p>
                <p v-if="inv.paymentStatus === 'refunded'" class="text-xs text-slate-400">refunded</p>
              </td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ inv.userEmail || '—' }}</td>
              <td class="px-6 py-4 text-sm font-semibold text-slate-900">{{ formatMoney(inv.amount, inv.currency) }}</td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ formatDate(inv.createdAt) }}</td>
              <td class="px-6 py-4 text-right">
                <button
                  type="button"
                  @click="downloadInvoice(inv.id, inv.number)"
                  class="text-slate-400 hover:text-primary transition-colors"
                  title="Download invoice"
                >
                  <span class="material-symbols-outlined">download</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </main>
</template>
