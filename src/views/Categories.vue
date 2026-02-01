<template>
    <div>
        <CategoriesSkeleton v-show="loading" />
        <div v-show="!loading" class="bg-white">
            <MainContainer class="-mb-10">
                <LinkGroup :items="[{ label: $t('footer.categories'), to: '/categories' }]" />
            </MainContainer>
            <div class="bg-white mt-5 pb-10">
                <MainContainer>
                    <SectionHeaderGroup class="sm:pb-10 pb-6">
                        <SectionTitle :title="$t('footer.categories')" class="pt-6" />
                    </SectionHeaderGroup>
                    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                        <CategoryCard v-for="(item, index) in categories" :key="index" :category="item" />
                    </div>
                </MainContainer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO'
const categoriesStore = useCategoriesStore()
const { categories, loading } = storeToRefs(categoriesStore)
const { fetchCategories } = categoriesStore

// SEO Setup
const { setSEO } = useSEO()

// Set SEO for categories page
setSEO({
  title: 'Bölümler - TamRahat | Öý Üçin Ähli Kategoriyalar',
  description: 'Türkmenistanda öý üçin ähli kategoriyalar: gap-gaç, arassaçylyk serişdeleri, elektrik enjamlary, öý bezegleri we köp başga harytlar. Amatly bahadan satyn alyň!',
  keywords: 'öý kategoriyalar, gap-gaç kategoriyalar, arassaçylyk kategoriyalar, elektrik enjamlary kategoriyalar, öý bezeg kategoriyalar, aşhana kategoriyalar, ýorgan kategoriyalar, haly kategoriyalar, perde kategoriyalar, lampa kategoriyalar, hammam kategoriyalar, Türkmenistanda kategoriyalar, Aşgabatda kategoriyalar',
  ogTitle: 'Bölümler - TamRahat | Öý Üçin Ähli Kategoriyalar',
  ogDescription: 'Türkmenistanda öý üçin ähli kategoriyalar: gap-gaç, arassaçylyk serişdeleri, elektrik enjamlary, öý bezegleri we köp başga harytlar. Amatly bahadan satyn alyň!',
  ogImage: 'https://tamrahat.com.tm/icons/logo.png',
  canonical: 'https://tamrahat.com.tm/categories'
})

onMounted(async () => {
    if (!categories.value?.length) {
        await fetchCategories()
    }
})
</script>