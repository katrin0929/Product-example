<script>
export default {
  props: {
    alt: String,
    src: {
      type: String,
      required: true  
    },
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <img 
    :src="src" 
    :alt="alt"
    :width="width" 
    :height="height"
  />
</template>