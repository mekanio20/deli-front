<template>
    <div class="bg-white">
        <MainContainer class="-mb-10">
            <LinkGroup :items="[
                { label: $t('footer.categories'), to: '/categories' },
                { label: categoryTitle || 'Subcategory', to: '' }
            ]" />
        </MainContainer>

        <div class="bg-white mt-10 pb-10">
            <div class="space-y-5">
                <ProductSection :sectionTitle="categoryTitle || 'Harytlar'" :products="products" :isRedirectLink="true"
                    :linkTitle="'Ählisini görmek'" :link="'/product/list'" />
            </div>
        </div>
    </div>
</template>

<script setup>
const categoriesStore = useCategoriesStore()
const { category_info } = storeToRefs(categoriesStore)
const { fetchCategoryDetails, fetchCategoryProducts } = categoriesStore
const route = useRoute()

const products = ref([])
const categoryTitle = computed(() => category_info.value?.name || '')

const loadData = async (id) => {
    try {
        await fetchCategoryDetails(id)
    } catch (e) {
        // ignore
    }
    try {
        products.value = await fetchCategoryProducts(id)
    } catch (e) {
        products.value = []
    }
}

onMounted(async () => {
    await loadData(route.params.id)
})

watch(() => route.params.id, async (newId) => {
    if (newId) {
        await loadData(newId)
    }
})
</script>
