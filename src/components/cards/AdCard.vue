<template>
    <div class="h-[230px] relative overflow-hidden rounded-[10px] cursor-pointer"
        :style="{ backgroundColor: ad.bg_color }">
        <h3 class="block text-white font-bold text-[26px] absolute z-40 top-6 left-5 w-52 break-words">
            {{ ad.title }}
        </h3>
        <div class="absolute top-7 right-4 bg-[#FFFFFF66] text-white font-medium text-[10px] rounded-full px-3 py-2">
            {{ $t('names.ad') }}
        </div>
        <div class="w-[70%] h-[140px] absolute z-20 bottom-0 right-0">
            <img :src="ad?.image_tk?.path || '/icons/default.webp'" class="w-full h-full object-cover" />
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
    ad: {
        type: Object,
        required: true
    }
})
</script>