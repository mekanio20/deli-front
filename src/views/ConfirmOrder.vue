<template>
    <div>
        <ConfirmOrderSkeleton v-show="loadingPage" />
        <div v-show="!loadingPage" class="min-h-screen bg-[#F6F7F9]">
            <!-- Header -->
            <MainContainer>
                <LinkGroup :items="[{ label: $t('nav.basket'), to: '/account/basket' }]" />
                <!-- Title -->
                <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6">
                    <div class="lg:w-[950px] w-full flex items-center justify-between py-8 rounded-xl overflow-hidden">
                        <div class="flex items-center justify-between">
                            <div class="flex sm:flex-row flex-col sm:items-end sm:space-x-5 sm:space-y-0 space-y-2">
                                <h1
                                    class="lg:text-[30px] leading-[100%] sm:text-[30px] text-lg font-semibold text-[#0C1A30]">
                                    {{ $t('names.confirm_order') }}
                                </h1>
                                <span class="text-[#838589] text-sm">{{ cartItems.length }} {{ $t('page.product')
                                    }}</span>
                            </div>
                        </div>
                        <button @click="goBack"
                            class="flex items-center space-x-2 border border-[#838589] text-[#838589] px-4 py-2 rounded-md font-medium hover:opacity-60 transition-opacity duration-300">
                            <arrow_right-icon :size="18" :color="'#838589'" class="rotate-180" />
                            <span class="sm:text-base text-sm">{{ $t('buttons.back') }}</span>
                        </button>
                    </div>
                    <div class="w-[370px] lg:block hidden py-6 p-8 rounded-xl sticky top-32">
                    </div>
                </div>
                <!-- Content -->
                <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6 mb-10">
                    <div class="lg:w-[950px] w-full space-y-4 px-4 pt-4 bg-white rounded-xl">
                        <!-- Notes -->
                        <ul class="pb-12 pt-4 border-b space-y-3 border-[#EDEDED] list-disc list-inside">
                            <li class="text-[#0C1A30]"
                                v-html="$t('descriptions.basket2', { order_total: settings.minimum_order_total })"></li>
                            <li class="text-[#0C1A30]"
                                v-html="$t('descriptions.basket3', { delivery_free_after: settings.delivery_free_after })">
                            </li>
                        </ul>
                        <!-- Form -->
                        <h1 class="text-lg font-medium text-[#0C1A30]">{{ $t('names.enter_info') }}</h1>
                        <FormSection class="w-full">
                            <div class="grid grid-cols-2 gap-6">
                                <FormGroup v-if="isClient">
                                    <FormTitle :id="'address'" :title="$t('forms.address')" isRequired />
                                    <div v-if="!formData.client_address" class="w-full">
                                        <button @click="showAddressAddModal = true"
                                            class="bg-[#F6F7F9] w-full h-[100px] rounded-[8px] flex items-center justify-center text-[#037D84] font-medium hover:bg-[#EDF0F2] transition-colors">
                                            <span>+ {{ $t('forms.add_address') }}</span>
                                        </button>
                                    </div>
                                    <div v-else class="w-full">
                                        <div class="bg-[#F6F7F9] rounded-[8px] p-4 border border-[#EDEDED]">
                                            <div class="flex items-start justify-between">
                                                <div class="flex-1">
                                                    <div class="flex items-center space-x-2 mb-2">
                                                        <div class="w-2 h-2 bg-[#FEB918] rounded-full"></div>
                                                        <span class="text-sm font-medium text-[#0C1A30]">
                                                            {{ $t('names.selected_address') }}
                                                        </span>
                                                    </div>
                                                    <p class="text-[#0C1A30] text-sm leading-relaxed">{{
                                                        formData.client_address }}
                                                    </p>
                                                </div>
                                                <button @click="showAddressAddModal = true"
                                                    class="ml-3 p-2 text-[#037D84] hover:bg-[#E6F7F8] rounded-lg transition-colors">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="validationErrors.client_address" class="text-red-500 text-sm mt-1">{{
                                        validationErrors.client_address }}</div>
                                </FormGroup>
                                <FormGroup v-if="!isClient">
                                    <FormTitle :id="'firstname'" :title="$t('forms.name')" />
                                    <FormInput v-model="formData.firstname" :label="'firstname'" />
                                </FormGroup>
                                <FormGroup v-if="!isClient">
                                    <FormTitle :id="'lastname'" :title="$t('forms.surname')" />
                                    <FormInput v-model="formData.lastname" :label="'lastname'" />
                                </FormGroup>
                                <FormGroup v-if="!isClient">
                                    <FormTitle :id="'phone'" :title="$t('forms.phoneNumber')" isRequired />
                                    <FormInput v-model="formData.phone" :label="'phone'" :type="'tel'"
                                        :placeholder="'+993********'" :required="true" />
                                    <div v-if="validationErrors.phone" class="text-red-500 text-sm mt-1">{{
                                        validationErrors.phone }}</div>
                                </FormGroup>
                                <FormGroup v-if="!isClient">
                                    <FormTitle :id="'delivery_region_id'" :title="$t('names.select_with_street')"
                                        isRequired />
                                    <CustomSelect v-model="formData.delivery_region_id" :options="regions"
                                        :placeholder="$t('names.select')" :isSearch="true"
                                        :searchPlaceholder="$t('names.search_with_street')"
                                        :noResultsText="$t('names.no_results')" :loading="deliveryLoading" />
                                    <div v-if="validationErrors.delivery_region_id" class="text-red-500 text-sm mt-1">{{
                                        validationErrors.delivery_region_id }}</div>
                                </FormGroup>
                                <!-- <FormGroup v-if="!isClient">
                                    <FormTitle :id="'email'" :title="'E-poçta salgysy'" />
                                    <FormInput v-model="formData.email" :label="'email'" :type="'email'"
                                        :placeholder="'example@.com'" />
                                </FormGroup> -->
                                <FormGroup v-if="!isClient">
                                    <FormTitle :id="'address-street'" :title="$t('forms.street')" />
                                    <FormInput v-model="formData.address.street" :label="'address-street'" />
                                </FormGroup>
                                <FormGroup v-if="!isClient">
                                    <FormTitle :id="'address-apartment'" :title="$t('forms.buildingNumber')" />
                                    <FormInput v-model="formData.address.apartment" :label="'address-apartment'" />
                                </FormGroup>
                                <FormGroup v-if="!isClient">
                                    <FormTitle :id="'address-home'" :title="$t('forms.houseNumber')" />
                                    <FormInput v-model="formData.address.home" :label="'address-home'" />
                                </FormGroup>
                                <!-- Delivery City (default localstorage city) -->
                                <!-- <FormGroup v-if="!isClient">
                                    <FormTitle :id="'delivery_city'" :title="$t('names.city')" />
                                    <FormInput v-model="formData.delivery_city" :capitalize="true"
                                        :label="'delivery_city'" />
                                </FormGroup> -->
                                <!-- Select Regions -->
                                <FormGroup>
                                    <FormTitle :id="'note'" :title="$t('forms.note')" />
                                    <textarea v-model="formData.note"
                                        class="w-full h-[100px] resize-none px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"></textarea>
                                </FormGroup>
                            </div>
                            <div class="pb-4 pt-10 space-y-8">
                                <h2 class="text-lg font-medium text-[#0C1A30]">{{ $t('forms.paymentType') }}</h2>
                                <div
                                    class="sm:max-w-[600px] max-w-[324px] grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                                    <PaymentTypeCard :title="$t('names.cash_payment')"
                                        :icon="{ name: 'bank_note-icon', bg_color: '#FA004C14' }"
                                        :selected="selectedCard === 'cash'" @toggle="selectPayment('cash')" />
                                    <PaymentTypeCard :title="$t('names.card_payment')"
                                        :icon="{ name: 'payment-icon', bg_color: '#009FE314' }"
                                        :selected="selectedCard === 'card'" @toggle="selectPayment('card')" />
                                    <PaymentTypeCard :title="$t('names.mixed_payment')"
                                        :icon="{ name: 'star-icon', bg_color: '#FEB91814' }"
                                        :selected="selectedCard === 'mixed'" @toggle="selectPayment('mixed')" />
                                </div>
                            </div>
                            <div class="pb-4 pt-10 space-y-8">
                                <h2 class="text-lg font-medium text-[#0C1A30]">{{ $t('names.delivery_service') }}</h2>
                                <div v-if="deliveryLoading" class="flex items-center justify-center py-8">
                                    <div class="text-gray-500">{{ $t('buttons.loading') }}</div>
                                </div>
                                <div v-else class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                                    <OrderTypeCard v-for="item in deliveryMethods" :key="item.id" :title="item.name"
                                        :regionPrices="item.region_prices || []"
                                        :region_id="formData.delivery_region_id" :isFree="isFree"
                                        :selected="selectedDeliveryMethod === item.id"
                                        :is_hidden="item.region_prices.length === 0 && item.time_slots.length === 0"
                                        @toggle="selectDeliveryMethod($event, item)" />
                                </div>

                                <!-- Time Slots Section -->
                                <div v-if="timeSlots.length > 0" class="pt-4 space-y-4">
                                    <h3 class="text-md font-medium text-[#0C1A30]">{{ $t('names.time_slots') }}</h3>
                                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        <button v-for="slot in timeSlots" :key="slot.id"
                                            @click="selectedTimeSlot = slot" :class="[
                                                'p-3 rounded-lg border text-sm font-medium transition-all duration-200',
                                                selectedTimeSlot?.id === slot.id
                                                    ? 'border-[#FEB918] bg-[#FEB9180D] text-[#FEB918]'
                                                    : 'border-[#EDEDED] bg-white text-[#0C1A30] hover:border-[#FEB918]'
                                            ]">
                                            {{ slot.time_slot }}
                                        </button>
                                    </div>
                                </div>
                                <!-- DatePicker -->
                                <FormGroup class="max-w-[324px]">
                                    <FormTitle :id="'delivery_date'" :title="'Eltip bermek senesi'" />
                                    <Datepicker format="dd.MM.yyyy" v-model="formData.delivery_date"
                                        class="date_picker w-full" :min-date="new Date()"
                                        @update:modelValue="handleDateChange" />
                                </FormGroup>
                            </div>
                        </FormSection>
                    </div>
                    <!-- Order Summary -->
                    <div class="lg:w-[370px] w-full py-6 p-8 bg-white rounded-xl sticky top-32">
                        <!-- Promo Code Section -->
                        <div class="mb-4 space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">{{ $t('forms.price') }}:</span>
                                <span class="font-medium text-[#0C1A30]">{{ subtotal }} TMT</span>
                            </div>
                            <div v-if="giftCard" class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">{{ $t('names.gift_coupon') }}:</span>
                                <span class="font-medium text-[#037D84]">-{{ giftCard || 0 }} TMT</span>
                            </div>

                            <div v-if="loyaltyCard" class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">{{ $t('names.loyalty_coupon') }}:</span>
                                <span v-if="cartStore.cartInfo.cashback_used && loyaltyAction === 'use_balance'"
                                    class="font-medium text-[#FEB918]">-{{
                                        cartStore.cartInfo.cashback_used || 0 }} TMT</span>
                                <span v-if="cartStore.cartInfo.cashback_earned && loyaltyAction === 'apply_cashback'"
                                    class="font-medium text-[#037D84]">+{{
                                        cartStore.cartInfo.cashback_earned || 0 }} ball</span>

                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">{{ $t('names.delivery_service') }}:</span>
                                <span class="font-medium text-[#0C1A30]">{{ deliveryPrice }} TMT</span>
                            </div>
                        </div>

                        <!-- Price Breakdown -->
                        <div class="space-y-3 mb-6">
                            <div class="border-t border-[#EDEDED] pt-3">
                                <div class="flex justify-between items-center pt-4">
                                    <span class="font-medium text-[#0C1A30]">{{ $t('names.result_amount') }}:</span>
                                    <span class="font-bold text-[#037D84]">{{ total }} TMT</span>
                                </div>
                            </div>
                        </div>

                        <!-- Checkout Button -->
                        <button @click="checkout" :disabled="cartItems.length === 0 || loading"
                            class="w-full bg-[#FEB918] text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                            {{ loading ? $t('buttons.add_order_loading') : $t('buttons.add_order') }}
                        </button>
                    </div>
                </div>
            </MainContainer>
            <!-- Product Section -->
            <!-- <ProductSection :sectionTitle="'Siziň üçin harytlar'" :products="products" /> -->
        </div>
        <!-- Address Select Modal -->
        <AddressSelectModal v-if="isClient" :show="showAddressAddModal" @submit="handleAddressSelect"
            @addAddress="addAddress" @close="showAddressAddModal = false" />
        <!-- Address Add Modal -->
        <AddressAddModal v-if="isClient" :show="showAddressSelectModal" @submit="handleAddressAdd"
            @close="showAddressSelectModal = false" />
        <!-- Order Success Modal -->
        <OrderSuccessModal :show="orderSuccessModal" :order_number="order_number" @submit="handleInvoiceRedirect"
            @close="orderSuccessModal = false" />
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { formatToYYYYMMDD } from "@/composables/useFormatDate.js"
import Datepicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
const isClient = ref(false)
const loadingPage = ref(true)

