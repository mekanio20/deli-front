<template>
    <svg :width="size" :height="size" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.133 19C1.955 19 1 18.02 1 16.81V8.00817C1 7.34318 1.295 6.71319 1.8 6.29819L7.667 1.48027C8.04186 1.16986 8.5133 1 9 1C9.4867 1 9.95814 1.16986 10.333 1.48027L16.199 6.29819C16.705 6.71319 17 7.34318 17 8.00817V16.81C17 18.02 16.045 19 14.867 19H3.133Z"
            fill="#EDEDED" :stroke="color" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M6.5 18.9999V13.5C6.5 12.9695 6.71071 12.4608 7.08579 12.0858C7.46086 11.7107 7.96957 11.5 8.5 11.5H9.5C10.0304 11.5 10.5391 11.7107 10.9142 12.0858C11.2893 12.4608 11.5 12.9695 11.5 13.5V18.9999"
            fill="#EDEDED" />
        <path
            d="M6.5 18.9999V13.5C6.5 12.9695 6.71071 12.4608 7.08579 12.0858C7.46086 11.7107 7.96957 11.5 8.5 11.5H9.5C10.0304 11.5 10.5391 11.7107 10.9142 12.0858C11.2893 12.4608 11.5 12.9695 11.5 13.5V18.9999"
            :stroke="color" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
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
        default: '#838589'
    }
})
</script>