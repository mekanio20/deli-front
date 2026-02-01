<template>
    <svg :width="size" :height="size" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L7 7L1 1" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 14
    },
    color: {
        type: String,
        default: '#E1E1E1'
    }
})
</script>