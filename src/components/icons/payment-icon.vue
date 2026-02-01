<template>
    <svg :width="size" :height="size" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.43716 4.03114H14.5622M4.06216 7.09364H6.24966M2.75 0.96875H13.2497C14.2162 0.96875 14.9997 1.75164 14.9997 2.71812L14.9999 9.28199C14.9999 10.2485 14.2164 11.0312 13.2499 11.0312L2.75017 11.0311C1.7837 11.0311 1.00021 10.2477 1.00019 9.28118L1 2.7188C0.999972 1.75228 1.78348 0.96875 2.75 0.96875Z"
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
        default: '#009FE3'
    }
})
</script>