const authStore = useAuthStore()
const { isAuthenticated } = authStore

const addressesStore = useClientAddressesStore()
const { fetchAddresses, createAddress } = addressesStore

const cartStore = useCartStore()
const { fetchCart } = cartStore
const { cartItems, giftCard, loyaltyCard, subtotal, total, loading } = storeToRefs(cartStore)
const loyaltyAction = ref(sessionStorage.getItem('loyaltyAction') || 'apply_cashback')

const isFree = ref(false)
const deliveryPrice = ref(0)
const regionsStore = useRegionsStore()
const { fetchDeliveryMethods, fetchRegions, fetchSettings } = regionsStore
const { regions, deliveryMethods, loading: deliveryLoading, settings } = storeToRefs(regionsStore)

const showAddressAddModal = ref(false)
const showAddressSelectModal = ref(false)
const selectedCard = ref('')
const selectedTimeSlot = ref(null)
const selectedDeliveryMethod = ref(null)
const timeSlots = ref([])
const { success, error: toastError } = useToast()
const validationErrors = ref({})
const formData = ref({
    firstname: '',
    lastname: '',
    email: '',
    phone: '+993',
    address: {
        street: '',
        home: '',
        apartment: '',
    },
    client_address: '',
    note: '',
    delivery_city: localStorage.getItem('city'),
    delivery_region_id: null,
    delivery_date: null,
})
// Methods
const goBack = () => {
    if (window.history.length > 1) {
        window.history.back()
    } else {
        window.location.href = '/'
    }
}

