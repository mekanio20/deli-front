<template>
    <div class="bg-white mt-5">
        <MainContainer class="-mb-5">
            <!-- Breadcrumb Skeleton -->
            <div class="h-5 w-24 bg-gray-200 rounded animate-pulse py-4"></div>
        </MainContainer>

        <!-- Product Section Skeleton -->
        <MainContainer class="py-8 sm:py-12">
            <!-- Section Title Skeleton -->
            <div class="mb-6 sm:mb-8">
                <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <!-- Products Grid Skeleton -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <ProductCardSkeleton v-for="index in 5" :key="index" />
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
// Skeleton component for favorites page loading state
</script>