<template>
    <div>
        <ProductDetailSkeleton v-show="loadingPage" />
        <div v-show="!loadingPage" class="bg-white">
            <MainContainer>
                <LinkGroup
                    :items="[{ label: $t('page.products'), to: '/product/list' }, { label: product_info.name, to: '' }]" />

                <!-- Product Content -->
                <div class="">
                    <!-- Product info -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <!-- Left Side - Images -->
                        <div class="flex lg:flex-row flex-col-reverse gap-y-4 sm:mt-0 mt-6"
                            :class="[product_info?.image_urls?.length > 0 ? 'lg:gap-x-4' : '']">

                            <!-- Thumbnail Images with Swiper -->
                            <div v-if="product_info?.image_urls?.length > 0"
                                class="flex items-start lg:flex-col flex-row">
                                <!-- Swiper Container -->
                                <div
                                    class="lg:h-[530px] h-[100px] lg:w-[100px] w-full overflow-y-auto overflow-x-auto no-scrollbar">
                                    <div class="flex lg:flex-col flex-row lg:space-y-2 lg:space-x-0 space-x-2">
                                        <div v-for="(image, index) in allImages" :key="index"
                                            @click="selectedImage = image; currentImageIndex = index"
                                            class="w-[100px] h-[100px] flex-shrink-0 rounded-lg bg-[#F6F7F9] border-[1px] transition-all duration-200 hover:border-[#FEB918] cursor-pointer"
                                            :class="selectedImage === image ? 'border-[#FEB918]' : ''">
                                            <img :src="image" class="w-full h-full object-cover rounded-lg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else
                                class="flex items-start lg:flex-col flex-row lg:space-y-2 lg:space-x-0 space-x-2 mr-2">
                                <div
                                    class="w-[100px] h-[100px] rounded-lg bg-[#F6F7F9] border-[1px] transition-all duration-200 border-[#FEB918]">
                                    <img :src="selectedImage || product_info?.preview?.path || '/icons/default.webp'"
                                        class="w-full h-full object-cover rounded-lg">
                                </div>
                            </div>

                            <!-- Main Image -->
                            <div @click="showLightbox(currentImageIndex)"
                                class="sm:h-[530px] h-[280px] w-full mx-auto bg-[#F6F7F9] rounded-lg overflow-hidden relative group cursor-pointer">
                                <img :src="selectedImage || product_info?.preview?.path || '/icons/default.webp'"
                                    class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105">
                            </div>

                        </div>

                        <!-- Right Side - Product Info -->
                        <div class="space-y-6 lg:ml-10">
                            <!-- Action Buttons (Mobile) -->
                            <div class="flex items-center space-x-3">
                                <StatusTag v-if="product_info?.tags?.includes('new')" icon="star-icon"
                                    :title="$t('names.new')" :icon_size="18" bg_color="#FEB91814"
                                    text_color="#FEB918" />
                                <StatusTag v-if="product_info?.tags?.includes('most_sold')" icon="cup_outline-icon"
                                    :title="$t('names.most_purchased')" :icon_size="18" bg_color="#1DB95414"
                                    text_color="#1DB954" />
                                <StatusTag v-if="product_info?.tags?.includes('most_liked')" icon="favorite-icon"
                                    icon_color="#FA004C" :icon_size="18" :title="$t('names.most_liked')"
                                    bg_color="#FA004C14" text_color="#FA004C" />
                            </div>

                            <!-- Product Title -->
                            <div class="space-y-2">
                                <h1 class="text-[24px] font-semibold text-[#0C1A30] leading-tight">
                                    {{ product_info.name }}
                                </h1>
                            </div>

                            <!-- Product Info -->
                            <div class="space-y-4">
                                <div class="flex items-center justify-between py-3 border-b border-[#EDEDED]">
                                    <span class="text-[#ABABAB] sm:text-base text-sm uppercase tracking-wide">{{
                                        $t('forms.barcode') }}</span>
                                    <span class="text-[#0C1A30] sm:text-base text-sm font-medium">{{
                                        product_info.barcode }}</span>
                                </div>
                                <div class="flex items-center justify-between py-3 border-b border-[#EDEDED]">
                                    <span class="text-[#ABABAB] sm:text-base text-sm uppercase tracking-wide">{{
                                        $t('page.category') }}</span>
                                    <span class="text-[#0C1A30] sm:text-base text-sm font-medium">{{
                                        product_info.category_name }}</span>
                                </div>
                                <div v-if="product_info?.brand_name" class="flex items-center justify-between py-3">
                                    <span class="text-[#ABABAB] sm:text-base text-sm uppercase tracking-wide">{{
                                        $t('page.brand') }}</span>
                                    <span class="text-[#0C1A30] sm:text-base text-sm font-medium">{{
                                        product_info.brand_name }}</span>
                                </div>
                            </div>

                            <!-- Price -->
                            <div class="sm:py-6 py-3">
                                <div class="sm:text-[32px] text-xl font-bold text-[#0C1A30]">
                                    {{ product_info.price }} TMT
                                </div>
                            </div>

                            <!-- Add to Cart Button / Quantity Controls -->
                            <div class="flex flex-row items-center space-x-3">
                                <!-- Add to Cart Button -->
                                <button v-if="!cartIsInCart" @click="addToCart" :disabled="cartLoading" class="flex-1 w-full bg-[#FEB918] hover:bg-[#ffcf5f] text-white
          h-[48px] px-6 sm:px-8
          rounded-[10px] transition-all duration-200 font-semibold
          text-[16px] sm:text-[18px] cursor-pointer text-nowrap"
                                    :class="{ 'disabled:opacity-60 disabled:cursor-not-allowed': cartLoading }">
                                    {{ cartLoading ? $t('buttons.adding') : $t('buttons.add_to_cart') }} </button>

                                <button v-if="!cartIsInCart" @click="addToCartRedirectOrder" :disabled="cartLoading" class="flex-1 w-full bg-[#037D84] hover:bg-[#0e9ea5] text-white
          h-[48px] px-6 sm:px-8
          rounded-[10px] transition-all duration-200 font-medium
          text-[14px] sm:text-[18px] cursor-pointer text-nowrap"
                                    :class="{ 'disabled:opacity-60 disabled:cursor-not-allowed': cartLoading }">
                                    {{ $t('buttons.add_order') }}
                                </button>

                                <!-- If already in cart -->
                                <div v-else class="w-full flex items-center sm:space-x-4">
                                    <!-- Come to Cart -->
                                    <button @click="comeToCart" :disabled="cartLoading" class="flex-1 sm:block hidden bg-[#037D84] hover:bg-[#0e9ea5] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-[10px] transition-all duration-200 font-medium
            text-[14px] sm:text-[18px]
            disabled:opacity-60 disabled:cursor-not-allowed text-nowrap">
                                        {{ $t('buttons.go_to_basket') }}
                                    </button>

                                    <!-- Quantity Controls -->
                                    <div class="flex flex-row items-center sm:space-x-4 space-x-3">
                                        <!-- Decrease -->
                                        <button @click="decreaseQuantity" :disabled="cartLoading" class="p-3 rounded-[10px] bg-[#FEB918] hover:bg-[#ffcf5f]
              flex items-center justify-center
              disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                            <minus-icon :size="24" />
                                        </button>

                                        <!-- Quantity Display -->
                                        <div class="text-center text-[#0C1A30] font-semibold text-lg sm:text-xl">
                                            <span>{{ cartItem?.quantity || 0 }}</span>
                                        </div>

                                        <!-- Increase -->
                                        <button @click="increaseQuantity" :disabled="cartLoading" class="p-3 rounded-[10px] bg-[#FEB918] hover:bg-[#ffcf5f]
              flex items-center justify-center
              disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
                                            <plus-icon :size="24" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Favorite Button -->
                                <button @click="toggleFavorite(product_info.id)"
                                    class="w-fit p-3 bg-[#FEB91829] rounded-[10px] transition-all duration-200 flex justify-center">
                                    <favorite-icon color="#FEB918" :fill="isLiked ? '#FEB918' : 'none'" />
                                </button>
                            </div>

                        </div>
                    </div>

                    <!-- Product Description -->
                    <div v-if="product_info?.description" class="mt-12 lg:mt-16">
                        <h2 class="text-[20px] font-semibold text-[#0C1A30] mb-6">{{ $t('page.aboutProduct') }}</h2>
                        <p class="text-[#0C1A30] tracking-[0.2px]">
                            {{ product_info.description }}
                        </p>
                    </div>
                </div>
            </MainContainer>
            <!-- Related Products -->
            <ProductSection v-if="product_info?.related_products?.length > 0"
                :sectionTitle="$t('names.products_for_you')" :products="product_info.related_products" />

            <!-- Lightbox Component -->
            <vue-easy-lightbox :visible="lightboxVisible" :imgs="lightboxImages" :index="lightboxIndex"
                @hide="lightboxVisible = false" />
        </div>
    </div>
