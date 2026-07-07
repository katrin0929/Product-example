<script setup>
import { ref } from 'vue'

const emit = defineEmits(['uploaded']);

const props = defineProps({
  uploadFn: Function,
  accept: String,
})

const fileInput = ref(null)
const loading = ref(false)

const onPickFile = () => {
  fileInput.value?.click()
}

const onFileChange = async (e) => {
  const file = e.target.files?.[0]
  // Reset so picking the same file again re-fires the change event
  e.target.value = ''
  if (!file) return

  loading.value = true
  try {
    const ok = props.uploadFn ? await props.uploadFn(file) : true
    if (ok !== false) {
      emit('uploaded', file)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      class="hidden"
      @change="onFileChange"
    />

    <slot :onPick="onPickFile" :loading="loading" />
  </div>
</template>
