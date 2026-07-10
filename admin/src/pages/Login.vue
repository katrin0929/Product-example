<script setup>
import { ref } from 'vue'
import { useAdminAuth } from '@/composables/useAdminAuth'

const email = ref('')
const password = ref('')
const { signIn, loading, error } = useAdminAuth()

function submit() {
  signIn(email.value, password.value)
}
</script>

<template>
  <div class="min-h-screen bg-background-light flex items-center justify-center p-4">
    <div class="w-full max-w-[440px]">
      <div class="flex flex-col items-center gap-3 mb-8">
        <div class="size-12 bg-primary rounded-xl flex items-center justify-center text-on-primary">
          <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">admin_panel_settings</span>
        </div>
        <h1 class="text-2xl font-extrabold text-on-surface tracking-tight headline">DEVFED Admin</h1>
        <p class="text-sm text-on-surface-variant">Manage credit packs</p>
      </div>

      <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-8">
        <form @submit.prevent="submit" class="space-y-5">
          <div>
            <label class="text-xs font-medium text-on-surface-variant">Email</label>
            <div class="relative mt-1.5">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">mail</span>
              <input
                v-model="email"
                type="email"
                required
                placeholder="admin@example.com"
                class="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
              />
            </div>
          </div>

          <div>
            <label class="text-xs font-medium text-on-surface-variant">Password</label>
            <div class="relative mt-1.5">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">lock</span>
              <input
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
              />
            </div>
          </div>

          <p v-if="error" class="text-sm text-error">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-lg">login</span>
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
