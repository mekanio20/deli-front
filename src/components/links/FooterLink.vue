<template>
    <router-link :to="to" class="text-white sm:text-sm text-xs hover:text-[#DE0045] transition-colors duration-200 block py-1">
        {{ title }}
    </router-link>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
})
</script>