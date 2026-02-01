<template>
    <div class="bg-white mt-5">
        <MainContainer>
            <!-- Section Header Skeleton -->
            <div v-if="sectionTitle" class="flex items-center justify-between mb-6">
                <div class="h-8 lg:h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div v-if="isRedirectLink" class="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <!-- Products Skeleton Grid -->
            <Swiper :modules="modules" :slides-per-view="slidesPerView" :duration="1000" :autoplay="{
                delay: 2500,
                disableOnInteraction: false
            }" :breakpoints="{
                    100: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 3, spaceBetween: 20 }
                }" class="flex items-center space-x-6">
                <SwiperSlide v-for="n in slidesPerView" :key="n" class="flex flex-col sm:space-y-3 space-y-2">
                    <!-- Image Skeleton -->
                    <div class="bg-gray-200 rounded-[10px] overflow-hidden sm:h-[300px] h-[234px] animate-pulse">
                        <div class="relative w-full h-full flex items-center justify-center">
                            <!-- Favorite Button Skeleton -->
                            <div class="absolute right-2 top-2">
                                <div class="w-[35px] h-[35px] rounded-full bg-gray-300"></div>
                            </div>

                            <!-- Add to Cart Button Skeleton -->
                            <div class="absolute w-full px-4 bottom-4">
                                <div class="w-full sm:py-3 py-2 bg-gray-300 rounded-[6px] h-10"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Product Info Skeleton -->
                    <div class="flex flex-col sm:space-y-2 space-y-1">
                        <!-- Price Skeleton -->
                        <div class="flex items-center sm:space-x-8 space-x-3">
                            <div class="h-5 sm:h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
                            <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <!-- Product Name Skeleton -->
                        <div class="space-y-1">
                            <div class="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                            <div class="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </MainContainer>
    </div>
</template>

<script setup>
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
const slidesPerView = ref(3)
const props = defineProps({
    slidesPerView: {
        type: [Number, String],
        default: 5
    },
    sectionTitle: {
        type: String,
        default: ''
    },
    isRedirectLink: {
        type: Boolean,
        default: true
    }
})
</script>