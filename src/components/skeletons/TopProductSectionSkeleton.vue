<template>
    <MainContainer class="bg-white">
        <div
            class="relative sm:py-10 py-6 overflow-hidden rounded-lg bg-[linear-gradient(to_bottom,#FFC745,#FEC84A,#FFDB85,#FEC849,#FFD268)]">
            <!-- Bg Icon -->
            <div class="absolute top-0 left-0">
                <img class="w-[150px] h-[150px]" src="/icons/bg-2.webp" />
            </div>

            <MainContainer class="flex items-center sm:justify-end justify-between">
                <!-- Title Skeleton -->
                <div class="absolute sm:block hidden left-1/2 transform -translate-x-1/2">
                    <div class="h-9 lg:h-11 w-80 bg-white/30 rounded animate-pulse"></div>
                </div>
                <div class="sm:hidden z-10">
                    <div class="h-7 w-64 bg-white/30 rounded animate-pulse"></div>
                </div>

                <!-- View All Button Skeleton -->
                <div class="h-10 w-28 bg-[#FFF8E6]/50 rounded-lg animate-pulse"></div>
            </MainContainer>

            <div class="sm:px-10 px-4 sm:pt-10">
                <!-- Products Skeleton Grid -->
                <Swiper :slides-per-view="slidesPerView" :duration="1000" :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false
                }" :breakpoints="{
                    100: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 3, spaceBetween: 20 }
                }" class="flex items-center space-x-6">
                    <SwiperSlide v-for="n in 3" :key="n"
                        class="bg-white h-[180px] rounded-lg overflow-hidden p-[10px] relative animate-pulse">
                        <!-- Badge Icon Skeleton -->
                        <div
                            class="absolute right-2 top-2 sm:w-[40px] sm:h-[40px] w-[35px] h-[35px] bg-gray-200 rounded-full">
                        </div>

                        <div class="h-full flex items-center space-x-4">
                            <!-- Product Image Skeleton -->
                            <div class="w-[30%] h-full bg-gray-200 rounded-md shrink-0"></div>

                            <!-- Content Skeleton -->
                            <div class="w-full flex flex-col justify-center space-y-4">
                                <!-- Name Skeleton -->
                                <div class="w-[80%] space-y-2">
                                    <div class="h-4 bg-gray-300 rounded w-full"></div>
                                    <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                                </div>

                                <!-- Price Skeleton -->
                                <div class="h-5 lg:h-6 w-24 bg-gray-300 rounded"></div>

                                <!-- Button Skeleton -->
                                <div class="w-full h-[45px] bg-gray-200 rounded-md"></div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </MainContainer>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
const slidesPerView = ref(3)
// Skeleton component - no props needed
</script>