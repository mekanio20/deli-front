<template>
    <div>
        <AccountFavoriteSkeleton v-show="pageLoading" />
        <div v-show="!pageLoading" class="bg-white">
            <MainContainer class="-mb-10">
                <LinkGroup :items="[{ label: $t('nav.favorites'), to: '/account/favorite' }]" />
            </MainContainer>
            <NoDataSection v-if="likesStore.likes.length === 0" image="/icons/favorite.webp"
                :desc="$t('descriptions.favorites1')" />
            <MainContainer v-else>
                <div class="mt-10 space-y-3">
                    <h3 class="font-semibold lg:text-[30px] leading-[100%] sm:text-[30px] text-lg text-[#0C1A30]">{{
                        $t('names.favorite_products') }}</h3>
                    <div
                        class="flex-1 pt-4 pb-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8">
                        <ProductCard v-for="(item, index) in likesStore.likes" :key="index" :product="item" />
                    </div>
                </div>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
const pageLoading = ref(true)
const likesStore = useLikesStore()

onMounted(async () => {
    pageLoading.value = true
    try {
        await likesStore.fetchLikedProducts()
    } catch (error) {
        console.error('Error fetching likes:', error)
    } finally {
        pageLoading.value = false
    }
})
</script>