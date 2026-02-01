<template>
    <div class="flex items-center sm:space-x-4 space-x-2 sm:py-6 pt-4">
        <router-link to="/">
            <home-icon />
        </router-link>
        <router-link v-for="(item, index) in items" :key="index" :to="item.to" class="flex items-center sm:space-x-4 space-x-2 mt-1">
            <arrow_small-icon />
            <span class="sm:text-sm text-xs text-[#838589]">{{ item.label }}</span>
        </router-link>
    </div>
</template>

<script setup>
defineProps({
    items: {
        type: Array,
        required: true
    }
})
</script>