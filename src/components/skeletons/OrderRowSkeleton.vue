<template>
    <!-- Desktop Row -->
    <div class="hidden md:grid md:grid-cols-5 gap-4 p-4 items-center animate-pulse">
        <!-- Status Badge -->
        <div class="h-7 w-24 bg-gray-200 rounded-full"></div>
        
        <!-- Document Number -->
        <div class="h-4 w-28 bg-gray-200 rounded"></div>
        
        <!-- Date -->
        <div class="h-4 w-20 bg-gray-200 rounded"></div>
        
        <!-- Payment Type -->
        <div class="h-4 w-32 bg-gray-200 rounded"></div>
        
        <!-- Amount -->
        <div class="h-5 w-24 bg-gray-200 rounded"></div>
    </div>

    <!-- Mobile Card -->
    <div class="md:hidden p-4 space-y-3 animate-pulse">
        <!-- Header: Status and Document -->
        <div class="flex items-center justify-between">
            <div class="h-7 w-24 bg-gray-200 rounded-full"></div>
            <div class="h-4 w-20 bg-gray-200 rounded"></div>
        </div>

        <!-- Date -->
        <div class="flex items-center justify-between">
            <div class="h-3 w-12 bg-gray-200 rounded"></div>
            <div class="h-3 w-24 bg-gray-200 rounded"></div>
        </div>

        <!-- Payment Type -->
        <div class="flex items-center justify-between">
            <div class="h-3 w-20 bg-gray-200 rounded"></div>
            <div class="h-3 w-28 bg-gray-200 rounded"></div>
        </div>

        <!-- Amount -->
        <div class="flex items-center justify-between pt-2 border-t border-gray-200">
            <div class="h-3 w-16 bg-gray-200 rounded"></div>
            <div class="h-5 w-20 bg-gray-200 rounded"></div>
        </div>
    </div>
</template>

<script setup>
// Order row skeleton component for both desktop table and mobile card view
</script>