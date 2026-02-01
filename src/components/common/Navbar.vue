<template>
    <div>
        <NavbarSkeleton v-show="loading" />
        <div v-show="!loading" class="max-w-[1500px] mx-auto">
            <MainContainer class="flex items-center justify-between">
                <router-link to="/" class="flex-shrink-0">
                    <logo-icon />
                </router-link>
                <div class="flex items-center space-x-5">
                    <div class="lg:block xl:w-[720px] w-[400px] hidden">
                        <SearchBar v-model="searchQuery" :placeholder="$t('names.search_with_names')"
                            @search="handleSearch" />
                    </div>
                    <div class="flex items-end justify-center xl:gap-x-6 sm:gap-x-5">
                        <LanguageButton />
                        <router-link to="/account/coupons" @mouseenter="hovered = 4" @mouseleave="hovered = null"
                            class="sm:hidden flex flex-col items-center space-y-1 p-2 sm:px-3 px-2 rounded-lg group transition-colors duration-300 relative">
                            <component :is="icons['star-icon']"
                                :color="hovered === 4 ? '#DE0045' : '#0C1A30' && 'Coupons' === currentPage ? '#DE0045' : '#0C1A30'" />
                        </router-link>
                        <router-link v-for="item in items" :key="item.id" :to="item.link"
                            @mouseenter="hovered = item.id" @mouseleave="hovered = null"
                            class="sm:block pb-[8px] group hidden transition-colors duration-300">
                            <div class="flex flex-col items-center space-y-1 relative">
                                <div v-if="item.link === '/account/basket' && cartStore.cartItems.length > 0"
                                    class="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#037D84] flex items-center justify-center text-[9px] font-semibold text-white">
                                    {{ cartStore.cartItems.length }}
                                </div>
                                <component :is="icons[item?.icon]"
                                    :color="hovered === item.id ? '#DE0045' : '#0C1A30' && item.activeName === currentPage ? '#DE0045' : '#0C1A30'" />
                                <span class="text-[12px] text-[#0C1A30] group-hover:text-[#DE0045]"
                                    :class="{ 'text-[#DE0045]': item.activeName === currentPage }">{{
                                        item.name }}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </MainContainer>

            <!-- Mobile Bottom Navigation -->
            <div class="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 !z-50">
                <div class="flex items-center justify-evenly py-2">
                    <button type="button" @click="toggleMobileMenu" @mouseenter="hovered = 'categories'"
                        @mouseleave="hovered = null"
                        class="flex flex-col items-center space-y-1 py-2 sm:px-3 px-2 rounded-lg group transition-colors duration-300">
                        <grid-icon :color="hovered === 'categories' ? '#FEB918' : '#0C1A30'" :size="24" />
                        <span class="text-[10px] text-[#0C1A30] group-hover:text-[#FEB918]">{{ $t('footer.categories')
                            }}</span>
                    </button>
                    <router-link v-for="item in items.filter(i => i.activeName !== 'Coupons')" :key="item.id"
                        :to="item.link" @mouseenter="hovered = item.id" @mouseleave="hovered = null"
                        class="flex flex-col items-center space-y-1 py-2 sm:px-3 px-2 rounded-lg group transition-colors duration-300 relative">
                        <div v-if="item.link === '/account/basket' && cartStore.cartItems.length > 0"
                            class="absolute top-2 right-1 w-4 h-4 rounded-full bg-[#037D84] flex items-center justify-center text-[9px] font-semibold text-white">
                            {{ cartStore.cartItems.length }}
                        </div>
                        <component :is="icons[item?.icon]"
                            :color="hovered === item.id ? '#FEB918' : '#0C1A30' && item.activeName === currentPage ? '#FEB918' : '#0C1A30'" />
                        <span class="text-[10px] text-[#0C1A30] group-hover:text-[#FEB918]"
                            :class="{ 'text-[#FEB918]': item.activeName === currentPage }">{{
                                item.name }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['openSidebar'])
const props = defineProps({ isMobileMenuOpen: Boolean, currentPage: String })
const { icons, loadIcons, loading } = useIcons()
onMounted(() => loadIcons())

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const searchQuery = ref('');
const hovered = ref(null)
const cartStore = useCartStore()

const items = ref([
    { id: 1, link: '/account/coupons', name: t('nav.coupons'), activeName: 'Coupons', icon: 'star-icon' },
    { id: 2, link: '/account/orders', name: t('nav.orders'), activeName: 'Orders', icon: 'bag-icon' },
    { id: 3, link: '/account/favorites', name: t('nav.favorites'), activeName: 'AccountFavorite', icon: 'hearth-icon' },
    { id: 4, link: '/account', name: t('nav.account'), activeName: 'Account', icon: 'profile-icon' },
    { id: 5, link: '/account/basket', name: t('nav.basket'), activeName: 'Basket', icon: 'basket-icon' },
]);

const handleSearch = () => {
    router.push({ name: 'SearchResults', query: { q: searchQuery.value } })
};

const toggleMobileMenu = () => {
    emit('openSidebar')
}

watch(
    () => route.fullPath,
    (newPath, oldPath) => {
        if (!String(newPath).startsWith('/product/search')
            || !String(oldPath).startsWith('/product/search')) {
            searchQuery.value = ''
        }
    }
)
</script>