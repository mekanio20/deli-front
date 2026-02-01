<template>
    <div class="max-w-[1500px] mx-auto">
        <MainContainer class="flex items-center justify-between">
            <!-- Logo Skeleton -->
            <div class="w-[82px] h-[29px] bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
            
            <div class="flex items-center space-x-5">
                <!-- Search Bar Skeleton -->
                <div class="lg:block xl:w-[720px] w-[400px] hidden">
                    <div class="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                
                <!-- Navigation Items Skeleton -->
                <div class="flex items-end justify-center xl:gap-x-6 gap-x-5">
                    <!-- Nav Items -->
                    <div v-for="n in 6" :key="n" class="sm:block pb-[8px] hidden">
                        <div class="flex flex-col items-center space-y-1">
                            <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                            <div class="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>

        <!-- Mobile Bottom Navigation Skeleton -->
        <div class="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 !z-50">
            <div class="flex items-center justify-evenly py-2">
                <!-- Categories Button -->
                <div class="flex flex-col items-center space-y-1 py-2 px-3">
                    <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div class="w-16 h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                <!-- Nav Items -->
                <div v-for="n in 5" :key="n" class="flex flex-col items-center space-y-1 py-2 px-3">
                    <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div class="w-12 h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Skeleton component - no props needed
</script>