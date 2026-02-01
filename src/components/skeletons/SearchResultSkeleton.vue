<template>
    <div class="bg-white mt-5">

        <MainContainer class="-mb-14">
            <!-- Search Header Skeleton -->
            <div class="flex items-end space-x-6 my-6">
                <div class="h-8 lg:h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <!-- Filter Section Skeleton -->
            <div class="flex items-center justify-between py-4 border-t border-b border-gray-200">
                <!-- Filter Button Skeleton -->
                <div class="flex items-center space-x-2">
                    <div class="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                <!-- Sort Dropdown Skeleton -->
                <div class="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
        </MainContainer>

        <!-- Products Grid Skeleton -->
        <MainContainer class="py-8 sm:py-12">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <ProductCardSkeleton v-for="index in 5" :key="index" />
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
// Skeleton component for search results page loading state
</script>