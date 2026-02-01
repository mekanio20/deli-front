<template>
    <div class="bg-[#F6F7F9] w-full">
        <!-- Header -->
        <MainContainer>
            <!-- Breadcrumb Skeleton -->
            <div class="flex items-center space-x-2 py-4">
                <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <!-- Title Section -->
            <div class="pb-4 sm:pb-8 pt-4 sm:pt-6 w-full">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div class="flex items-center space-x-3 sm:space-x-5">
                        <div class="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div class="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div class="h-8 w-28 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            </div>

            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 gap-4 lg:gap-6 mb-6 sm:mb-10">
                <!-- Main Content -->
                <div class="bg-white w-full rounded-lg">
                    <!-- Order Items Skeleton -->
                    <div class="divide-y divide-[#EDEDED] rounded-xl overflow-hidden">
                        <OrderItemSkeleton v-for="index in 3" :key="index" />
                    </div>

                    <!-- Contact Information Section -->
                    <div class="w-full space-y-4 p-4 sm:p-6 lg:p-8 bg-white border-t border-[#EDEDED]">
                        <div class="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>

                        <div class="w-full">
                            <div class="pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <!-- Address Field -->
                                <div class="space-y-2">
                                    <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    <div class="h-[80px] sm:h-[100px] w-full bg-gray-200 rounded-[10px] animate-pulse"></div>
                                </div>
                                
                                <!-- Note Field -->
                                <div class="space-y-2">
                                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div class="h-[80px] sm:h-[100px] w-full bg-gray-200 rounded-[10px] animate-pulse"></div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Payment Type -->
                                <div class="pb-4 pt-6 sm:pt-10 space-y-4 sm:space-y-8">
                                    <div class="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    <div class="h-14 w-full sm:w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                                
                                <!-- Delivery Service -->
                                <div class="pb-4 pt-0 sm:pt-10 space-y-4 sm:space-y-8">
                                    <div class="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
                                    <div class="h-14 w-full sm:w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Summary Sidebar -->
                <div class="w-full lg:w-[370px] py-4 sm:py-6 px-3 sm:px-4 bg-white rounded-xl lg:sticky lg:top-32 flex-shrink-0">
                    <!-- Gift Card and Loyalty Card Section -->
                    <div class="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
                        <!-- Gift Card Skeleton -->
                        <div class="h-14 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        
                        <!-- Loyalty Card Skeleton -->
                        <div class="h-14 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>

                    <!-- Price Breakdown -->
                    <div class="space-y-3">
                        <div class="border-t border-[#EDEDED] pt-3 sm:pt-4">
                            <div class="flex justify-between items-center">
                                <div class="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
                                <div class="h-7 w-28 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
// Skeleton component for order detail page loading state
</script>