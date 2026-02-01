<template>
    <div class="bg-white mt-4">
        <MainContainer class="-mb-10">
            <div class="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
        </MainContainer>
        <div class="bg-white mt-5 pb-10">
            <MainContainer>
                <SectionHeaderGroup class="sm:pb-10 pb-6">
                    <div class="pt-6">
                        <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </SectionHeaderGroup>
                <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                    <CategoryCardSkeleton v-for="index in 12" :key="index" />
                </div>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
// Skeleton component for loading state
</script>