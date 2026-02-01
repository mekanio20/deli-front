<template>
  <div>
    <Banner />
    <MainContainer>
      <!-- Categories -->
      <SectionHeaderGroup class="sm:pb-10 pb-6">
        <SectionTitle :title="$t('footer.categories')" class="pt-6" />
        <ViewAllLink :title="$t('names.view_all')" />
      </SectionHeaderGroup>
      <div class="grid grid-cols-1 gap-6">
        <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
          <CategoryCard v-for="item in categories" :key="item.id" :category="item" />
        </div>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <CategoryCard v-for="item in categories.slice(0, 3)" :key="item.id" :category="item" :isFlex="true" />
        </div>
      </div>
    </MainContainer>
    <!-- Newest Products -->
    <ProductSection :sectionTitle="$t('names.newest')" :products="newestProducts" />
    <!-- Popular Products -->
    <TopProductSection :products="mostPopularProducts" />
    <div v-show="categoriesWithProducts.length > 0" v-for="category in categoriesWithProducts" :key="category.id">
      <ProductSection :sectionTitle="category.name" :products="categoryProducts[category?.id] || []"
        :link="`/product/list?category=${category.id}`" />
    </div>

  </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO'
const { setSEO } = useSEO()
setSEO({
  title: '',
  description: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  canonical: ''
})

const categoryStore = useCategoriesStore()
const productStore = useProductsStore()

const categories = ref([])
const newestProducts = ref([])
const mostPopularProducts = ref([])
const categoryProducts = ref({})

// COMPUTED
const categoriesWithProducts = computed(() =>
  categoryStore.categories.filter(
    c => (categoryProducts.value[c.id]?.length ?? 0) > 0
  )
)

onMounted(async () => {
  await categoryStore.fetchCategories()

  const [newest, popular, categories] = await Promise.all([
    productStore.fetchProducts({ ordering: 'newest' }),
    productStore.fetchProducts({ ordering: 'most_purchased' })
  ])

  newestProducts.value = newest
  mostPopularProducts.value = popular

  const requests = categoryStore.categories.map(category =>
    categoryStore.fetchCategoryProducts(category.id)
      .then(products => ({ id: category.id, products }))
      .catch(() => ({ id: category.id, products: [] }))
  )

  const results = await Promise.all(requests)

  results.forEach(({ id, products }) => {
    if (products.length) {
      categoryProducts.value[id] = products
    }
  })
})
</script>