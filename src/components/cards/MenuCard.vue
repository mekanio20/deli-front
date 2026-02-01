<template>
    <div class="flex flex-col items-center justify-center space-y-6 rounded-2xl">
        <div class="w-[90%] mx-auto bg-[#F5F5F7] rounded-2xl overflow-hidden px-8 py-10">
            <img class="w-full h-full" src="/images/product.png">
        </div>
        <h2 class="text-lg text-[#0C1A30] font-medium">{{ title }}</h2>
    </div>
</template>

<script setup>
defineProps({
    title: String
})
</script>