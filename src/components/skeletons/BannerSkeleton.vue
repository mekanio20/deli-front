<template>
    <div class="bg-white rounded-b-[14px] mb-5">
        <MainContainer>
            <div class="w-full h-full -mb-5">
                <div class="w-full sm:h-[400px] h-[300px] mt-3 bg-gray-200 rounded-2xl animate-pulse relative">
                    <!-- Skeleton Image Area -->
                    <div class="w-full h-full rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                    
                    <!-- Pagination Dots Skeleton -->
                    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                        <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
// Skeleton component - no props needed
</script>

<style scoped>
@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

.animate-shimmer {
    animation: shimmer 2s infinite;
}
</style>