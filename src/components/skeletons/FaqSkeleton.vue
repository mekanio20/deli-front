<template>
    <div class="bg-white">
        <!-- Main Content -->
        <MainContainer>
            <!-- Breadcrumb Skeleton -->
            <div class="h-5 w-32 bg-gray-200 rounded animate-pulse py-4"></div>

            <!-- Header Skeleton -->
            <div class="bg-white">
                <div class="sm:max-w-[1500px] mx-auto px-4 py-6">
                    <div class="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
            </div>

            <div class="py-4">
                <!-- Navigation Tabs Skeleton -->
                <div class="mb-8">
                    <div class="flex flex-wrap gap-2 sm:gap-0 sm:space-x-2">
                        <div v-for="index in 4" :key="index" 
                            class="h-10 w-32 bg-gray-200 rounded-lg animate-pulse">
                        </div>
                    </div>
                </div>

                <!-- FAQ Accordion Skeleton -->
                <section class="space-y-6">
                    <FaqAccordionSkeleton v-for="index in 5" :key="index" />
                </section>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
// Skeleton component for FAQ page loading state
</script>