<template>
    <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.375 10.625L10.625 5.375M5.77888 5.77556L5.76857 5.76514M10.2345 10.277L10.2242 10.2665M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" />
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