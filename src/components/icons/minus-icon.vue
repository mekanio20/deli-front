<template>
    <svg :width="size" :height="size" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.625 13.5H21.375" :stroke="color" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 27
    },
    color: {
        type: String,
        default: 'white'
    }
})
</script>