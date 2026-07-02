<script setup>
import { ref, defineEmits } from 'vue'

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
      
    emit('uploaded', file)
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
    
    <slot :onPick="onPickFile" :loading="loading">
      <button @click="onPickFile" :disabled="loading">
      </button>
    </slot>
  </div>
</template>
