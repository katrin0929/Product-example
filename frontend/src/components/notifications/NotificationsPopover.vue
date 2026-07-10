<script setup>
const typeStyles = {
  'payment.succeeded': { icon: 'check_circle', tone: 'bg-emerald-50 text-emerald-600' },
  'payment.failed': { icon: 'error', tone: 'bg-rose-50 text-rose-600' },
  'document.uploaded': { icon: 'description', tone: 'bg-indigo-50 text-primary' },
}

const notifications = [
  { id: 'ntf_1', type: 'payment.succeeded', title: 'Payment successful', body: 'Your payment of $56.00 has been processed.', time: '2 min ago', read: false },
  { id: 'ntf_2', type: 'payment.failed', title: 'Payment failed', body: 'We couldn’t charge your card ending in 4242.', time: '1 hour ago', read: false },
  { id: 'ntf_3', type: 'document.uploaded', title: 'Document uploaded', body: 'passport.pdf was added to your documents.', time: 'Yesterday', read: true },
  { id: 'ntf_4', type: 'payment.succeeded', title: 'Payment successful', body: 'Your payment of $20.00 has been processed.', time: 'Jul 2', read: true },
]
</script>

<template>
  <button popovertarget="notifications-popover" class="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors relative">
    <span class="material-symbols-outlined">notifications</span>
    <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-slate-50"></span>
  </button>

  <el-popover id="notifications-popover" anchor="bottom-end" popover class="w-96 m-0 p-0 rounded-xl bg-white shadow-lg border border-slate-100 [--anchor-gap:0.5rem]">
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <h3 class="text-base font-bold tracking-tight headline text-on-surface">Notifications</h3>
      <button type="button" class="text-primary text-sm font-bold hover:underline">Mark all as read</button>
    </div>

    <ul class="max-h-96 overflow-y-auto divide-y divide-slate-50">
      <li v-for="n in notifications" :key="n.id" class="flex items-start gap-3 px-5 py-3.5 hover:bg-surface-container-low transition-colors cursor-pointer">
        <div class="w-9 h-9 shrink-0 rounded-full flex items-center justify-center" :class="typeStyles[n.type].tone">
          <span class="material-symbols-outlined text-xl" style="font-variation-settings:'FILL' 1">{{ typeStyles[n.type].icon }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-on-surface">{{ n.title }}</p>
          <p class="text-xs text-on-surface-variant truncate">{{ n.body }}</p>
          <p class="text-[0.6875rem] text-slate-400 mt-1">{{ n.time }}</p>
        </div>
        <span v-if="!n.read" class="w-2 h-2 shrink-0 mt-1.5 bg-primary rounded-full"></span>
      </li>
    </ul>

    <div class="px-5 py-3 border-t border-slate-100 text-center">
      <button type="button" class="text-primary text-sm font-bold hover:underline">View all notifications</button>
    </div>
  </el-popover>
</template>
