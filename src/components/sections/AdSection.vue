<template>
    <div class="bg-white">
        <MainContainer>
            <Swiper :slides-per-view="4" :modules="[Autoplay]" :loop="true" :duration="1000" :autoplay="{ delay: 3000, disableOnInteraction: false }" :breakpoints="{
                    100: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                }">
                <SwiperSlide v-for="(item, index) in ads" :key="index" class="py-6">
                    <AdCard :ad="item" />
                </SwiperSlide>
            </Swiper>
        </MainContainer>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from "swiper/modules";
import 'swiper/css'
const props = defineProps({
    ads: {
        type: Array,
        required: true
    },
})
</script>