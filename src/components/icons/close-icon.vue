<template>
    <svg :width="size" :height="size" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0205 12.0208L21.92 21.9202" :stroke="color" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M12.0205 21.9202L21.92 12.0207" :stroke="color" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 34
    },
    color: {
        type: String,
        default: '#0C1A30'
    }
})
</script>