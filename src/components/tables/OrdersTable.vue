<template>
    <div class="w-full">
        <!-- Navigation Tabs -->
        <div class="mb-8" role="tablist">
            <div class="flex flex-wrap gap-2">
                <button v-for="(tab, index) in tabs" :key="index" @click="handleTabChange(tab)" :class="[
                    'px-6 py-2 sm:text-base text-sm rounded-lg transition-all duration-200',
                    activeTab === tab.id
                        ? 'bg-[#FEB918] text-white font-semibold'
                        : 'bg-white text-[#838589] hover:bg-gray-50 border border-[#EDEDED]'
                ]" :aria-selected="activeTab === tab.id" role="tab">
                    {{ tab.name }}
                </button>
            </div>
        </div>

        <!-- Table Container -->
        <section class="bg-white rounded-xl overflow-hidden">
            <!-- Desktop Table -->
            <div class="hidden md:block overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-[#F6F7F9]">
                        <tr>
                            <th v-for="(column, index) in columns" :key="index"
                                class="px-6 py-4 text-left sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ column.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(row, rowIndex) in filteredData" :key="rowIndex"
                            class="hover:bg-gray-50 transition-colors duration-150 group">
                            <td class="px-6 py-4">
                                <span :class="getStatusClass(row.originalStatus)"
                                    class="px-5 py-2 text-sm rounded-full text-nowrap">
                                    {{ row.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 sm:text-base text-sm font-medium text-[#0C1A30]">
                                #{{ row.id }}
                            </td>
                            <td class="px-6 py-4 sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ row.date }}
                            </td>
                            <td class="px-6 py-4 sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ row.paymentType }}
                            </td>
                            <td class="px-6 py-4 sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ row.amount }} {{ row.currency || 'TMT' }}
                            </td>
                            <td class="px-6 py-4">
                                <button v-if="row.originalStatus !== 'pending'"
                                    class="px-4 py-2 bg-gray-200 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed"
                                    disabled>
                                    {{ $t('buttons.cancel') }}
                                </button>
                                <button v-else
                                    class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-500 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    :disabled="loading" @click="cancelItem(row.id)">
                                    {{ loading ? $t('buttons.loading') : $t('buttons.cancel') }}
                                </button>
                            </td>
                            <td class="px-6 py-4">
                                <button
                                    class="px-4 py-2 border-[1px] border-[#FEB918] text-[#FEB918] text-sm font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none"
                                    @click="viewItem(row.id)">
                                    {{ $t('buttons.view') }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile Cards -->
            <div class="md:hidden space-y-4 p-4">
                <div v-for="(row, index) in filteredData" :key="index"
                    class="bg-white border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow duration-200">
                    <div class="flex justify-between items-start">
                        <span :class="getStatusClass(row.originalStatus)" class="px-3 py-1 text-xs rounded-full">
                            {{ row.status }}
                        </span>
                        <span class="text-base font-medium text-[#0C1A30]">#{{ row.id }}</span>
                    </div>

                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-xs text-gray-500">{{ $t('names.date') }}:</span>
                            <span class="text-xs text-[#0C1A30]">{{ row.date }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-xs text-gray-500">{{ $t('forms.paymentType') }}:</span>
                            <span class="text-xs text-[#0C1A30]">{{ row.paymentType }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-xs text-gray-500">{{ $t('names.amount') }}:</span>
                            <span class="text-xs font-semibold text-[#0C1A30]">{{ row.amount }}</span>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-3">
                        <button v-if="row.originalStatus !== 'pending'"
                            class="flex-1 px-3 py-2 bg-gray-200 text-gray-500 text-xs font-medium rounded-lg cursor-not-allowed"
                            disabled>
                            {{ $t('buttons.cancel') }}
                        </button>
                        <button v-else
                            class="flex-1 px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="loading" @click="cancelItem(row.id)">
                            {{ loading ? `${$t('buttons.cancel')}...` : $t('buttons.cancel') }}
                        </button>
                        <button
                            class="flex-1 px-3 py-2 border border-orange-300 text-orange-300 text-xs font-medium rounded-lg hover:bg-orange-50 transition-all duration-200"
                            @click="viewItem(row.id)">
                            {{ $t('buttons.view') }}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const router = useRouter()
const props = defineProps({
    rows: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['statusChange'])
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Store
const ordersStore = useOrdersStore()
const { loading } = storeToRefs(ordersStore)

// Reactive data
const activeTab = ref('all')

const tabs = ref([
    { id: 'all', name: t('names.all'), status: null },
    { id: 'pending', name: t('page.pending'), status: 'pending' },
    { id: 'accepted', name: t('page.accepted'), status: 'accepted' },
    { id: 'delivering', name: t('names.delivering'), status: 'delivering' },
    { id: 'delivered', name: t('names.delivered'), status: 'delivered' },
    { id: 'completed', name: t('names.completed'), status: 'completed' },
    { id: 'canceled', name: t('names.canceled'), status: 'canceled' }
])

const columns = ref([
    { key: 'status', label: t('names.status') },
    { key: 'product_label', label: t('names.product_label') },
    { key: 'date', label: t('names.date') },
    { key: 'payment_type', label: t('forms.paymentType') },
    { key: 'amount', label: t('names.amount') },
    { key: 'cancel', label: t('names.cancel') },
    { key: 'view', label: t('buttons.view') }
])

// Computed properties
const sourceRows = computed(() => props.rows)

const filteredData = computed(() => {
    return sourceRows.value
})

// Methods
const handleTabChange = (tab) => {
    activeTab.value = tab.id
    emit('statusChange', tab.status)
}
const getStatusClass = (status) => {
    switch (status) {
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
const cancelItem = async (id) => {
    try {
        await ordersStore.cancelOrder(id)
        // Emit event to refresh orders in parent component
        emit('statusChange', null) // This will fetch all orders to refresh the list
    } catch (error) {
        console.error('Error canceling order:', error)
    }
}

const viewItem = (id) => {
    // Navigate to order detail page
    router.push({ name: "OrderDetail", params: { id } })
}

// Lifecycle hooks
onMounted(() => {
    // Initialize animations on mount
})
</script>