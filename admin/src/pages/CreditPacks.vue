<script setup>
import { ref, onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'

const { products, loading, saving, error, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts()

const emptyForm = () => ({ title: '', description: '', price: '', credits: 0, currency: 'USD' })
const form = ref(emptyForm())
const editingId = ref(null)
const formError = ref(null)

onMounted(fetchProducts)

function startEdit(pack) {
  editingId.value = pack.id
  formError.value = null
  form.value = {
    title: pack.title,
    description: pack.description || '',
    price: (pack.amount / 100).toFixed(2),
    credits: pack.credits || 0,
    currency: pack.currency || 'USD',
  }
}

function resetForm() {
  editingId.value = null
  formError.value = null
  form.value = emptyForm()
}

async function submitForm() {
  formError.value = null

  const title = form.value.title.trim()
  const amount = Math.round(parseFloat(form.value.price) * 100)
  const credits = Number(form.value.credits)

  if (!title) {
    formError.value = 'Title is required'
    return
  }
  if (Number.isNaN(amount) || amount < 0) {
    formError.value = 'Price must be a valid non-negative number'
    return
  }
  if (!Number.isInteger(credits) || credits < 0) {
    formError.value = 'Credits must be a non-negative integer'
    return
  }

  const payload = {
    title,
    description: form.value.description.trim() || null,
    amount,
    currency: form.value.currency.trim() || 'USD',
    credits,
  }

  const ok = editingId.value
    ? await updateProduct(editingId.value, payload)
    : await createProduct(payload)

  if (ok) resetForm()
}

async function removePack(pack) {
  if (!confirm(`Delete "${pack.title}"?`)) return
  if (editingId.value === pack.id) resetForm()
  await deleteProduct(pack.id)
}

const formatPrice = (pack) => `${(pack.amount / 100).toFixed(2)} ${pack.currency}`
</script>

<template>
  <main class="p-8 max-w-6xl mx-auto space-y-8">
      <div class="space-y-2">
        <h2 class="text-3xl font-extrabold text-on-surface tracking-tight headline">Credit Packs</h2>
        <p class="text-on-surface-variant text-sm">Create, edit, and delete the credit packs sold on the Billing page.</p>
      </div>

      <p v-if="error" class="rounded-lg bg-error-container text-on-error-container text-sm px-4 py-3">{{ error }}</p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Pack list -->
        <section class="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
          <div v-if="loading" class="p-8 text-center text-sm text-on-surface-variant">Loading packs...</div>
          <div v-else-if="!products.length" class="p-8 text-center text-sm text-on-surface-variant">No credit packs yet — create the first one.</div>
          <table v-else class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Pack</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Credits</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="pack in products" :key="pack.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4">
                  <p class="text-sm font-semibold text-slate-900">{{ pack.title }}</p>
                  <p class="text-xs text-slate-400">{{ pack.description || pack.id }}</p>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-primary">
                    <span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">toll</span>
                    {{ pack.credits || 0 }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-slate-900">{{ formatPrice(pack) }}</td>
                <td class="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    @click="startEdit(pack)"
                    class="text-slate-400 hover:text-primary transition-colors mr-2"
                    title="Edit"
                  >
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    type="button"
                    @click="removePack(pack)"
                    class="text-slate-400 hover:text-error transition-colors"
                    title="Delete"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Create / edit form -->
        <aside class="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-variation-settings:'FILL' 1">
              {{ editingId ? 'edit' : 'add_box' }}
            </span>
            <h3 class="text-lg font-bold tracking-tight headline">{{ editingId ? 'Edit pack' : 'Create pack' }}</h3>
          </div>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="text-xs font-medium text-on-surface-variant">Title</label>
              <input
                v-model="form.title"
                type="text"
                placeholder="Mega Pack"
                class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
              />
            </div>

            <div>
              <label class="text-xs font-medium text-on-surface-variant">Description</label>
              <textarea
                v-model="form.description"
                rows="2"
                placeholder="Optional description"
                class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim resize-none"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-medium text-on-surface-variant">Price, $</label>
                <input
                  v-model="form.price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="19.99"
                  class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
                />
              </div>
              <div>
                <label class="text-xs font-medium text-on-surface-variant">Credits</label>
                <input
                  v-model="form.credits"
                  type="number"
                  step="1"
                  min="0"
                  placeholder="10"
                  class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
                />
              </div>
            </div>

            <div>
              <label class="text-xs font-medium text-on-surface-variant">Currency</label>
              <input
                v-model="form.currency"
                type="text"
                placeholder="USD"
                class="mt-1.5 w-full bg-surface-container-low border-none rounded-lg px-3 py-2.5 text-sm uppercase text-on-surface placeholder:text-slate-400 placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
              />
            </div>

            <p v-if="formError" class="text-sm text-error">{{ formError }}</p>

            <div class="flex gap-2 pt-1">
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 bg-gradient-to-br from-primary to-primary-container text-on-primary py-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ editingId ? 'Save changes' : 'Create pack' }}
              </button>
              <button
                v-if="editingId"
                type="button"
                @click="resetForm"
                class="px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold hover:bg-surface-container-highest transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </aside>
      </div>
  </main>
</template>
