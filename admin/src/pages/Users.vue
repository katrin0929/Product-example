<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useUsers } from '@/composables/useUsers'

const {
  users, detail, loading, saving, error,
  fetchUsers, fetchUser, updateUser, blockUser, unblockUser, deleteUser,
} = useUsers()

const search = ref('')
const form = ref({ name: '', phone: '' })

const filteredUsers = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return users.value
  return users.value.filter((u) => `${u.email} ${u.name || ''}`.toLowerCase().includes(q))
})

watch(detail, (d) => {
  form.value = d
    ? { name: d.user.name || '', phone: d.user.phone || '' }
    : { name: '', phone: '' }
})

onMounted(fetchUsers)

const formatMoney = (minor) => `$${(minor / 100).toFixed(2)}`

function saveProfile() {
  updateUser(detail.value.user.id, {
    name: form.value.name,
    phone: form.value.phone.trim() || null,
  })
}

function toggleBlock(user) {
  if (user.blocked) unblockUser(user.id)
  else blockUser(user.id)
}

function removeUser(user) {
  if (confirm(`Delete ${user.email}? This removes all their data (payments, projects, documents).`)) {
    deleteUser(user.id)
  }
}
</script>

<template>
  <main class="p-8 max-w-6xl mx-auto space-y-8">
    <div class="space-y-2">
      <h2 class="text-3xl font-extrabold text-on-surface tracking-tight headline">Users</h2>
      <p class="text-on-surface-variant text-sm">Browse, edit, block, or delete product users.</p>
    </div>

    <p v-if="error" class="rounded-lg bg-error-container text-on-error-container text-sm px-4 py-3">{{ error }}</p>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- User list -->
      <section class="lg:col-span-2 space-y-4">
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">search</span>
          <input
            v-model="search"
            type="text"
            placeholder="Search by email or name"
            class="w-full bg-surface-container-lowest shadow-sm border-none rounded-lg pl-10 pr-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
          />
        </div>

        <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
          <div v-if="loading" class="p-8 text-center text-sm text-on-surface-variant">Loading users...</div>
          <div v-else-if="!filteredUsers.length" class="p-8 text-center text-sm text-on-surface-variant">No users found.</div>
          <table v-else class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Verified</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="u in filteredUsers"
                :key="u.id"
                @click="fetchUser(u.id)"
                :class="[
                  'cursor-pointer transition-colors',
                  detail && detail.user.id === u.id ? 'bg-indigo-50/60' : 'hover:bg-slate-50/50',
                ]"
              >
                <td class="px-6 py-4">
                  <p class="text-sm font-semibold text-slate-900">{{ u.email }}</p>
                  <p class="text-xs text-slate-400">{{ u.name || u.id }}</p>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="material-symbols-outlined text-lg"
                    :class="u.emailVerified ? 'text-emerald-600' : 'text-slate-300'"
                    style="font-variation-settings:'FILL' 1"
                  >{{ u.emailVerified ? 'check_circle' : 'pending' }}</span>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold',
                      u.blocked ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700',
                    ]"
                  >
                    <span :class="['w-1.5 h-1.5 rounded-full', u.blocked ? 'bg-rose-500' : 'bg-emerald-500']"></span>
                    {{ u.blocked ? 'Blocked' : 'Active' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    @click.stop="toggleBlock(u)"
                    :disabled="saving"
                    class="text-slate-400 hover:text-amber-600 transition-colors mr-2 disabled:opacity-50"
                    :title="u.blocked ? 'Unblock' : 'Block'"
                  >
                    <span class="material-symbols-outlined">{{ u.blocked ? 'lock_open' : 'block' }}</span>
                  </button>
                  <button
                    type="button"
                    @click.stop="removeUser(u)"
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
        </div>
      </section>

      <!-- Detail panel -->
      <aside class="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-5">
        <div v-if="!detail" class="py-10 text-center text-sm text-on-surface-variant">
          <span class="material-symbols-outlined text-4xl text-slate-300 block mb-2">person_search</span>
          Select a user to see details
        </div>

        <template v-else>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-variation-settings:'FILL' 1">person</span>
            <h3 class="text-lg font-bold tracking-tight headline truncate">{{ detail.user.email }}</h3>
          </div>

          <div class="rounded-lg bg-surface-container-low p-4 space-y-2 text-sm">
            <div class="flex justify-between text-on-surface-variant">
              <span>Total spent</span>
              <span class="font-semibold text-on-surface">{{ formatMoney(detail.summary.totalSpent) }}</span>
            </div>
            <div class="flex justify-between text-on-surface-variant">
              <span>Credits</span>
              <span class="font-semibold text-on-surface">{{ detail.summary.availableCredits }}</span>
            </div>
            <div class="flex justify-between text-on-surface-variant">
              <span>Payments</span>
              <span class="font-semibold text-on-surface">{{ detail.summary.paymentsCount }}</span>
            </div>
            <div class="flex justify-between text-on-surface-variant">
              <span>Projects</span>
              <span class="font-semibold text-on-surface">{{ detail.summary.projectsCount }}</span>
            </div>
            <div class="flex justify-between text-on-surface-variant">
              <span>Documents</span>
              <span class="font-semibold text-on-surface">{{ detail.summary.documentsCount }}</span>
            </div>
          </div>

          <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label class="text-xs font-medium text-on-surface-variant">Name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Name"
                class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
              />
            </div>
            <div>
              <label class="text-xs font-medium text-on-surface-variant">Phone</label>
              <input
                v-model="form.phone"
                type="text"
                placeholder="+1 555 000-0000"
                class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
              />
            </div>
            <button
              type="submit"
              :disabled="saving"
              class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save profile
            </button>
          </form>

          <div class="flex gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              :disabled="saving"
              @click="toggleBlock(detail.user)"
              class="flex-1 px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold hover:bg-surface-container-highest transition-colors disabled:opacity-50"
            >
              {{ detail.user.blocked ? 'Unblock' : 'Block' }}
            </button>
            <button
              type="button"
              :disabled="saving"
              @click="removeUser(detail.user)"
              class="flex-1 px-4 py-2.5 rounded-lg border border-rose-200 text-rose-600 text-sm font-bold hover:bg-rose-50 transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </template>
      </aside>
    </div>
  </main>
</template>
