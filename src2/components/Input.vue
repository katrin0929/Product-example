<script>
export default {
  props: {
    placeholder: String,
    type: "text",
  },

}
</script>

<template>
    <input 
        :placeholder
        :type        
    />
</template>

<style>
    input {
        border-radius: 8px;
        border: 1px solid #E2E8F0;
        padding: 15px 180px 15px 35px;   
    }
</style>