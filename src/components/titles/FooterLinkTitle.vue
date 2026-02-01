<template>
    <h3 class="text-[#0C1A30] sm:text-lg text-sm font-semibold leading-[100%] mb-5">
        {{ title }}
    </h3>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>