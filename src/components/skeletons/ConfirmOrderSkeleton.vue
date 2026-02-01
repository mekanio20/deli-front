<template>
    <div class="min-h-screen bg-[#F6F7F9]">
        <!-- Header -->
        <MainContainer>
            <!-- Breadcrumb Skeleton -->
            <div class="h-5 w-24 bg-gray-200 rounded animate-pulse py-4"></div>

            <!-- Title Section -->
            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6">
                <div class="lg:w-[950px] w-full flex items-center justify-between py-8 rounded-xl overflow-hidden">
                    <div class="flex items-center justify-between">
                        <div class="flex sm:flex-row flex-col sm:items-end sm:space-x-5 sm:space-y-0 space-y-2">
                            <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div class="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div class="w-[370px] lg:block hidden py-6 p-8 rounded-xl"></div>
            </div>

            <!-- Content -->
            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6 mb-10">
                <!-- Main Form Section -->
                <div class="lg:w-[950px] w-full space-y-4 px-4 pt-4 bg-white rounded-xl animate-pulse">
                    <!-- Notes Skeleton -->
                    <div class="pb-12 pt-4 border-b border-[#EDEDED] space-y-3">
                        <div class="h-4 w-full bg-gray-200 rounded"></div>
                        <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>

                    <!-- Form Title -->
                    <div class="h-6 w-40 bg-gray-200 rounded"></div>

                    <!-- Form Fields Grid -->
                    <div class="grid grid-cols-2 gap-6 pt-4">
                        <CheckoutFormFieldSkeleton v-for="index in 6" :key="index" />
                    </div>

                    <!-- Payment Type Section -->
                    <div class="pb-4 pt-10 space-y-8">
                        <div class="h-6 w-32 bg-gray-200 rounded"></div>
                        <div class="sm:max-w-[600px] max-w-[324px] grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                            <PaymentCardSkeleton v-for="index in 3" :key="index" />
                        </div>
                    </div>

                    <!-- Delivery Service Section -->
                    <div class="pb-4 pt-10 space-y-8">
                        <div class="h-6 w-40 bg-gray-200 rounded"></div>
                        <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                            <DeliveryCardSkeleton v-for="index in 3" :key="index" />
                        </div>

                        <!-- Time Slots Skeleton -->
                        <div class="pt-4 space-y-4">
                            <div class="h-5 w-32 bg-gray-200 rounded"></div>
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                <div v-for="index in 4" :key="index" class="h-12 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>

                        <!-- Date Picker Skeleton -->
                        <div class="max-w-[324px] space-y-2">
                            <div class="h-4 w-32 bg-gray-200 rounded"></div>
                            <div class="h-12 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>

                <!-- Order Summary Sidebar -->
                <div class="lg:w-[370px] w-full py-6 px-8 bg-white rounded-xl lg:sticky lg:top-32">
                    <div class="space-y-4 animate-pulse">
                        <!-- Price Items -->
                        <div class="space-y-3">
                            <div v-for="index in 4" :key="index" class="flex justify-between items-center">
                                <div class="h-4 w-24 bg-gray-200 rounded"></div>
                                <div class="h-4 w-20 bg-gray-200 rounded"></div>
                            </div>
                        </div>

                        <!-- Total -->
                        <div class="border-t border-[#EDEDED] pt-4 mt-4">
                            <div class="flex justify-between items-center">
                                <div class="h-5 w-28 bg-gray-200 rounded"></div>
                                <div class="h-6 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>

                        <!-- Checkout Button -->
                        <div class="h-12 w-full bg-gray-200 rounded-lg mt-6"></div>
                    </div>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
// Skeleton component for checkout page loading state
</script>