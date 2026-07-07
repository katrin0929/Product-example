<script setup>
import { onMounted } from 'vue'
import { useDocuments } from '@/composables/useDocuments'
import DocumentCard from '@/components/documents/DocumentCard.vue'
import FileUploader from '@/components/FileUploader.vue'

const {
  documents,
  loading,
  error,
  fetchDocuments,
  uploadDocument,
} = useDocuments('general')

onMounted(fetchDocuments)
</script>

<template>
  <main class="bg-surface-container-low min-h-[calc(100vh-64px)]">
    <div class="p-10 w-full max-w-7xl mx-auto">
      <!-- Page header -->
      <div class="flex items-end justify-between mb-12">
        <div class="space-y-2">
          <h1 class="font-display text-4xl font-extrabold text-on-surface tracking-tight headline">
            Documents
          </h1>
          <p class="font-body text-on-surface-variant text-sm max-w-xl">
            Manage your architectural specs, blueprints, and project documentation in one precision environment.
          </p>
        </div>
        <FileUploader :upload-fn="uploadDocument">
          <template #default="{ onPick, loading: uploading }">
            <button
              type="button"
              :disabled="uploading"
              class="group relative flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-label font-medium shadow-sm transition-all duration-200 hover:shadow-[0px_10px_20px_rgba(79,70,229,0.2)] active:scale-95 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              @click="onPick"
            >
              <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200"></div>
              <span
                class="material-symbols-outlined text-lg relative z-10"
                style="font-variation-settings: 'FILL' 1;"
              >upload_file</span>
              <span class="relative z-10">{{ uploading ? 'Uploading...' : 'Upload Document' }}</span>
            </button>
          </template>
        </FileUploader>
      </div>

      <p v-if="error" class="text-error text-sm mb-4">{{ error }}</p>
      <p v-if="loading" class="text-on-surface-variant text-sm mb-4">Loading documents...</p>

      <!-- Toolbar -->
      <div class="flex items-center gap-4 mb-8">
        <div class="relative flex-1 max-w-md group">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none text-lg">
            search
          </span>
          <input
            class="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent transition-all font-body shadow-[0px_2px_4px_rgba(19,27,46,0.02)]"
            placeholder="Filter documents by name or owner..."
            type="text"
          />
        </div>
        <button class="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-2.5 rounded-lg font-label text-sm transition-colors hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim shadow-[0px_2px_4px_rgba(19,27,46,0.02)]">
          <span class="material-symbols-outlined text-lg text-on-surface-variant">filter_list</span>
          All Types
          <span class="material-symbols-outlined text-sm text-on-surface-variant ml-2">expand_more</span>
        </button>
        <button class="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-2.5 rounded-lg font-label text-sm transition-colors hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim shadow-[0px_2px_4px_rgba(19,27,46,0.02)]">
          <span class="material-symbols-outlined text-lg text-on-surface-variant">sort</span>
          Date Modified
          <span class="material-symbols-outlined text-sm text-on-surface-variant ml-2">expand_more</span>
        </button>
      </div>

      <!-- Documents grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DocumentCard v-for="doc in documents" :key="doc.id" :doc="doc" />
      </div>

      <div class="h-20"></div>
    </div>
  </main>
</template>