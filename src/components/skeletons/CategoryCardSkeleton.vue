<template>
    <div class="sm:h-[230px] h-[195px] relative overflow-hidden rounded-[10px] bg-gray-200 animate-pulse">
        <!-- Title Skeleton -->
        <div class="absolute top-4 left-5">
            <div class="h-5 sm:h-6 w-32 bg-gray-300 rounded"></div>
        </div>

        <!-- Image Skeleton -->
        <div class="w-[100px] h-[100px] absolute z-20 bottom-0 right-0 bg-gray-300 rounded"></div>

        <!-- Circle Background Skeleton -->
        <div class="w-[180px] h-[180px] rounded-full absolute -bottom-[70px] -right-[70px] z-10 bg-gray-300/50"></div>
    </div>
</template>

<script setup>
// Skeleton component - no props needed
</script>