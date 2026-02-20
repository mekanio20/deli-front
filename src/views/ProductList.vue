<template>
    <div>
        <div v-show="!loadingPage" class="bg-white">
            <MainContainer>
                <LinkGroup :items="[{ label: categoryName, to: `${route.fullPath}` }]" />
                <div class="py-4 flex sm:flex-row flex-col sm:items-end sm:space-x-5 sm:space-y-0 space-y-4">
                    <h1 class="font-semibold sm:text-[30px] text-xl leading-[25px] text-[#0C1A30]">
                        {{ categoryName }}
                    </h1>
                    <p class="sm:text-sm text-xs leading-[14px] text-[#838589]">
                        {{ productsStore.productsCount }} {{ $t('page.product') }}
                    </p>
                </div>
                <FilterSection @applySort="applySort" />
                <div class="flex items-start space-x-6">
                    <div class="w-[300px]">
                        <!-- Category Select -->
                        <CategorySelect v-model="selectedSubcategory" :categories="subcategoryStore.subcategories" />
                        <!-- Price Section -->
                        <div class="bg-white rounded-2xl">
                            <h3 class="font-medium text-[#0C1A30] mb-4">{{ $t('forms.price') }}</h3>
                            <div class="grid grid-cols-2 gap-6 w-[200px]">
                                <div class="flex flex-col space-y-2">
                                    <label for="start" class="text-[13px] text-[#838589]">
                                        {{ $t('forms.start_price') }}
                                    </label>
                                    <input type="number" id="start" v-model="startPrice"
                                        class="border-none text-center outline-none p-3 bg-[#F6F7F9] rounded-md">
                                </div>
                                <div class="flex flex-col space-y-2">
                                    <label for="end" class="text-[13px] text-[#838589]">
                                        {{ $t('forms.end_price') }}
                                    </label>
                                    <input type="number" id="end" v-model="endPrice"
                                        class="border-none text-center outline-none p-3 bg-[#F6F7F9] rounded-md">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex-1 pt-4 pb-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8">
                        <ProductCard v-for="(item, index) in productsStore.products" :key="index" :product="item" />
                    </div>
                </div>

                <!-- Loading More Indicator -->
                <div v-if="productsStore.loadingMore" class="flex justify-center py-8">
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = useRoute();
const productsStore = useProductsStore()
const categoryStore = useCategoriesStore()
const subcategoryStore = useSubcategoriesStore()

const categoryName = ref(null)
const currentQuery = ref(null)
const loadingPage = ref(true)

const selectedSubcategory = ref(null)
const startPrice = ref(null)
const endPrice = ref(null)

const applySort = async (sort) => {
    currentQuery.value = {
        ...currentQuery.value,
        ordering: sort.value
    }
    await productsStore.fetchProducts(currentQuery.value)
}

const getCategoryName = async () => {
    if (route.query.category) {
        await categoryStore.fetchCategoryDetails(route.query.category)
        categoryName.value = categoryStore.category_info.name
        return
    } else if (route.query.subcategory) {
        await subcategoryStore.fetchSubcategoryDetails(route.query.subcategory)
        categoryName.value = subcategoryStore.subcategory_info.name
    } else {
        categoryName.value = t('page.products')
    }
}

watch(
    () => [
        route.query.category,
        route.query.subcategory,
        selectedSubcategory.value,
        startPrice.value,
        endPrice.value
    ],
    async () => {
        let query = []
        if (route.query.category) query.push({ category: route.query.category })
        if (route.query.subcategory || selectedSubcategory.value) query.push({ sub_category: route.query.subcategory || selectedSubcategory.value })
        if (startPrice.value || endPrice.value) query.push({ price_min_tmt: startPrice.value, price_max_tmt: endPrice.value })
        currentQuery.value = { ...query.reduce((a, b) => Object.assign(a, b), {}) }
        await getCategoryName()
        await productsStore.fetchProducts(currentQuery.value)
    }
)
watch(
    () => route.query,
    async (newQuery) => {
        if (newQuery.top_products !== undefined) {
            currentQuery.value = { ordering: 'most_purchased' }
            categoryName.value = t('names.most_purchased')
            await productsStore.fetchProducts(currentQuery.value)
        }
        await subcategoryStore.fetchSubcategories({ parent: route.query.category })
    },
    { immediate: true }
);

onMounted(async () => {
    loadingPage.value = true
    try {
        let query = null
        if (route.query.category) { query = { category: route.query.category } }
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
    if (productsStore.loadingMore || !productsStore.hasNextPage) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Load more when user is 200px from bottom
    if (scrollTop + windowHeight >= documentHeight - 200) {
        await productsStore.loadMoreProducts(currentQuery.value)
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>