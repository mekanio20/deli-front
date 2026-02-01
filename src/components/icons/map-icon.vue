<template>
    <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2705_6426)">
            <path d="M0.75 4.5V16.5L6 13.5L12 16.5L17.25 13.5V1.5L12 4.5L6 1.5L0.75 4.5Z" :stroke="color"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 4.5V16.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 1.5V13.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_2705_6426">
                <rect :width="size" :height="size" fill="white" />
            </clipPath>
        </defs>
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
        default: '#009FE3'
    }
})
</script>