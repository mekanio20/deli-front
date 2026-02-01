<template>
    <svg :width="size" :height="size" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.70428 1.22217L3.61169 6.31476L1.29688 3.99995" :stroke="color" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 10
    },
    color: {
        type: String,
        default: 'white'
    }
})
</script>