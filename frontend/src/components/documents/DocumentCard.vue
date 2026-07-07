<script setup>
defineProps({
  doc: { type: Object, required: true },
})

// Ключи соответствуют doc.iconType из useDocuments (detectIconType)
const iconMap = {
  pdf: {
    name: 'picture_as_pdf',
    wrapper: 'bg-error-container/50 border border-error-container/20',
    text: 'text-error',
  },
  doc: {
    name: 'description',
    wrapper: 'bg-secondary-container/30 border border-secondary-container/20',
    text: 'text-secondary',
  },
  zip: {
    name: 'folder_zip',
    wrapper: 'bg-surface-variant/50 border border-surface-variant',
    text: 'text-on-surface-variant',
  },
  generic: {
    name: 'draft',
    wrapper: 'bg-surface-variant/50 border border-surface-variant',
    text: 'text-on-surface-variant',
  },
}
</script>

<template>
  <div
    class="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/15 shadow-[0px_20px_40px_rgba(19,27,46,0.03)] hover:shadow-[0px_20px_40px_rgba(19,27,46,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden"
  >
    <div class="flex justify-between items-start mb-6">
      <div
        :class="['w-12 h-12 rounded-lg flex items-center justify-center', iconMap[doc.iconType].wrapper]"
      >
        <span
          :class="['material-symbols-outlined text-2xl', iconMap[doc.iconType].text]"
          style="font-variation-settings: 'FILL' 1;"
        >{{ iconMap[doc.iconType].name }}</span>
      </div>
      <button class="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-surface-container-low transition-colors">
        <span class="material-symbols-outlined">more_horiz</span>
      </button>
    </div>

    <div class="flex-1 mb-6">
      <h3 class="font-headline font-bold text-lg text-on-surface line-clamp-2 mb-1 group-hover:text-primary transition-colors">
        {{ doc.name }}
      </h3>
      <p class="font-body text-xs text-on-surface-variant flex items-center gap-1">
        {{ doc.modified }}
      </p>
    </div>

    <div class="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
      <div class="flex items-center gap-3">
        <img
          v-if="doc.owner.type === 'image'"
          alt="Owner"
          class="w-6 h-6 rounded-full object-cover"
          :src="doc.owner.src"
        />
        <div
          v-else
          class="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-[10px] font-bold"
        >
          {{ doc.owner.value }}
        </div>
        <span class="font-label text-xs text-on-surface-variant font-medium">{{ doc.size }}</span>
      </div>
      <span
        :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.6875rem] font-medium', doc.statusClass]"
      >
        {{ doc.statusLabel }}
      </span>
    </div>
  </div>
</template>