const isFreeOrder = () => {
    if (settings.value.delivery_free_after <= total.value) isFree.value = true
}

const mergeObjectStrings = (obj, separator = " ") => {
    if (!obj || typeof obj !== "object") return "";

    return Object.values(obj)
        .filter(value => typeof value === "string" && value.trim() !== "")
        .join(separator)
        .trim();
}

const handleDateChange = (date) => {
    formData.value.delivery_date = date
}

const addAddress = () => {
    showAddressAddModal.value = false
    showAddressSelectModal.value = true
}
const selectPayment = (type) => {
    selectedCard.value = type
}

const selectDeliveryMethod = (e, data) => {
    cartStore.setTotal(e.price)
    deliveryPrice.value = e.price
    selectedDeliveryMethod.value = data.id
    timeSlots.value = data.time_slots
}

// clearCart function removed - using cart store's clearCart instead

const validateForm = () => {
    validationErrors.value = {}
    let isValid = true

    if (isClient.value) {
        // Validate client address
        if (!formData.value.client_address || formData.value.client_address.trim() === '') {
            validationErrors.value.client_address = t('errors.required')
            isValid = false
        }
    } else {
        if (formData.value.phone.length !== 12 || formData.value.phone.trim() === '') {
            validationErrors.value.phone = t('errors.required')
            isValid = false
        }
        if (!formData.value.delivery_region_id) {
            validationErrors.value.delivery_region_id = t('errors.required')
            isValid = false
        }
    }

    return isValid
}

