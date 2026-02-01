<template>
    <div>
        <SearchResultSkeleton v-show="loading" />
        <MainContainer class="-mb-10">
            <LinkGroup :items="[{ label: $t('names.search_results'), to: '' }]" />
        </MainContainer>
        <NoDataSection v-if="!searchedProducts.length && !loading" image="/icons/search.webp"
            :desc="$t('names.no_results')" />
        <div v-else>
            <MainContainer class="-mb-14">
                <div class="flex items-end space-x-6 sm:mt-6 mt-10">
                    <h3 class="font-semibold lg:text-[30px] sm:text-[30px] text-lg text-[#0C1A30]">
                        {{ searchQuery }}
                    </h3>
                    <p class="text-sm text-[#838589]">{{ productsCount }} {{ $t('page.product') }}</p>
                </div>
                <FilterSection @openFilter="openFilter" @applySort="applySort" />
                <div class="pt-4 pb-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
                    <ProductCard v-for="(item, index) in searchedProducts" :key="index" :product="item" />
                </div>
                <!-- Loading More Indicator -->
                <div v-if="loadingMore" class="flex justify-center py-8">
                    <div class="flex items-center space-x-2">
                        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
                        <span class="text-gray-600">{{ $t('buttons.loading') }}</span>
                    </div>
                </div>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const showFilter = ref(false)
const productStore = useProductsStore()
const { productsCount, loading, loadingMore, hasNextPage } = storeToRefs(productStore)
const { loadMoreProducts } = productStore
const searchedProducts = ref([])
const searchQuery = ref('')
const currentQuery = ref({})

const openFilter = () => {
    showFilter.value = true
}

const applySort = async (sort) => {
    currentQuery.value = {
        ...currentQuery.value,
        ordering: sort.value
    }
    searchedProducts.value = await productStore.fetchProducts(currentQuery.value)
}

const applyFilters = async (filters) => {
    currentQuery.value = {
        ...currentQuery.value,
        ...filters
    }
    searchedProducts.value = await productStore.fetchProducts(currentQuery.value)
    showFilter.value = false
}

onMounted(async () => {
    try {
        searchQuery.value = route.query.q || ''
        currentQuery.value = { search: route.query.q || '' }
        searchedProducts.value = await productStore.fetchProducts(currentQuery.value)
    } catch (error) {
        console.error('Error fetching search results:', error)
    }
})

watch(() => route.query.q, async () => {
    try {
        searchQuery.value = route.query.q || ''
        currentQuery.value = {
            ...currentQuery.value,
            search: searchQuery.value
        }
        searchedProducts.value = await productStore.fetchProducts(currentQuery.value)
    } catch (error) {
        console.error('Error fetching search results:', error)
    }
})

// Infinite scroll logic
const handleScroll = async () => {
    if (loadingMore.value || !hasNextPage.value) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Load more when user is 200px from bottom
    if (scrollTop + windowHeight >= documentHeight - 200) {
        const products = await loadMoreProducts(currentQuery.value)
        searchedProducts.value = [...searchedProducts.value, ...products]
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>