<script setup>
defineProps({
  placeholder: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Boolean],
})

defineEmits(['update:modelValue'])
</script>

<template>
    <input
        :placeholder
        :type
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<style scoped>
    input {
        border-radius: 8px;
        border: 1px solid #E2E8F0;
        padding: 15px 180px 15px 35px;   
    }
</style>