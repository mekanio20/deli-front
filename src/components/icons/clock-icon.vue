<template>
    <svg :width="size" :height="size" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5386_15198)">
            <path
                d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 3V6L8 7" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_5386_15198">
                <rect :width="size" :height="size" fill="white" />
            </clipPath>
        </defs>
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
        default: '#949494'
    }
})
</script>