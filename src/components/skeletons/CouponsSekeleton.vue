<template>
    <div class="min-h-screen bg-white py-6 px-4 sm:py-8 sm:px-6">
        <MainContainer>
            <!-- Breadcrumb Skeleton -->
            <div class="h-5 w-24 bg-gray-200 rounded animate-pulse py-4"></div>
        </MainContainer>

        <div class="max-w-5xl mx-auto">
            <!-- Header Skeleton -->
            <div class="text-center mb-10 sm:mb-16">
                <div class="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>

            <!-- Loyalty Section -->
            <section class="w-full">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
                    <!-- Card Section Skeleton -->
                    <section class="lg:col-span-2 relative animate-pulse">
                        <div class="w-full h-48 sm:h-60 lg:h-[356px] bg-gray-200 rounded-[10px]"></div>
                        <div class="absolute bottom-6 sm:bottom-10 left-1/2 w-[90%] sm:w-[80%] -translate-x-1/2 h-[100px] sm:h-[140px] rounded-md bg-white shadow-md">
                            <div class="flex flex-col h-full space-y-3 items-center justify-center">
                                <div class="w-[80%] h-16 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </section>

                    <!-- Card Info Skeleton -->
                    <aside class="px-6 py-4 sm:px-10 sm:py-6 lg:px-14 lg:py-10 space-y-6 sm:space-y-8 bg-[#F6F7F9] rounded-[10px] animate-pulse">
                        <!-- Points Skeleton -->
                        <div class="text-center lg:text-left space-y-2">
                            <div class="h-7 w-32 bg-gray-200 rounded mx-auto lg:mx-0"></div>
                            <div class="h-4 w-20 bg-gray-200 rounded mx-auto lg:mx-0"></div>
                        </div>

                        <!-- Status Skeleton -->
                        <div class="py-4 sm:py-6 border-t border-b border-gray-100 text-center lg:text-left space-y-2">
                            <div class="h-7 w-28 bg-gray-200 rounded mx-auto lg:mx-0"></div>
                            <div class="h-4 w-16 bg-gray-200 rounded mx-auto lg:mx-0"></div>
                        </div>

                        <!-- Card Number Skeleton -->
                        <div class="text-center lg:text-left space-y-2">
                            <div class="h-7 w-40 bg-gray-200 rounded mx-auto lg:mx-0"></div>
                            <div class="h-4 w-24 bg-gray-200 rounded mx-auto lg:mx-0"></div>
                        </div>
                    </aside>
                </div>
            </section>

            <!-- Transaction History Skeleton -->
            <section class="mt-10 sm:mt-12 w-full">
                <div class="overflow-hidden">
                    <!-- Header Skeleton -->
                    <div class="py-4 sm:py-6">
                        <div class="h-7 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <!-- Table Skeleton -->
                    <div class="overflow-x-auto rounded-[10px]">
                        <table class="min-w-full text-sm sm:text-base">
                            <thead class="bg-[#F6F7F9]">
                                <tr>
                                    <th class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                        <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                                    </th>
                                    <th class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                        <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    </th>
                                    <th class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                        <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    </th>
                                    <th class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left">
                                        <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#EDEDED]">
                                <LoyaltyTransactionRowSkeleton v-for="index in 5" :key="index" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
// Skeleton component for loyalty card page loading state
</script>