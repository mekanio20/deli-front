<template>
    <div :style="{ width: `${width}px`, height: `${height}px` }">
        <img class="w-full h-full" src="/icons/logo.png" />
    </div>
</template>

<script setup>
defineProps({
    width: { type: Number, default: 82 },
    height: { type: Number, default: 29 }
})
</script>