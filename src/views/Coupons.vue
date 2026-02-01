<template>
    <div>
        <CouponsSekeleton v-show="loadingPage" />
        <div v-show="!loadingPage" class="bg-white">
            <MainContainer class="mb-5">
                <LinkGroup :items="[{ label: $t('nav.coupons'), to: '/coupons' }]" />
            </MainContainer>
            <MainContainer v-if="clientStore.loyalty_card">
                <!-- Header -->
                <div class="text-center mb-10 sm:mb-16">
                    <h1 class="text-xl sm:text-2xl lg:text-[30px] font-semibold text-[#0C1A30] mb-2">
                        {{ $t('names.loyalty') }}
                    </h1>
                </div>

                <!-- Loyalty Section -->
                <section class="w-full">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
                        <!-- Card Section -->
                        <section class="lg:col-span-2 relative">
                            <img :src="cartStore.currentLoyalty.image"
                                class="w-full h-48 sm:h-60 lg:h-[356px] object-cover rounded-[10px]" />
                            <div
                                class="absolute bottom-6 sm:bottom-10 left-1/2 w-[90%] sm:w-[80%] -translate-x-1/2 h-[100px] sm:h-[140px] rounded-md bg-white shadow-md">
                                <div class="flex flex-col h-full space-y-3 items-center justify-center">
                                    <svg ref="barcodeSvg"></svg>
                                </div>
                            </div>
                        </section>

                        <!-- Card Info -->
                        <aside
                            class="px-6 py-4 sm:px-10 sm:py-6 lg:px-14 lg:py-10 space-y-6 sm:space-y-8 bg-[#F6F7F9] rounded-[10px]">
                            <!-- Points -->
                            <div class="transform transition-all duration-300 hover:scale-105 text-center lg:text-left">
                                <h3 class="text-xl sm:text-[22px] font-semibold text-[#0C1A30] mb-1 sm:mb-2">
                                    {{ cartStore.currentLoyalty.cashback_balance }} Ball
                                </h3>
                                <p class="text-[#0C1A3080] text-sm capitalize">{{ $t('names.balance') }}</p>
                            </div>

                            <!-- Status -->
                            <div class="py-4 sm:py-6 border-t border-b border-gray-100 text-center lg:text-left">
                                <h4 class="text-xl sm:text-[22px] font-semibold text-[#0C1A30] mb-1 sm:mb-2">
                                    {{ cartStore.currentLoyalty.card_name }}
                                </h4>
                                <p class="text-[#0C1A3080] text-sm capitalize">{{ $t('names.status') }}</p>
                            </div>

                            <!-- Card Number -->
                            <div class="text-center lg:text-left">
                                <h5 class="text-xl sm:text-[22px] font-semibold text-[#0C1A30] mb-1 sm:mb-2">
                                    {{ cartStore.currentLoyalty.card_number }}
                                </h5>
                                <p class="text-[#0C1A3080] text-sm capitalize">{{ $t('names.card_number') }}</p>
                            </div>
                        </aside>
                    </div>
                </section>

                <!-- Transaction History -->
                <section class="mt-10 sm:mt-12 w-full">
                    <div class="overflow-hidden">
                        <!-- Header -->
                        <div class="py-4 sm:py-6">
                            <h2 class="text-lg sm:text-[22px] font-semibold text-[#0C1A30]">
                                {{ $t('names.order_history') }}
                            </h2>
                        </div>

                        <!-- Table -->
                        <div class="overflow-x-auto rounded-[10px]">
                            <table class="min-w-full text-sm sm:text-base">
                                <thead class="bg-[#F6F7F9]">
                                    <tr>
                                        <th
                                            class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left font-medium text-[#0C1A30]">
                                            ID
                                        </th>
                                        <th
                                            class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left font-medium text-[#0C1A30]">
                                            {{ $t('names.date') }}
                                        </th>
                                        <th
                                            class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left font-medium text-[#0C1A30]">
                                            {{ $t('forms.status') }}
                                        </th>
                                        <th
                                            class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left font-medium text-[#0C1A30]">
                                            {{ $t('names.add_remove_point') }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-[#EDEDED]">
                                    <tr v-for="(transaction, index) in transactions" :key="index"
                                        class="transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                                        <td class="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 whitespace-nowrap">
                                            <span class="font-medium text-[#0C1A30]">#{{ transaction.id }}</span>
                                        </td>
                                        <td class="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 whitespace-nowrap">
                                            <span class="text-[#0C1A30]">{{ formatToYYYYMMDD(transaction.date) }}</span>
                                        </td>
                                        <td class="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 whitespace-nowrap">
                                            <span class="font-medium text-[#0C1A30]">{{ transaction.transaction_type ===
                                                "earned" ? $t('names.earned') : $t("names.spent") }}</span>
                                        </td>
                                        <td class="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 whitespace-nowrap">
                                            <span class="font-medium transition-colors duration-300" :class="transaction.isPositive
                                                ? 'text-[#FEB918] hover:text-yellow-500'
                                                : 'text-[#838589] hover:text-gray-600'
                                                ">
                                                {{ `+${transaction.cashback_earned}` || `-${transaction.cashback_used}`
                                                }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </MainContainer>
            <MainContainer>
                <NoDataSection image="/icons/coupon.webp" :desc="$t('descriptions.coupon')" />
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
import JsBarcode from "jsbarcode";
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { formatToYYYYMMDD } from "@/composables/useFormatDate.js"

const barcodeSvg = ref(null);
const barcodeText = ref(null);
const cartStore = useCartStore();
const clientStore = useClientStore();
const transactions = ref([]);
const loadingPage = ref(true);

const generateBarcode = () => {
    if (!barcodeSvg.value) return;
    JsBarcode(barcodeSvg.value, barcodeText.value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 80,
    });
    barcodeSvg.value.style.width = "100%";
};

onMounted(async () => {
    loadingPage.value = true
    await clientStore.fetchAccount();
    if (clientStore.loyalty_card) {
        barcodeText.value = clientStore.loyalty_card?.card_number;
        const history = await cartStore.fetchLoyaltyDetail(clientStore.loyalty_card?.id);
        if (history) {
            transactions.value = [...history?.usage_history?.payments, ...history?.usage_history?.fulfillments]
        }
        generateBarcode();
    }
    loadingPage.value = false
});
</script>