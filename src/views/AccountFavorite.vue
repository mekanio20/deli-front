<template>
    <div>
        <AccountFavoriteSkeleton v-show="likesStore.loading" />
        <div v-show="!likesStore.loading" class="bg-white">
            <MainContainer class="-mb-10">
                <LinkGroup :items="[{ label: $t('nav.favorites'), to: '/account/favorite' }]" />
            </MainContainer>
            <NoDataSection v-if="!likedProducts.length" image="/icons/favorite.webp" :desc="$t('descriptions.favorites1')" />
            <ProductSection v-else :isRedirectLink="false" :sectionTitle="$t('names.favorite_products')"
                :products="likedProducts" />
        </div>
    </div>
</template>

<script setup>
const likesStore = useLikesStore()
const likedProducts = ref([])

onMounted(async () => {
    try {
        likedProducts.value = await likesStore.fetchLikedProducts()
    } catch (error) {
        console.error('Error fetching likes:', error)
    }
})
</script>