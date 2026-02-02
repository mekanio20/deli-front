<template>
    <h1 class="sm:text-[22px] text-lg font-semibold text-[#0C1A30]">
        {{ title }}
    </h1>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>