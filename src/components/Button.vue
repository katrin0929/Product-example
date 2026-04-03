<script setup>
defineProps({
  text: String,
  background: { type: String, default: 'white' },
  type: { type: String, default: 'button' },
})
</script>

<template>
    <button
        :type
        :style="{ background }"
    >
    {{ text }}
    </button>
</template>

<style scoped>
    button {
        border-radius: 8px;
        border: none;
        padding: 12px 164px;
        cursor: pointer;
        
    }
</style>