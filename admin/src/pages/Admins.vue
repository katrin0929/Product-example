<script setup>
import { ref, onMounted } from 'vue'
import { useAdmins } from '@/composables/useAdmins'
import { useAdminAuth } from '@/composables/useAdminAuth'

const { admins, loading, saving, error, fetchAdmins, createAdmin, deleteAdmin } = useAdmins()
const { admin: me, fetchMe } = useAdminAuth()

const emptyForm = () => ({ email: '', name: '', password: '' })
const form = ref(emptyForm())
const formError = ref(null)

onMounted(() => {
  fetchMe()
  fetchAdmins()
})

async function submitForm() {
  formError.value = null

  const email = form.value.email.trim()
  if (!email) {
    formError.value = 'Email is required'
    return
  }
  if (form.value.password.length < 8) {
    formError.value = 'Password must be at least 8 characters'
    return
  }

  const ok = await createAdmin({
    email,
    name: form.value.name.trim(),
    password: form.value.password,
  })
  if (ok) form.value = emptyForm()
}

function removeAdmin(admin) {
  if (confirm(`Delete admin ${admin.email}?`)) deleteAdmin(admin.id)
}

const formatDate = (iso) => (iso ? new Date(iso).toLocaleDateString() : '—')
</script>

<template>
  <main class="p-8 max-w-6xl mx-auto space-y-8">
    <div class="space-y-2">
      <h2 class="text-3xl font-extrabold text-on-surface tracking-tight headline">Admins</h2>
      <p class="text-on-surface-variant text-sm">Accounts with access to this admin panel. You cannot delete your own account.</p>
    </div>

    <p v-if="error" class="rounded-lg bg-error-container text-on-error-container text-sm px-4 py-3">{{ error }}</p>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- Admin list -->
      <section class="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div v-if="loading" class="p-8 text-center text-sm text-on-surface-variant">Loading admins...</div>
        <table v-else class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-low/50">
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Admin</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="a in admins" :key="a.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <p class="text-sm font-semibold text-slate-900">
                  {{ a.email }}
                  <span
                    v-if="me && a.id === me.id"
                    class="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] font-bold bg-indigo-50 text-primary"
                  >You</span>
                </p>
                <p class="text-xs text-slate-400">{{ a.name }}</p>
              </td>
              <td class="px-6 py-4 text-sm text-on-surface-variant">{{ formatDate(a.createdAt) }}</td>
              <td class="px-6 py-4 text-right">
                <button
                  v-if="!me || a.id !== me.id"
                  type="button"
                  @click="removeAdmin(a)"
                  :disabled="saving"
                  class="text-slate-400 hover:text-error transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Create form -->
      <aside class="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-5">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary" style="font-variation-settings:'FILL' 1">person_add</span>
          <h3 class="text-lg font-bold tracking-tight headline">Create admin</h3>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="text-xs font-medium text-on-surface-variant">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="new-admin@example.com"
              class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-on-surface-variant">Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Admin"
              class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
            />
          </div>
          <div>
            <label class="text-xs font-medium text-on-surface-variant">Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Min 8 characters"
              class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
            />
          </div>

          <p v-if="formError" class="text-sm text-error">{{ formError }}</p>

          <button
            type="submit"
            :disabled="saving"
            class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create admin
          </button>
        </form>
      </aside>
    </div>
  </main>
</template>
