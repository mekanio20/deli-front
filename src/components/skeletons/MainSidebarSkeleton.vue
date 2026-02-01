<template>
    <div class="flex">
        <!-- Sidebar Skeleton -->
        <div
            class="fixed left-0 sm:top-[112px] top-[95px] sm:h-[calc(100vh-112px)] h-[calc(100vh-95px)] bg-white shadow-lg border-r border-gray-200 z-20 flex flex-col w-full md:w-72">

            <!-- Menu Categories Skeleton -->
            <div class="flex-1 py-4 overflow-y-auto">
                <div class="space-y-1 px-3 pb-20">
                    <!-- Search Skeleton (Mobile) -->
                    <div class="mb-4 h-12 bg-gray-200 rounded-lg animate-pulse md:hidden"></div>

                    <!-- Category Items Skeleton -->
                    <div v-for="n in 8" :key="n" class="animate-pulse">
                        <div class="flex items-center justify-between sm:px-4 px-2 py-3 rounded-lg">
                            <div class="flex items-center space-x-2 flex-1">
                                <!-- Icon Skeleton -->
                                <div class="w-[30px] h-[30px] bg-gray-200 rounded"></div>
                                <!-- Text Skeleton -->
                                <div class="h-4 bg-gray-200 rounded flex-1 max-w-[150px]"></div>
                            </div>
                            <!-- Arrow Skeleton -->
                            <div class="w-4 h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Submenu Skeleton (desktop only) -->
        <div
            class="hidden md:block fixed left-72 sm:top-[112px] top-[95px] sm:h-[calc(100vh-112px)] h-[calc(100vh-95px)] w-64 bg-white z-40">
            <div class="flex-1 py-4 overflow-y-auto">
                <div class="space-y-1 px-3">
                    <div v-for="n in 6" :key="n" class="animate-pulse">
                        <div class="flex items-center px-4 py-3 rounded-lg">
                            <!-- Icon Skeleton -->
                            <div class="w-[20px] h-[20px] bg-gray-200 rounded mr-2"></div>
                            <!-- Text Skeleton -->
                            <div class="h-4 bg-gray-200 rounded flex-1 max-w-[120px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Overlay -->
        <div class="fixed left-0 right-0 bottom-0 top-[112px] bg-black bg-opacity-40 z-10"></div>
    </div>
</template>

<script setup>
// Skeleton component - no props needed
</script>