<template>
    <div class="bg-white mt-5">
        <MainContainer>
            <!-- Breadcrumb Skeleton -->
            <div class="h-5 w-24 bg-gray-200 rounded animate-pulse py-4"></div>
            
            <!-- Title Skeleton -->
            <div class="pt-6">
                <div class="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </MainContainer>

        <!-- Orders Table Skeleton -->
        <MainContainer class="mt-5">
            <div class="bg-white rounded-lg overflow-hidden">
                
                <!-- Status Filter Tabs Skeleton -->
                <div class="flex items-center space-x-2 border-b border-gray-200 p-4 overflow-x-auto">
                    <div v-for="index in 5" :key="index" 
                        class="h-10 w-24 bg-gray-200 rounded-lg animate-pulse flex-shrink-0">
                    </div>
                </div>

                <!-- Table Header Skeleton -->
                <div class="hidden md:grid md:grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50">
                    <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <!-- Table Rows Skeleton -->
                <div class="divide-y divide-gray-200">
                    <OrderRowSkeleton v-for="index in 5" :key="index" />
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
// Skeleton component for orders page loading state
</script>

<style scoped>
/* Hide scrollbar for mobile tabs */
.overflow-x-auto::-webkit-scrollbar {
    display: none;
}
.overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>