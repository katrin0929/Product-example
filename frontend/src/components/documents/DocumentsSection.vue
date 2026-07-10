<script setup>
import { onMounted } from 'vue'
import { useDocuments } from '@/composables/useDocuments'
import DocumentCard from '@/components/documents/DocumentCard.vue'
import FileUploader from '@/components/FileUploader.vue'
import { useProfileSettings } from '@/composables/useProfileSettings'

const { documents, fetchDocuments, uploadDocument, error } = useDocuments('identity')
const { downloadDocument, deleteDocument } = useProfileSettings()

const handleDownload = (docId) => {
  downloadDocument(docId)
}

const handleDelete = (docId) => {
  deleteDocument(docId)
}

onMounted(fetchDocuments)
</script>

<template>
  <section class="bg-surface-container-lowest rounded-xl shadow-sm p-6 md:p-8 space-y-5">
    <div class="flex items-end justify-between gap-4">
      <div><h3 class="text-lg font-bold tracking-tight headline">Identity Documents</h3><p class="text-sm text-on-surface-variant mt-0.5">Uploaded for account verification.</p></div>
      <FileUploader
        :upload-fn="uploadDocument"
        accept=".pdf,.jpg,.png"
      >
        <template #default="{ onPick, loading }">
          <button
            @click="onPick"
            :disabled="loading"
            class="rounded-lg border border-dashed border-outline-variant/40 p-4 flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-primary/40 hover:text-primary transition-colors min-h-[112px] disabled:opacity-60"
          >
            <span class="material-symbols-outlined">add_circle</span><span class="text-xs font-medium">{{ loading ? 'Uploading...' : 'Add document' }}</span>
          </button>
        </template>
      </FileUploader>
    </div>
    <p v-if="error" class="text-error text-sm">{{ error }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DocumentCard 
          v-for="doc in documents" 
          :key="doc.id" 
          :doc="doc"
          @download="handleDownload"
          @delete="handleDelete"
        />
    </div>
  </section>
</template>
