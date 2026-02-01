<template>
    <div class="bg-white h-[180px] rounded-lg overflow-hidden p-[10px] relative animate-pulse">
        <!-- Badge Icon Skeleton -->
        <div class="absolute right-2 top-2 sm:w-[40px] sm:h-[40px] w-[35px] h-[35px] bg-gray-200 rounded-full">
        </div>

        <div class="h-full flex items-center space-x-4">
            <!-- Product Image Skeleton -->
            <div class="w-[40%] h-full bg-gray-200 rounded-md shrink-0"></div>

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
    </div>
</template>

<script setup>
// Skeleton component - no props needed
</script>