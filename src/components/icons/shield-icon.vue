<template>
    <svg :width="size" :height="size" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7.49973 16.1756C7.49973 16.1756 13.6401 13.1054 13.6401 8.50015V3.12734L7.49973 0.824707L1.35938 3.12734V8.50015C1.35938 13.1054 7.49973 16.1756 7.49973 16.1756Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 15
    },
    color: {
        type: String,
        default: '#009FE3'
    }
})
</script>