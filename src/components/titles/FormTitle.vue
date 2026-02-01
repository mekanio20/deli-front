<template>
    <label :for="id" class="inline-block mb-3 text-[#838589] sm:text-base text-sm">
        {{ title }}
        <span v-if="isRequired" class="text-red-500 ml-1">*</span>
    </label>
</template>

<script setup>
defineProps({
    id: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    isRequired: {
        type: Boolean,
        default: false
    }
})
</script>