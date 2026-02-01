<template>
    <svg :width="size" :height="size" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.625 4.25V7.3125M12.375 4.25V7.3125M2.3125 10.375H13.6875C14.4124 10.375 15 9.78737 15 9.0625V2.9375C15 2.21263 14.4124 1.625 13.6875 1.625H2.3125C1.58763 1.625 1 2.21263 1 2.9375V9.0625C1 9.78737 1.58763 10.375 2.3125 10.375ZM9.75 6C9.75 6.9665 8.9665 7.75 8 7.75C7.0335 7.75 6.25 6.9665 6.25 6C6.25 5.0335 7.0335 4.25 8 4.25C8.9665 4.25 9.75 5.0335 9.75 6Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
        default: '#FA004C'
    }
})
</script>