<template>
    <svg :width="size" :height="size" class="transition-transform duration-300" :class="isRotate ? '' : '-rotate-180'" viewBox="0 0 12 8" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M11 6.5L6 1.5L1 6.5" :stroke="color" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 12
    },
    color: {
        type: String,
        default: 'black'
    },
    isRotate: {
        type: Boolean,
        default: false
    }
})
</script>