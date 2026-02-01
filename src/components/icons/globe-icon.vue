<template>
    <svg :width="size" :height="size" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.0003 23.8334C18.9834 23.8334 23.8337 18.9832 23.8337 13.0001C23.8337 7.017 18.9834 2.16675 13.0003 2.16675C7.01724 2.16675 2.16699 7.017 2.16699 13.0001C2.16699 18.9832 7.01724 23.8334 13.0003 23.8334Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2.16699 13H23.8337" :stroke="color" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        <path
            d="M13.0003 2.16675C15.71 5.1333 17.25 8.98312 17.3337 13.0001C17.25 17.017 15.71 20.8669 13.0003 23.8334C10.2906 20.8669 8.75068 17.017 8.66699 13.0001C8.75068 8.98312 10.2906 5.1333 13.0003 2.16675V2.16675Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 24
    },
    color: {
        type: String,
        default: '#0C1A30'
    }
})
</script>