<template>
    <svg :width="size" :height="size" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M21.6673 22C22.2656 22 22.7507 21.5523 22.7507 21C22.7507 20.4477 22.2656 20 21.6673 20C21.069 20 20.584 20.4477 20.584 21C20.584 21.5523 21.069 22 21.6673 22Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M9.74935 22C10.3477 22 10.8327 21.5523 10.8327 21C10.8327 20.4477 10.3477 20 9.74935 20C9.15104 20 8.66602 20.4477 8.66602 21C8.66602 21.5523 9.15104 22 9.74935 22Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M1.08398 1H5.41732L8.32065 14.39C8.41972 14.8504 8.69105 15.264 9.08716 15.5583C9.48327 15.8526 9.97891 16.009 10.4873 16H21.0173C21.5257 16.009 22.0214 15.8526 22.4175 15.5583C22.8136 15.264 23.0849 14.8504 23.184 14.39L24.9173 6H6.50065"
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