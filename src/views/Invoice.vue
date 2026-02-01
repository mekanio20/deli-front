<template>
    <div class="mx-4 sm:mx-6 lg:mx-8">
        <div class="mt-8 sm:mt-14"></div>
        <div>
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
                <img class="w-[140px] sm:min-w-[140px] h-11" src="/icons/logo.png" alt="logo">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-semibold">
                    Sargyt belgisi #{{ order.order_number }}
                </h1>
            </div>

            <!-- Order Details -->
            <div class="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-0">
                <!-- Sol kısım - Müşteri Bilgileri -->
                <div class="flex flex-1 flex-col gap-2 sm:gap-3 mt-5">
                    <p class="text-sm sm:text-base break-words">
                        <span class="font-medium">Müşderi nomeri:</span> {{ order.delivery_phone }} - {{
                        order.customer_name }}
                    </p>
                    <p class="text-sm sm:text-base break-words">
                        <span class="font-medium">Müşderiniň salgysy:</span> {{ order.delivery_address }}
                    </p>
                    <p class="text-sm sm:text-base break-words">
                        <span class="font-medium">Bellik:</span> {{ order.delivery_note }}
                    </p>
                    <canvas id="qrcode" class="mt-5 max-w-[150px]"></canvas>
                </div>

                <!-- Sağ kısım - Sipariş Bilgileri -->
                <div class="flex flex-1 flex-col lg:items-end gap-2 sm:gap-3 mt-5 lg:mt-5">
                    <p class="text-sm sm:text-base">
                        <span class="font-medium">Sargyt senesi:</span> {{ order.date_created }}
                    </p>
                    <p class="text-sm sm:text-base">
                        <span class="font-medium">Töleg görnüşi:</span> {{ order.payment_method }}
                    </p>
                    <p class="text-sm sm:text-base">
                        <span class="font-medium">Eltip bermek usuly:</span> {{ order.delivery_method_info?.name }}
                    </p>
                    <p class="text-sm sm:text-base">
                        <span class="font-medium">Eltip berme bahasy (TMT):</span> {{ order.delivery_cost }}
                    </p>
                    <p class="text-sm sm:text-base font-semibold">
                        <span class="font-bold">Faktura jemi (TMT):</span> {{ order.total_amount }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Tablo -->
        <div class="mt-8 sm:mt-10">
            <!-- Desktop Table -->
            <div class="hidden md:block overflow-x-auto">
                <table class="w-full table-fixed border border-gray-300">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="w-48 text-sm border border-gray-300 py-3 pl-5 text-left">Faktura ady</th>
                            <th class="w-14 text-sm border border-gray-300 py-3 text-center">Mukdar</th>
                            <th class="w-14 text-sm border border-gray-300 py-3 text-center">Birlik</th>
                            <th class="w-22 text-sm border border-gray-300 py-3 text-center">Birlik bahasy (TMT)</th>
                            <th class="w-22 text-sm border border-gray-300 py-3 text-center">Jemi baha (TMT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.items" :key="item.id" class="hover:bg-gray-50">
                            <td class="pl-5 border border-gray-300 py-2 text-sm">
                                {{ item.product_name }} ({{ item.product_barcode }})
                            </td>
                            <td class="text-center border border-gray-300 py-2 text-sm">{{ item.quantity }}</td>
                            <td class="text-center border border-gray-300 py-2 text-sm">{{ item.product_unit }}</td>
                            <td class="text-center border border-gray-300 py-2 text-sm">{{ item.unit_price.toFixed(2) }}
                            </td>
                            <td class="text-center border border-gray-300 py-2 text-sm">{{ item.total_price.toFixed(2)
                                }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile Cards -->
            <div class="md:hidden space-y-4">
                <div v-for="item in order.items" :key="item.id" class="border border-gray-300 rounded-lg p-4 bg-white">
                    <h3 class="font-semibold text-sm mb-3 text-gray-900">
                        {{ item.product_name }}
                    </h3>
                    <p class="text-xs text-gray-600 mb-3">({{ item.product_barcode }})</p>

                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Mukdar:</span>
                            <span class="font-medium">{{ item.quantity }} {{ item.product_unit }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Birlik bahasy:</span>
                            <span class="font-medium">{{ item.unit_price.toFixed(2) }} TMT</span>
                        </div>
                        <div class="flex justify-between pt-2 border-t border-gray-200">
                            <span class="text-gray-900 font-semibold">Jemi baha:</span>
                            <span class="font-bold text-gray-900">{{ item.total_price.toFixed(2) }} TMT</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="w-full mt-4 sm:mt-6 space-y-2">
                <p class="text-end text-base sm:text-lg lg:text-xl font-medium">
                    Eltip berme bahasy: {{ order.delivery_cost }} TMT
                </p>
                <p class="text-end text-lg sm:text-xl lg:text-2xl font-bold">
                    Jemi: {{ order.total_amount }} TMT
                </p>
            </div>

            <!-- Print Button -->
            <div class="w-full mt-8 sm:mt-10 flex justify-center no-print">
                <button
                    class="w-full sm:w-auto bg-[#FEB918] hover:bg-[#ffcf5f] text-white font-semibold py-3 px-8 rounded-[10px] transition-all duration-200"
                    @click="printWindow">
                    Göçürip alyň
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import QRCode from 'qrcode'
const ordersStore = useOrdersStore()
const { fetchReceipt } = ordersStore
const route = useRoute()
const order = ref({})
const orderUuid = computed(() => route.params.id)

const generateQR = async () => {
    const canvas = document.getElementById('qrcode')
    const qrText = `https://tamrahat.com.tm/receipt/${orderUuid.value}`

    await QRCode.toCanvas(canvas, qrText, { width: 150, margin: 2 })

    const ctx = canvas.getContext('2d')
    const logo = new Image()
    logo.src = '/icons/favicon.png'
    logo.onload = () => {
        const size = 40
        const x = (canvas.width - size) / 2
        const y = (canvas.height - size) / 2
        ctx.drawImage(logo, x, y, size, size)
    }
}

const printWindow = () => {
    window.print()
}

onMounted(async () => {
    if (!orderUuid.value) return
    const order_detail = await fetchReceipt(orderUuid.value)
    order.value = order_detail.order
    await nextTick()
    generateQR()
})
</script>

<style scoped>
@media print {
    .no-print {
        display: none !important;
    }

    /* Print için tablo optimizasyonu */
    .md\:hidden {
        display: none !important;
    }

    .hidden {
        display: block !important;
    }
}
</style>