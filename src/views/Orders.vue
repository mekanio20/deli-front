<template>
    <div>
        <OrdersSkeleton v-show="loadinPage" />
        <div v-show="!loadinPage" class="bg-white">
            <MainContainer>
                <LinkGroup :items="[{ label: $t('nav.orders'), to: '/account/orders' }]" />
                <SectionTitle :title="$t('nav.orders')" class="pt-6" />
            </MainContainer>
            <!-- Orders Table -->
            <MainContainer class="mt-5">
                <OrdersTable v-if="ordersStore.ordersCount > 0" :rows="tableRows" @statusChange="handleStatusChange" />
                <NoDataSection v-else image="/icons/no_orders.webp" :desc="$t('descriptions.no_orders')" />
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const ordersStore = useOrdersStore()
const { orders, loading } = storeToRefs(ordersStore)
const loadinPage = ref(true)

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

const tableRows = computed(() => {
    return (orders.value || []).map(o => ({
        id: o.id,
        status: o.status_label || getStatusLabel(o.status) || o.status || '',
        originalStatus: o.status, // Keep original status for styling
        document: o.document || o.code || `#${o.id}`,
        date: o.created_at,
        amount: o.total_amount,
        paymentType: o.payment_method,
        date: o.date_created
    }))
})

// Methods
const handleStatusChange = async (status) => {
    const queryParams = status ? { status } : {}
    await ordersStore.fetchOrders(queryParams)
}

onMounted(async () => {
    loadinPage.value = true
    await ordersStore.fetchOrders()
    loadinPage.value = false
})
</script>