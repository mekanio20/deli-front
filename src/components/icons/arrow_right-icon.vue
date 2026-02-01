<template>
    <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33398 8H12.6673" :stroke="color" stroke-width="1.2" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M8 3.33325L12.6667 7.99992L8 12.6666" :stroke="color" stroke-width="1.2" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 16
    },
    color: {
        type: String,
        default: '#037D84'
    }
})
</script>