<template>
    <div class="flex flex-col items-center justify-center space-y-6 rounded-2xl">
        <div class="w-[200px] h-[200px] bg-[#F5F5F7] rounded-2xl overflow-hidden px-8 py-10">
            <img class="w-full h-full" :src="data.image || '/icons/default.webp'">
        </div>
        <h2 class="text-lg text-[#0C1A30] font-medium w-[200px]">{{ data.name }}</h2>
    </div>
</template>

<script setup>
defineProps({
    data: Object
})
</script>