<script>
export default {
    props: {
        text: String,
        background: "white",
    }
}
</script>

<template>
    <button
        
        :style="{ background }"
    >
    {{ text }}
    </button>
</template>

<style>
    button {
        border-radius: 8px;
        border: none;
        padding: 12px 164px;
        cursor: pointer;
        
    }
</style>