</template>

<script setup>
import VueEasyLightbox from 'vue-easy-lightbox'
import { useSEO } from '@/composables/useSEO'
import { useSEOHelper } from '@/composables/useSEOHelper'

const isMobile = ref(false)
const route = useRoute()
const authStore = useAuthStore()
const likesStore = useLikesStore()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const { fetchProductDetail } = productsStore
const { product_info } = storeToRefs(productsStore)
const { createLike, deleteLike, fetchLikes } = likesStore
const { addItem, loading: cartLoading, isInCart: checkIsInCart, getCartItem, increaseQuantity: cartIncreaseQuantity, decreaseQuantity: cartDecreaseQuantity } = cartStore

// SEO Setup
const { setSEO } = useSEO()
const { generateProductSEO, generateProductSchema } = useSEOHelper()
const selectedImage = ref(null)
const isLiked = ref(false)
const router = useRouter()

// Lightbox functionality
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)
const lightboxImages = ref([])
const currentImageIndex = ref(0)
const loadingPage = ref(true)

// Computed properties
const cartIsInCart = computed(() => product_info.value?.id ? checkIsInCart(product_info.value.id) : false)
const cartItem = computed(() => product_info.value?.id ? getCartItem(product_info.value.id) : null)

const allImages = computed(() => {
    const images = []
    if (product_info.value?.preview?.path) {
        images.push(product_info.value.preview.path)
    }
    if (product_info.value?.image_urls?.length > 0) {
        images.push(...product_info.value.image_urls)
    }
    return images
})

