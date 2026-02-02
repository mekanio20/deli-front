<template>
    <div class="min-h-screen">
        <!-- Header -->
        <MainContainer class="bg-[#F6F7F9] pb-10">
            <LinkGroup :items="[{ label: $t('nav.basket'), to: '/account/basket' }]" />
            <!-- Title -->
            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6">
                <div class="lg:w-[950px] w-full flex items-center justify-between py-8 rounded-xl overflow-hidden">
                    <div class="flex items-end space-x-5">
                        <h3 class="font-semibold lg:text-[30px] leading-[100%] sm:text-[30px] text-lg text-[#0C1A30]">
                            {{ $t('nav.basket') }}
                        </h3>
                        <span class="text-[#838589] text-sm">{{ cartStore.cartItems.length }} {{ $t('page.product') }}</span>
                    </div>
                    <button @click="clearCart"
                        class="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-60 transition-opacity duration-300">
                        <delete-icon :size="18" color="white" />
                        <span class="sm:text-base text-sm">{{ $t('buttons.clear') }}</span>
                    </button>
                </div>
                <div class="w-[370px] lg:block hidden py-6 p-8 rounded-xl sticky top-32">
                </div>
            </div>
            <!-- Content -->
            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6">
                <!-- Cart Items -->
                <div class="lg:w-[950px] w-full space-y-4 px-4 md:py-8 py-4 bg-white rounded-xl overflow-hidden">
                    <TransitionGroup enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 transform translate-x-8"
                        enter-to-class="opacity-100 transform translate-x-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 transform translate-x-0"
                        leave-to-class="opacity-0 transform translate-x-8"
                        move-class="transition-transform duration-300 ease-out">
                        <div v-for="(item, index) in cartItems" :key="index"
                            class="bg-white rounded-xl pb-4 border-b border-[#EDEDED]"
                            :class="{ 'border-b-0 pb-0': index === cartItems.length - 1 }">
                            <!-- Product Info -->
                            <div
                                class="flex md:items-center md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 min-w-0 pr-6">
                                <div class="flex items-center space-x-4">
                                    <!-- Product Image -->
                                    <div class="w-[100px] h-[100px] flex-shrink-0">
                                        <img class="w-full h-full object-cover rounded-[10px]"
                                            :src="item?.product_image || '/icons/default.webp'">
                                    </div>
                                    <!-- Product Title -->
                                    <div class="md:w-[238px] flex flex-col space-y-2 justify-between flex-shrink-0">
                                        <h3 class="text-base font-medium text-[#0C1A30] mb-1">
                                            {{ item.product_name }}
                                        </h3>
                                        <div class="flex items-center space-x-2">
                                            <button @click="toggleLike(item.product)"
                                                class="w-[33px] h-[33px] bg-[#F6F7F9] rounded-full flex items-center justify-center cursor-pointer">
                                                <favorite-icon :size="16" :color="item.is_liked ? '#FA004C' : '#A9A9A9'"
                                                    :fill="item.is_liked ? '#FA004C' : 'transparent'" />
                                            </button>
                                            <button @click="removeItem(item.id)"
                                                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F6F7F9] hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                                <delete-icon :size="16" color="#A9A9A9" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full flex items-center justify-between">
                                    <!-- Price -->
                                    <div class="font-semibold md:block hidden text-[#0C1A30]">
                                        {{ item.unit_price }} TMT
                                    </div>

                                    <!-- Quantity Controls -->
                                    <div class="flex items-center space-x-1">
                                        <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1"
                                            class="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 transition-colors">
                                            <minus-icon :size="16" color="#0C1A30" />
                                        </button>

                                        <div class="w-8 text-center font-medium text-[#0C1A30]">
                                            <div v-if="loading && currentLoadingId === item.id"
                                                class="animate-spin rounded-full h-3 w-3 border border-gray-300 border-t-[#0C1A30] mx-auto">
                                            </div>
                                            <span v-else>{{ item.quantity }}</span>
                                        </div>


                                        <button @click="increaseQuantity(item.id)"
                                            class="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 transition-colors">
                                            <plus-icon :size="16" color="#0C1A30" />
                                        </button>
                                    </div>

                                    <!-- Total Price -->
                                    <div class="font-semibold text-[#0C1A30] ml-4">
                                        {{ item.total_price }} TMT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransitionGroup>

                    <!-- Empty Cart State -->
                    <div v-if="cartItems.length === 0" class="text-center py-12">
                        <basket-icon />
                        <h3 class="mt-4 text-lg font-medium text-[#0C1A30]">{{ $t('names.basket_null') }}</h3>
                        <p class="mt-2 text-sm text-white0">{{ $t('descriptions.basket1') }}</p>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="lg:w-[370px] w-full py-6 p-8 bg-white rounded-xl sticky top-32">
                    <!-- Promo Code Section -->
                    <div class="mb-4">
                        <!-- Gift Card -->
                        <div v-if="!cartStore.giftCard"
                            class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg mb-4 cursor-pointer hover:bg-[#E8F4F8] transition-colors"
                            @click="handleShowGiftCardModal">
                            <div class="w-7 h-7 bg-[#037D841F] rounded-full flex items-center justify-center">
                                <discount_circle-icon />
                            </div>
                            <span class="text-sm text-[#0C1A30]">{{ $t('names.add_gift_card') }}</span>
                        </div>
                        <div v-else class="flex items-center justify-between p-3 bg-[#E8F4F8] rounded-lg mb-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-7 h-7 bg-[#037D841F] rounded-full flex items-center justify-center">
                                    <discount_circle-icon />
                                </div>
                                <span class="text-sm text-[#0C1A30]">Gift Card: {{ cartStore.giftCard.number }}</span>
                            </div>
                            <button @click="handleRemoveGiftCard" class="text-red-500 hover:text-red-700">
                                <close-icon :size="16" />
                            </button>
                        </div>

                        <!-- Loyalty Card -->
                        <div v-if="!loyaltyCard"
                            class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg mb-4 cursor-pointer hover:bg-[#FEF3E2] transition-colors"
                            @click="handleShowLoyaltyCardModal">
                            <div class="w-7 h-7 bg-[#FEB91826] rounded-full flex items-center justify-center">
                                <star-icon />
                            </div>
                            <span class="text-sm text-[#0C1A30]">{{ $t('names.use_loyalty_card') }}</span>
                        </div>
                        <div v-else class="flex items-center justify-between p-3 bg-[#FEF3E2] rounded-lg mb-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-7 h-7 bg-[#FEB91826] rounded-full flex items-center justify-center">
                                    <star-icon />
                                </div>
                                <span class="text-sm text-[#0C1A30]">{{ $t('names.loyalty') }}: {{ loyaltyCard.number
                                    }}</span>
                            </div>
                            <button @click="handleRemoveLoyaltyCard" class="text-red-500 hover:text-red-700">
                                <close-icon :size="16" />
                            </button>
                        </div>
                    </div>

                    <!-- Price Breakdown -->
                    <div class="space-y-3 mb-6">
                        <div class="py-6 space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">{{ $t('names.amount') }}:</span>
                                <span class="font-medium text-[#0C1A30]">{{ subtotal }} TMT</span>
                            </div>

                            <div v-if="giftCard" class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">{{ $t('names.gift_coupon') }}:</span>
                                <span class="font-medium text-[#037D84]">-{{ giftCard || 0  }} TMT</span>
                            </div>

                            <div v-if="loyaltyCard" class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">{{ $t('names.loyalty_coupon') }}:</span>
                                <span v-if="cartStore.cartInfo.cashback_used && loyaltyAction === 'use_balance'" class="font-medium text-[#FEB918]">-{{
                cartStore.cartInfo.cashback_used || 0 }} TMT</span>
                                <span v-if="cartStore.cartInfo.cashback_earned && loyaltyAction === 'apply_cashback'" class="font-medium text-[#037D84]">+{{
                cartStore.cartInfo.cashback_earned || 0 }} ball</span>
                                
                            </div>
                        </div>

                        <div class="border-t border-[#EDEDED] pt-3">
                            <div class="flex justify-between items-center pt-4">
                                <span class="font-medium text-[#0C1A30]">{{ $t('names.result_amount') }}:</span>
                                <span class="font-bold text-[#037D84]">{{ total }} TMT</span>
                            </div>
                        </div>

                        <div class="py-5 space-y-3">
                            <p class="text-[#0C1A30]" v-html="$t('descriptions.basket2', { order_total: settings.minimum_order_total })"></p>
                            <p class="text-[#0C1A30]" v-html="$t('descriptions.basket3', { delivery_free_after: settings.delivery_free_after })"></p>
                        </div>
                    </div>

                    <!-- Checkout Button -->
                    <button @click="checkout" :disabled="cartStore.cartItems.length === 0"
                        class="w-full bg-[#FEB918] text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                        {{ $t('buttons.add_order') }}
                    </button>
                </div>
            </div>
        </MainContainer>
        <!--  -->
        <ProductSection :sectionTitle="$t('names.products_for_you')" :products="products" />

        <!-- Gift Card Modal -->
        <div v-if="showGiftCardModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click="showGiftCardModal = false">
            <div class="bg-white rounded-lg p-6 w-96 max-w-md mx-4" @click.stop>
                <h3 class="text-lg font-semibold mb-4">{{ $t('names.add_gift_card') }}</h3>
                <input v-model="giftCardNumber" type="text"
                    class="w-full p-3 border border-gray-300 rounded-lg mb-4" />
                <div class="flex space-x-3">
                    <button @click="handleApplyGiftCard" :disabled="loading"
                        class="flex-1 bg-[#037D84] text-white py-2 px-4 rounded-lg hover:bg-[#036A70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ loading ? $t('buttons.used') : $t('buttons.use') }}
                    </button>
                    <button @click="showGiftCardModal = false"
                        class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors">
                        {{ $t('buttons.cancel') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Loyalty Card Modal -->
        <div v-if="showLoyaltyCardModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click="showLoyaltyCardModal = false">
            <div class="bg-white rounded-lg p-6 w-96 max-w-md mx-4" @click.stop>
                <h3 class="text-lg font-medium mb-4">{{ $t('names.loyalty') }}</h3>
                <div v-if="!loyaltyCardOptions" class="text-center pb-4">
                    <p class="text-white0">{{ $t('loyalty_null') }}</p>
                </div>
                <div v-else class="mb-4">
                    <FormInput v-model="loyaltyCardOptions.card_number" :label="'loyalty_card_id'" disabled />
                </div>
                <div class="flex flex-col space-y-3 py-2">
                    <button @click="handleApplyLoyaltyCard(loyaltyCardOptions.id, 'apply_cashback')"
                        :disabled="loading || !loyaltyCardOptions"
                        class="flex-1 bg-[#037D84] text-white py-2 px-4 rounded-lg hover:bg-[#036A70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ loading ? $t('buttons.loading') : $t('buttons.apply_cashback') }}
                    </button>
                    <button @click="handleApplyLoyaltyCard(loyaltyCardOptions.id, 'use_balance')"
                        :disabled="loading || !loyaltyCardOptions"
                        class="flex-1 bg-[#FEB918] text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
                        {{ loading ? $t('buttons.loading') : $t('buttons.use_balance') }}
                    </button>
                </div>

                <div class="flex flex-col space-y-3 pt-4">
                    <h3 class="font-medium">{{ $t('names.info') }}</h3>
                    <div class="flex items-center justify-between">
                        <div class="space-y-1">
                            <p class="text-sm text-gray-500">{{ $t('names.loyalty') }}:</p>
                            <p class="text-sm text-gray-500">{{ $t('names.card_number') }}:</p>
                            <p class="text-sm text-gray-500">{{ $t('names.expire_date') }}:</p>
                            <p class="text-sm text-gray-500">{{ $t('names.balance') }}</p>
                        </div>
                        <div class="space-y-1">
                            <p class="text-sm text-gray-500">{{ loyaltyCardOptions?.card_name }}</p>
                            <p class="text-sm text-gray-500">{{ loyaltyCardOptions?.card_number }}</p>
                            <p class="text-sm text-gray-500">{{ formatToYYYYMMDD(loyaltyCardOptions?.expiry_date) }}</p>
                            <p class="text-sm text-gray-500">{{ loyaltyCardOptions?.cashback_balance }} TMT</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const loyaltyAction = ref(sessionStorage.getItem('loyaltyAction') || 'apply_cashback')
import { formatToYYYYMMDD } from "@/composables/useFormatDate.js"
const authStore = useAuthStore()
const appStore = useAppStore()
const cartStore = useCartStore()
const productStore = useProductsStore()
const likesStore = useLikesStore()
const clientStore = useClientStore()
const regionsStore = useRegionsStore()
const { settings } = storeToRefs(regionsStore)
const { fetchSettings } = regionsStore
const { products } = storeToRefs(productStore)
const { fetchAccount } = clientStore
const { account } = storeToRefs(clientStore)
const { fetchProducts } = productStore
const { cartItems, total, subtotal, giftCard, loyaltyCard, loading } = storeToRefs(cartStore)
const { applyGiftCard, applyLoyaltyCard, removeGiftCard, removeLoyaltyCard } = cartStore
const { fetchLikes, createLike, deleteLike } = likesStore
const { likes } = storeToRefs(likesStore)
const router = useRouter()

// Modal states
const currentLoadingId = ref(null)
const showGiftCardModal = ref(false)
const showLoyaltyCardModal = ref(false)
const giftCardNumber = ref('')

// Computed properties
const loyaltyCardOptions = computed(() => {
    if (!account.value?.loyalty_card) return {}
    return account.value.loyalty_card
})

// Fetch cart data on component mount
onMounted(async () => {
    try {
        await cartStore.fetchCart()
        await fetchSettings()
        await fetchProducts({ ordering: 'newest' })
        if (authStore.isAuthenticated) {
            if (!cartStore.cartInfo.loyalty_card_info && clientStore.account.loyalty_card) applyLoyaltyCard(clientStore.account.loyalty_card.id, "apply_cashback")
            await fetchAccount()
            await fetchLikes()
        }
    } catch (error) {
        console.error('Error loading cart:', error)
    }
})

// Methods
const handleShowLoyaltyCardModal = () => {
    if (!authStore.isAuthenticated) appStore.toggleModal('register')
    else showLoyaltyCardModal.value = true
}

const handleShowGiftCardModal = () => {
    if (!authStore.isAuthenticated) appStore.toggleModal('register')
    else showGiftCardModal.value = true
}

const increaseQuantity = async (id) => {
    try {
        currentLoadingId.value = id
        await cartStore.increaseQuantity(id)
    } catch (error) {
        console.error('Error increasing quantity:', error)
    }
}

const decreaseQuantity = async (id) => {
    try {
        currentLoadingId.value = id
        await cartStore.decreaseQuantity(id)
    } catch (error) {
        console.error('Error decreasing quantity:', error)
    }
}

const removeItem = async (id) => {
    try {
        await cartStore.removeItem(id)
    } catch (error) {
        console.error('Error removing item:', error)
    }
}

const clearCart = async () => {
    try {
        await cartStore.clearCart()
    } catch (error) {
        console.error('Error clearing cart:', error)
    }
}

const checkout = async () => {
    if (cartItems.length === 0) return
    router.push({ name: 'ConfirmOrder' })
}

// Gift Card and Loyalty Card methods
const handleApplyGiftCard = async () => {
    if (!giftCardNumber.value.trim()) return

    try {
        await applyGiftCard(giftCardNumber.value)
        showGiftCardModal.value = false
        giftCardNumber.value = ''
    } catch (error) {
        console.error('Error applying gift card:', error)
    }
}

const handleApplyLoyaltyCard = async (id, action) => {
    try {
        await applyLoyaltyCard(id, action)
        showLoyaltyCardModal.value = false
        loyaltyAction.value = action
        sessionStorage.setItem('loyaltyAction', action)
        await cartStore.fetchCart()
    } catch (error) {
        console.error('Error applying loyalty card:', error)
    }
}

const handleRemoveGiftCard = async () => {
    try {
        await removeGiftCard()
    } catch (error) {
        console.error('Error removing gift card:', error)
    }
}

const handleRemoveLoyaltyCard = async () => {
    try {
        await removeLoyaltyCard()
        loyaltyCard.value = null
    } catch (error) {
        console.error('Error removing loyalty card:', error)
    }
}

const toggleLike = async (productId) => {
    try {
        if (!authStore.isAuthenticated) {
            await appStore.toggleModal('register')
            return
        }
        const likeItem = likes.value.find(item => item.product === productId)
        if (!likeItem) {
            await createLike(productId)
        } else {
            await deleteLike(likeItem.id)
        }
        await cartStore.fetchCart()
    } catch (error) {
        console.error('Error toggling like:', error)
    }
}

</script>