// Invoice redirect
const router = useRouter()
const order_number = ref(null)
const orderSuccessModal = ref(false)
const handleInvoiceRedirect = (orderNumber) => {
    router.push({ name: 'Invoice', params: { id: orderNumber } })
}

const cleanObject = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(
            ([_, value]) =>
                value !== "" &&
                value !== null &&
                value !== undefined
        )
    );
}

const checkout = async () => {
    if (cartItems.value.length === 0) return

    // Clear previous validation errors
    validationErrors.value = {}

    // Validate form fields
    if (!validateForm()) {
        return
    }

    // Validation
    if (!selectedCard.value) {
        toastError(t('errors.select_payment_type'))
        return
    }

    if (!selectedDeliveryMethod.value) {
        toastError(t('errors.select_delivery_method'))
        return
    }

    if (!selectedTimeSlot.value) {
        toastError(t('errors.select_time_slot'))
        return
    }

    try {
        let checkoutData = {}
        if (!isClient.value) {
            checkoutData = cleanObject({
                temporary_first_name: formData.value.firstname,
                temporary_last_name: formData.value.lastname,
                delivery_phone: formData.value.phone,
                delivery_address: mergeObjectStrings(formData.value.address),
                delivery_note: formData.value.note,
                notes: formData.value.note,
                payment_method: selectedCard.value,
                delivery_method_id: selectedDeliveryMethod.value,
                delivery_region: formData.value.delivery_region_id,
                selected_time_slot: selectedTimeSlot.value?.id,
                preferred_delivery_date: formatToYYYYMMDD(formData.value.delivery_date)
            });
        } else {
            checkoutData = cleanObject({
                notes: formData.value.note,
                payment_method: selectedCard.value,
                delivery_address: formData.value.client_address,
                delivery_method_id: selectedDeliveryMethod.value,
                selected_time_slot: selectedTimeSlot.value?.id || null,
                preferred_delivery_date: formatToYYYYMMDD(formData.value.delivery_date)
            })
        }
        // Use cart store checkout function
        const order = await cartStore.checkout(checkoutData)

        selectedCard.value = ''
        selectedDeliveryMethod.value = null
        selectedTimeSlot.value = null

        // Redirect to checkout success page
        orderSuccessModal.value = true
        order_number.value = order.order_number

    } catch (error) {
        console.error('Checkout error:', error)
    }
}

//  Address select
const handleAddressSelect = (addressData) => {
    formData.value.client_address = addressData.address || ''
    showAddressAddModal.value = false
}
// Address add
const handleAddressAdd = async (addressData) => {
    try {
        const address = await createAddress(addressData)
        formData.value.client_address = address.address
        showAddressAddModal.value = false
        showAddressSelectModal.value = false
        success(t('success.address_add'))
    } catch (e) {
        toastError()
    } finally {
        if (isClient.value) {
            await fetchAddresses()
        }
    }
}

// Clear validation errors when user starts typing
const clearValidationError = (field) => {
    if (validationErrors.value[field]) {
        delete validationErrors.value[field]
    }
}

// Watch form fields to clear validation errors
watch(() => formData.value.phone, () => clearValidationError('phone'))
watch(() => formData.value.delivery_region_id, () => clearValidationError('delivery_region_id'))

// Lifecycle
onMounted(async () => {
    loadingPage.value = true
    try {
        await fetchCart()
        await fetchDeliveryMethods()
        await fetchRegions({ city: localStorage.getItem('city'), is_active: true })
        await fetchSettings()
        isFreeOrder()
        if (isAuthenticated) isClient.value = true
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        loadingPage.value = false
    }
})
</script>