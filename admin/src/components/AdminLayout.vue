<script setup>
import { onMounted } from 'vue'
import { useAdminAuth } from '@/composables/useAdminAuth'

const { admin, fetchMe, signOut } = useAdminAuth()

const tabs = [
  { to: '/', label: 'Credit Packs', icon: 'toll' },
  { to: '/billing', label: 'Billing', icon: 'receipt_long' },
  { to: '/users', label: 'Users', icon: 'group' },
  { to: '/admins', label: 'Admins', icon: 'admin_panel_settings' },
]

onMounted(fetchMe)
</script>

<template>
  <div class="min-h-screen bg-background-light">
    <header class="flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest px-8 py-4">
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-3">
          <div class="size-9 bg-primary rounded-lg flex items-center justify-center text-on-primary">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings:'FILL' 1">admin_panel_settings</span>
          </div>
          <h1 class="text-lg font-extrabold text-on-surface tracking-tight headline">DEVFED Admin</h1>
        </div>

        <nav class="flex items-center gap-1">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.to"
            :to="tab.to"
            class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
            exact-active-class="bg-secondary-container text-on-secondary-container"
          >
            <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
            {{ tab.label }}
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <span v-if="admin" class="text-sm text-on-surface-variant">{{ admin.email }}</span>
        <button
          type="button"
          @click="signOut"
          class="flex items-center gap-1.5 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-lg">logout</span>
          Logout
        </button>
      </div>
    </header>

    <RouterView />
  </div>
</template>
