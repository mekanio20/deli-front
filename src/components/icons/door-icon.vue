<template>
    <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.6667 9V9.00833M1.5 16.5H16.5M4 16.5V3.16667C4 2.72464 4.17559 2.30072 4.48816 1.98816C4.80072 1.67559 5.22464 1.5 5.66667 1.5H12.3333C12.7754 1.5 13.1993 1.67559 13.5118 1.98816C13.8244 2.30072 14 2.72464 14 3.16667V16.5"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 18
    },
    color: {
        type: String,
        default: '#1DB954'
    }
})
</script>