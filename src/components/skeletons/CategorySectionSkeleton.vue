<template>
    <div class="bg-white">
        <MainContainer>
            <SectionHeaderGroup class="sm:-mb-4 -mb-6">
                <div class="bg-gray-200 rounded w-[160px] h-10"></div>
                <div class="bg-gray-200 rounded w-[140px] h-10"></div>
            </SectionHeaderGroup>
            <!-- Skeleton Loader -->
            <Swiper :slides-per-view="6" :breakpoints="{
                100: { slidesPerView: 2, spaceBetween: 10 },
                640: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1280: { slidesPerView: 6, spaceBetween: 20 }
            }">
                <SwiperSlide v-for="i in 6" :key="i" class="py-6">
                    <div class="animate-pulse">
                        <div class="bg-gray-200 rounded-lg aspect-square mb-3"></div>
                        <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </MainContainer>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
</script>