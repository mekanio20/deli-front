<template>
    <div>
        <OrderDetailSkeleton v-show="loading" />
        <div v-show="!loading" class="bg-[#F6F7F9] w-full">
            <!-- Header -->
            <MainContainer>
                <LinkGroup
                    :items="[{ label: $t('nav.orders'), to: '/account/orders' }, { label: `#${orderId}`, to: `/account/order/detail/${orderId}` }]" />
    
                <!-- Title -->
                <div class="pb-4 sm:pb-8 pt-4 sm:pt-6 w-full">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div class="flex items-center space-x-3 sm:space-x-5">
                            <h1 class="text-xl sm:text-2xl lg:text-[30px] leading-tight font-semibold text-[#0C1A30]">
                                #{{ orderId }}
                            </h1>
                            <span class="text-[#838589] text-xs sm:text-sm">{{ orderItems.length }} {{ $t('page.product') }}</span>
                        </div>
                        <div v-if="orderStatus" :class="getStatusClass(orderStatus)"
                            class="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full w-fit">
                            {{ orderStatus }}
                        </div>
                    </div>
                </div>
    
                <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 gap-4 lg:gap-6 mb-6 sm:mb-10">
                    <!-- Main Content -->
                    <div class="bg-white w-full rounded-lg">
                        <div v-if="loading" class="p-8 text-center">
                            <div class="text-gray-500">{{ $t('buttons.loading') }}</div>
                        </div>
                        <div v-else class="divide-y divide-[#EDEDED] rounded-xl overflow-hidden">
                            <!-- Dynamic Order Items -->
                            <div v-for="(item, index) in orderItems" :key="index" class="p-3 sm:p-5">
                                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                    <!-- Product Image and Name -->
                                    <div class="flex items-center space-x-3 w-full sm:w-auto">
                                        <div
                                            class="w-16 h-16 sm:w-[100px] sm:h-[100px] bg-[#F6F7F9] rounded-[10px] flex items-center justify-center flex-shrink-0">
                                            <img v-if="item.product_image" :src="item.product_image"
                                                class="w-full h-full object-cover rounded-[10px]" :alt="item.product_name">
                                            <svg v-else class="w-6 h-6 text-green-600" fill="currentColor"
                                                viewBox="0 0 20 20">
                                                <path
                                                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                            </svg>
                                        </div>
                                        <h3 class="text-sm font-medium text-[#0C1A30] line-clamp-2 flex-1">
                                            {{ item.product_name || $t('forms.productName') }}
                                        </h3>
                                    </div>
    
                                    <!-- Price Details -->
                                    <div
                                        class="flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 w-full sm:px-10 sm:w-auto sm:flex-1">
                                        <div class="space-y-1">
                                            <span class="text-[10px] sm:text-[12px] text-[#838589] block">{{ $t('forms.price') }}</span>
                                            <div class="font-medium text-sm sm:text-base text-[#0C1A30]">{{ item.unit_price
                                                }} TMT</div>
                                        </div>
                                        <div class="space-y-1">
                                            <span class="text-[10px] sm:text-[12px] text-[#838589] block">{{ $t('forms.quantity') }}</span>
                                            <div class="font-medium text-sm sm:text-base text-[#0C1A30]">{{ item.quantity }}
                                            </div>
                                        </div>
                                        <div class="space-y-1">
                                            <span class="text-[10px] sm:text-[12px] text-[#838589] block">{{ $t('names.amount') }}</span>
                                            <div class="font-medium text-sm sm:text-base text-[#0C1A30]">{{ item.total_price
                                                }} TMT</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <!-- Contact Information Section -->
                        <div class="w-full space-y-4 p-4 sm:p-6 lg:p-8 bg-white border-t border-[#EDEDED]">
                            <h1 class="text-base sm:text-lg font-medium text-[#0C1A30]">{{ $t('names.info') }}</h1>
    
                            <FormSection class="w-full">
                                <div class="pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <FormGroup>
                                        <FormTitle :id="'address'" :title="$t('forms.address')" />
                                        <textarea v-model="formData.address" :disabled="true"
                                            class="w-full h-[80px] sm:h-[100px] resize-none px-4 sm:px-5 py-3 sm:py-4 bg-[#F6F7F9] border-0 rounded-[10px] text-sm cursor-not-allowed"></textarea>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormTitle :id="'note'" :title="$t('forms.note')" />
                                        <textarea v-model="formData.note" :disabled="true"
                                            class="w-full h-[80px] sm:h-[100px] resize-none px-4 sm:px-5 py-3 sm:py-4 bg-[#F6F7F9] border-0 rounded-[10px] text-sm cursor-not-allowed"></textarea>
                                    </FormGroup>
                                </div>
    
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div class="pb-4 pt-6 sm:pt-10 space-y-4 sm:space-y-8">
                                        <h2 class="text-base sm:text-lg font-medium text-[#0C1A30]">{{ $t('forms.paymentType') }}</h2>
                                        <div
                                            class="w-full sm:w-fit px-4 sm:px-6 py-3 border border-[#EDEDED] rounded-lg flex items-center space-x-3">
                                            <div
                                                class="w-7 h-7 bg-[#FA004C14] rounded-full flex items-center justify-center flex-shrink-0">
                                                <bank_note-icon />
                                            </div>
                                            <p class="text-sm sm:text-base text-[#0C1A30]">
                                                {{ orderDetails.payment_method || $t('forms.paymentType') }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="pb-4 pt-0 sm:pt-10 space-y-4 sm:space-y-8">
                                        <h2 class="text-base sm:text-lg font-medium text-[#0C1A30]">{{ $t('names.delivery_service') }}
                                        </h2>
                                        <div
                                            class="w-full sm:w-fit px-4 sm:px-6 py-3 border border-[#EDEDED] rounded-lg flex items-center justify-between sm:justify-start sm:space-x-6">
                                            <p class="text-sm sm:text-base text-[#0C1A30]">{{
                        orderDetails.delivery_method_info?.name }}</p>
                                            <p v-if="orderDetails.delivery_fee"
                                                class="text-[#FEB918] text-xs sm:text-sm flex-shrink-0">
                                                {{ orderDetails.delivery_fee }} TMT
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FormSection>
                        </div>
                    </div>
    
                    <!-- Order Summary -->
                    <div
                        class="w-full lg:w-[370px] py-4 sm:py-6 px-3 sm:px-4 bg-white rounded-xl lg:sticky lg:top-32 flex-shrink-0">
                        <!-- Gift Card and Loyalty Card Section -->
                        <div class="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
                            <!-- Gift Card -->
                            <div v-if="orderDetails.gift_card_info"
                                class="flex items-center justify-between p-3 bg-[#E8F4F8] rounded-lg">
                                <div class="flex items-center space-x-2 min-w-0 flex-1">
                                    <div
                                        class="w-6 h-6 sm:w-7 sm:h-7 bg-[#037D841F] rounded-full flex items-center justify-center flex-shrink-0">
                                        <discount_circle-icon />
                                    </div>
                                    <span class="text-xs sm:text-sm text-[#0C1A30] truncate">
                                        {{ $t('names.gift_coupon') }}: {{ orderDetails.gift_card_info.card_name }}
                                    </span>
                                </div>
                                <span class="text-xs sm:text-sm text-[#037D84] font-medium ml-2 flex-shrink-0">
                                    {{ orderDetails.gift_card_amount_used || 0 }} TMT
                                </span>
                            </div>
                            <div v-else class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg">
                                <div
                                    class="w-6 h-6 sm:w-7 sm:h-7 bg-[#037D841F] rounded-full flex items-center justify-center">
                                    <discount_circle-icon />
                                </div>
                                <span class="text-xs sm:text-sm text-[#838589]">{{ $t('page.not_use_gift_coupon') }}</span>
                            </div>
    
                            <!-- Loyalty Card -->
                            <div v-if="orderDetails.loyalty_card_info"
                                class="flex items-center justify-between p-3 bg-[#FEF3E2] rounded-lg">
                                <div class="flex items-center space-x-2 min-w-0 flex-1">
                                    <div
                                        class="w-6 h-6 sm:w-7 sm:h-7 bg-[#FEB91826] rounded-full flex items-center justify-center flex-shrink-0">
                                        <star-icon />
                                    </div>
                                    <span class="text-xs sm:text-sm text-[#0C1A30] truncate">
                                        {{ $t('names.loyalty') }}: {{ orderDetails.loyalty_card_info.card_name }}
                                    </span>
                                </div>
                                <span v-if="orderDetails.cashback_earned" class="text-xs sm:text-sm text-[#FEB918] font-medium ml-2 flex-shrink-0">
                                    -{{ orderDetails.cashback_earned }}
                                </span>
                                <span v-if="orderDetails.cashback_used" class="text-xs sm:text-sm text-[#FEB918] font-medium ml-2 flex-shrink-0">
                                    +{{ orderDetails.cashback_used }}
                                </span>
                            </div>
                            <div v-else class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg">
                                <div
                                    class="w-6 h-6 sm:w-7 sm:h-7 bg-[#FEB91826] rounded-full flex items-center justify-center">
                                    <star-icon />
                                </div>
                                <span class="text-xs sm:text-sm text-[#838589]">{{ $t('page.not_use_loyalty_coupon') }}</span>
                            </div>
                        </div>
    
                        <!-- Price Breakdown -->
                        <div class="space-y-3">
    
                            <div class="border-t border-[#EDEDED] pt-3 sm:pt-4">
                                <div class="flex justify-between items-center">
                                    <span class="font-medium text-lg sm:text-2xl text-[#0C1A30]">{{ $t('names.amount') }}:</span>
                                    <span class="font-bold text-xl sm:text-2xl text-[#037D84] ml-2">{{ orderTotal }}
                                        TMT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
// Store and router
const ordersStore = useOrdersStore()
const { order_info, loading } = storeToRefs(ordersStore)
const { fetchOrder } = ordersStore
const route = useRoute()

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Form data - will be populated from API
const formData = ref({
    fullname: '',
    phone: '',
    address: '',
    note: ''
})

// Get order ID from route params
const orderId = computed(() => route.params.id)

// Computed properties for order data
const orderDetails = computed(() => order_info.value || {})
const orderItems = computed(() => orderDetails.value.items || [])
const orderTotal = computed(() => orderDetails.value.total_amount || 0)

// Status mapping for display
const getStatusLabel = (status) => {
    const statusMap = {
        'pending': t('page.pending'),
        'accepted': t('page.accepted'),
        'assigned_to_courier': t('page.assigned_to_courier'),
        'delivering': t('names.delivering'),
        'delivered': t('names.delivered'),
        'completed': t('names.completed'),
        'rejected': t('page.rejected'),
        'canceled': t('names.canceled')
    }
    return statusMap[status] || status
}

const orderStatus = computed(() => {
    const status = orderDetails.value.status_label || orderDetails.value.status || ''
    return status.includes('pending') || status.includes('accepted') || status.includes('assigned_to_courier') || status.includes('delivering') || status.includes('completed') || status.includes('rejected') || status.includes('canceled') ? status : getStatusLabel(orderDetails.value.status)
})

// Status styling
const getStatusClass = () => {
    const originalStatus = orderDetails.value.status
    switch (originalStatus) {
        case 'pending':
            return 'bg-[#FEB9181A] text-[#FEB918]'
        case 'accepted':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'assigned_to_courier':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'delivering':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'delivered':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'completed':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'rejected':
            return 'bg-[#FA004C1F] text-[#FA004C]'
        case 'canceled':
            return 'bg-[#FA004C1F] text-[#FA004C]'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

// Fetch order data on component mount
onMounted(async () => {
    try {
        if (orderId.value) {
            await fetchOrder(orderId.value)
            if (order_info.value) {
                formData.value = {
                    fullname: order_info.value.client_name || '',
                    phone: order_info.value.client_phone || '',
                    address: order_info.value.delivery_address || '',
                    note: order_info.value.delivery_note || order_info.value.notes
                }
            }
        }
    } catch (error) {
        console.error('Error fetching order details:', error)
    }
})
</script>