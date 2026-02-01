<template>
    <div class="bg-white">
        <MainContainer>
            <!-- Breadcrumb Skeleton -->
            <div class="flex items-center space-x-2 py-4">
                <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <!-- Product Content -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <!-- Left Side - Images Skeleton -->
                <div class="flex lg:flex-row flex-col-reverse gap-y-4 sm:mt-0 mt-6 lg:gap-x-4">

                    <!-- Thumbnail Images Skeleton -->
                    <div class="flex items-start lg:flex-col flex-row lg:space-y-2 lg:space-x-0 space-x-2">
                        <div v-for="index in 4" :key="index"
                            class="w-[100px] h-[100px] rounded-lg bg-gray-200 animate-pulse">
                        </div>
                    </div>

                    <!-- Main Image Skeleton -->
                    <div class="sm:h-[510px] h-[280px] w-full mx-auto bg-gray-200 rounded-lg animate-pulse">
                    </div>
                </div>

                <!-- Right Side - Product Info Skeleton -->
                <div class="space-y-6 lg:ml-10">
                    <!-- Status Tags Skeleton -->
                    <div class="flex items-center space-x-3">
                        <div class="h-7 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        <div class="h-7 w-28 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>

                    <!-- Product Title Skeleton -->
                    <div class="space-y-2">
                        <div class="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                        <div class="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <!-- Product Info Skeleton -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between py-3 border-b border-[#EDEDED]">
                            <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div class="flex items-center justify-between py-3 border-b border-[#EDEDED]">
                            <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div class="flex items-center justify-between py-3">
                            <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Price Skeleton -->
                    <div class="sm:py-6 py-3">
                        <div class="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <!-- Action Buttons Skeleton -->
                    <div class="flex flex-row items-center space-x-3">
                        <div class="flex-1 h-12 bg-gray-200 rounded-[10px] animate-pulse"></div>
                        <div class="w-12 h-12 bg-gray-200 rounded-[10px] animate-pulse"></div>
                    </div>
                </div>
            </div>

            <!-- Product Description Skeleton -->
            <div class="mt-12 lg:mt-16">
                <div class="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div class="space-y-3">
                    <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </MainContainer>

        <!-- Related Products Skeleton -->
        <div class="mt-12 lg:mt-16">
            <MainContainer>
                <div class="h-8 w-64 bg-gray-200 rounded animate-pulse mb-8"></div>
                <Swiper :slides-per-view="6" :breakpoints="{
                    100: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 5, spaceBetween: 20 },
                    1280: { slidesPerView: 6, spaceBetween: 20 }
                }">
                    <SwiperSlide v-for="index in 5" :key="index">
                        <ProductCardSkeleton />
                    </SwiperSlide>
                </Swiper>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
</script>