const toggleFavorite = async (id) => {
    try {
        if (!authStore.isAuthenticated) {
            await authStore.openRegister()
            return
        }
        isLiked.value = !isLiked.value
        if (!product_info.value.is_liked) {
            createLike(id)
            return
        } else {
            const likes = await fetchLikes({ product: id })
            await deleteLike(likes[0].id)
        }
    } catch (error) {
        console.log(error);
        isLiked.value = !isLiked.value
    }
}

const addToCart = async () => {
    try {
        await addItem(product_info.value.id, 1)
    } catch (error) {
        console.error('Failed to add to cart:', error)
    }
}

const addToCartRedirectOrder = async () => {
    try {
        await addItem(product_info.value.id, 1)
        router.push({ name: 'ConfirmOrder' })
    } catch (error) {
        console.error('Failed to add to cart:', error)
    }
}

const increaseQuantity = async () => {
    try {
        await cartIncreaseQuantity(cartItem.value.id)
    } catch (error) {
        console.error('Error increasing quantity:', error)
    }
}

const decreaseQuantity = async () => {
    try {
        await cartDecreaseQuantity(cartItem.value.id)
    } catch (error) {
        console.error('Error decreasing quantity:', error)
    }
}

const comeToCart = () => {
    router.push({ name: 'Basket' })
}
const comeToOrder = () => {
    router.push({ name: 'ConfirmOrder' })
}

// Lightbox functions - only opens when clicking main image
const showLightbox = (index) => {
    lightboxIndex.value = index
    lightboxVisible.value = true
}

const initializeLightboxImages = () => {
    if (product_info.value?.preview?.path || product_info.value?.image_urls?.length > 0) {
        const images = []
        if (product_info.value?.preview?.path) {
            images.push(product_info.value.preview.path)
        }
        if (product_info.value?.image_urls?.length > 0) {
            images.push(...product_info.value.image_urls)
        }
        lightboxImages.value = images
    } else {
        lightboxImages.value = ['/icons/default.webp']
    }
}

onMounted(async () => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 640
}

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})

watch(() => route.params.id, async () => {
    loadingPage.value = true
    const product = await fetchProductDetail(route.params.id)
    isLiked.value = product.is_liked

    // Reset current image index
    currentImageIndex.value = 0

    // Set first image as selected
    if (product?.preview?.path) {
        selectedImage.value = product.preview.path
    } else if (product?.image_urls?.length > 0) {
        selectedImage.value = product.image_urls[0]
    }

    initializeLightboxImages()

    // Update SEO when product changes
    if (product) {
        const seoData = generateProductSEO(product)
        setSEO(seoData)

        // Add structured data for product
        const productSchema = generateProductSchema(product)
        if (productSchema && Object.keys(productSchema).length > 0) {
            // Remove existing product schema if any
            const existingSchema = document.querySelector('script[type="application/ld+json"][data-product-schema]')
            if (existingSchema) {
                existingSchema.remove()
            }

            // Add new product schema
            const schemaScript = document.createElement('script')
            schemaScript.type = 'application/ld+json'
            schemaScript.setAttribute('data-product-schema', 'true')
            schemaScript.textContent = JSON.stringify(productSchema)
            document.head.appendChild(schemaScript)
        }
    }
    loadingPage.value = false
}, { immediate: true })
</script>