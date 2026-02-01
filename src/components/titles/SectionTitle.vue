<template>
    <h3 class="font-semibold lg:text-[30px] leading-[100%] sm:text-[30px] text-lg text-[#0C1A30] sm:pt-0">
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