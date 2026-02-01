<template>
    <div>
        <CategoriesSkeleton v-show="loadingPage" />
        <div v-show="!loadingPage" class="bg-white">
            <MainContainer>
                <LinkGroup :items="[{ label: categoryName, to: `${route.fullPath}` }]" />
                <div class="py-4 flex sm:flex-row flex-col sm:items-end sm:space-x-5 sm:space-y-0 space-y-4">
                    <h1 class="font-semibold sm:text-[30px] text-xl leading-[25px] text-[#0C1A30]">
                        {{ categoryName }}
                    </h1>
                    <p class="sm:text-sm text-xs leading-[14px] text-[#838589]">
                        {{ productsCount }} {{ $t('page.product') }}
                    </p>
                </div>
                <FilterSection @openFilter="openFilter" @applySort="applySort" />
                <div class="pt-4 pb-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
                    <ProductCard v-for="(item, index) in products" :key="index" :product="item" />
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
const showSidebar = ref(false)
const route = useRoute();

const productsStore = useProductsStore()
const categoryStore = useCategoriesStore()
const subcategoryStore = useSubcategoriesStore()
const { products, productsCount, loadingMore, hasNextPage } = storeToRefs(productsStore)
const { category_info } = storeToRefs(categoryStore)
const { subcategory_info } = storeToRefs(subcategoryStore)
const { fetchCategoryDetails } = categoryStore
const { fetchSubcategoryDetails } = subcategoryStore
const { loadMoreProducts } = productsStore
const categoryName = ref(null)
const currentQuery = ref(null)
const loadingPage = ref(true)

const openFilter = () => {
    showSidebar.value = true
}
const applyFilters = async (filters) => {
    currentQuery.value = {
        ...currentQuery.value,
        ...filters
    }
    await productsStore.fetchProducts(currentQuery.value)
    showSidebar.value = false
}

const applySort = async (sort) => {
    currentQuery.value = {
        ...currentQuery.value,
        ordering: sort.value
    }
    await productsStore.fetchProducts(currentQuery.value)
}

const getCategoryName = async () => {
    if (route.query.category) {
        await fetchCategoryDetails(route.query.category)
        categoryName.value = category_info.value.name
        return
    } else if (route.query.subcategory) {
        await fetchSubcategoryDetails(route.query.subcategory)
        categoryName.value = subcategory_info.value.name
    }
}

watch(
    () => [route.query.category, route.query.subcategory],
    async () => {
        let query = null
        if (route.query.category) query = { category: route.query.category }
        if (route.query.subcategory) query = { sub_category: route.query.subcategory }
        currentQuery.value = query
        await getCategoryName()
        await productsStore.fetchProducts(query)
    }
)
watch(
    () => route.query,
    async (newQuery) => {
        if (newQuery.top_products !== undefined) {
            currentQuery.value = { ordering: 'most_purchased' }
            await productsStore.fetchProducts(currentQuery.value)
        }
    },
    { immediate: true }
);

onMounted(async () => {
    loadingPage.value = true
    try {
        let query = null
        if (route.query.category) query = { category: route.query.category }
        if (route.query.subcategory) query = { sub_category: route.query.subcategory }
        if (route.query.product_ids) query = { product_ids: route.query.product_ids }
        currentQuery.value = query
        if (route.query.top_products === undefined) await productsStore.fetchProducts(query)
        getCategoryName()
    } finally {
        loadingPage.value = false
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
        await loadMoreProducts(currentQuery.value)
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>