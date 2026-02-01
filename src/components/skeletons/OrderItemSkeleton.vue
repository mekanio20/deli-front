<template>
    <div class="p-3 sm:p-5 animate-pulse">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <!-- Product Image and Name -->
            <div class="flex items-center space-x-3 w-full sm:w-auto">
                <!-- Image Skeleton -->
                <div class="w-16 h-16 sm:w-[100px] sm:h-[100px] bg-gray-200 rounded-[10px] flex-shrink-0">
                </div>
                
                <!-- Product Name Skeleton -->
                <div class="flex-1 space-y-2">
                    <div class="h-4 w-full sm:w-48 bg-gray-200 rounded"></div>
                    <div class="h-4 w-3/4 sm:w-36 bg-gray-200 rounded"></div>
                </div>
            </div>

            <!-- Price Details -->
            <div class="flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 w-full sm:px-10 sm:w-auto sm:flex-1">
                <!-- Price -->
                <div class="space-y-2">
                    <div class="h-3 w-12 bg-gray-200 rounded"></div>
                    <div class="h-5 w-16 bg-gray-200 rounded"></div>
                </div>
                
                <!-- Quantity -->
                <div class="space-y-2">
                    <div class="h-3 w-16 bg-gray-200 rounded"></div>
                    <div class="h-5 w-8 bg-gray-200 rounded"></div>
                </div>
                
                <!-- Total Amount -->
                <div class="space-y-2">
                    <div class="h-3 w-14 bg-gray-200 rounded"></div>
                    <div class="h-5 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Order item skeleton component for individual product rows
</script>