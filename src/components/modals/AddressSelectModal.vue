<template>
    <!-- Modal Overlay -->
    <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="show" class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center"
            @click="$emit('close')">
            <!-- Modal Container -->
            <Transition enter-active-class="transition-transform duration-300 ease-out"
                enter-from-class="translate-y-full sm:scale-95" enter-to-class="translate-y-0 sm:scale-100"
                leave-active-class="transition-transform duration-200 ease-in"
                leave-from-class="translate-y-0 sm:scale-100" leave-to-class="translate-y-full sm:scale-95">
                <div v-show="show"
                    class="bg-white w-[700px] mx-4 overflow-y-auto px-12 py-10 rounded-[14px] flex flex-col relative"
                    @click.stop>
                    <!-- Header -->
                    <div class="flex items-center justify-center pb-10">
                        <h2 class="text-[22px] text-center font-medium text-[#0C1A30]">{{ $t('forms.add_address') }}</h2>
                        <button @click="$emit('close')"
                            class="absolute top-10 right-12 flex items-center justify-center bg-[#F6F7F9] rounded-full hover:bg-gray-100">
                            <close-icon />
                        </button>
                    </div>

                    <div v-if="loading" class="flex items-center justify-center py-8">
                        <div class="text-gray-500">{{ $t('names.addresses_loading') }}</div>
                    </div>
                    <div v-else class="flex flex-col space-y-10">
                        <div v-if="fixedAddress?.id" class="flex flex-col space-y-3">
                            <h4 class="text-sm text-[#838589]">
                                {{ $t('names.fixed_address') }}
                            </h4>
                            <div class="flex items-center justify-between rounded-lg border p-3 cursor-pointer"
                                @click="selectAddress(fixedAddress?.id)"
                                :class="fixedAddress?.id === selectedAddressId ? 'border-[#FEB918] bg-[#FEB9180D]' : 'border-[#EDEDED]'">
                                <h5
                                    :class="fixedAddress?.id === selectedAddressId ? 'text-[#FEB918] font-semibold' : 'text-[#0C1A30]'">
                                    {{ fixedAddress.address }}</h5>
                                <!-- Radio Circle -->
                                <div :class="[
                                    'w-[22px] h-[18px] ml-2 rounded-full transition-all duration-300 flex items-center justify-center',
                                    fixedAddress.id === selectedAddressId
                                        ? 'border-[#FEB918] border-4 bg-[#FEB9180D]'
                                        : 'border-[#EDEDED] border-2 bg-white group-hover:border-[#FEB918]'
                                ]">
                                    <div v-if="fixedAddress.id === selectedAddressId"
                                        class="w-[8px] h-[8px] bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-3">
                            <h4 class="text-sm text-[#838589]">
                                {{ $t('forms.address') }}
                            </h4>
                            <div v-if="filteredAddress.length === 0 && !loading" class="text-center text-gray-500 py-4">
                                {{ $t('names.no_address') }}
                            </div>
                            <div v-for="item in filteredAddress" :key="item.id" @click="selectAddress(item.id)"
                                :class="item.id === selectedAddressId ? 'border-[#FEB918] bg-[#FEB9180D]' : 'border-[#EDEDED]'"
                                class="flex items-center justify-between rounded-lg border p-3 cursor-pointer">
                                <h5
                                    :class="item.id === selectedAddressId ? 'text-[#FEB918] font-semibold' : 'text-[#0C1A30]'">
                                    {{ item.address }}</h5>
                                <!-- Radio Circle -->
                                <div :class="[
                                    'w-[22px] h-[18px] ml-2 rounded-full transition-all duration-300 flex items-center justify-center',
                                    item.id === selectedAddressId
                                        ? 'border-[#FEB918] border-4 bg-[#FEB9180D]'
                                        : 'border-[#EDEDED] border-2 bg-white group-hover:border-[#FEB918]'
                                ]">
                                    <div v-if="item.id === selectedAddressId"
                                        class="w-[8px] h-[8px] bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Button -->
                    <div class="flex items-center justify-center gap-4 mt-14">
                        <button @click="$emit('addAddress')"
                            class="flex-1 flex items-center justify-center gap-4 font-semibold border border-[#FBBF24] text-[#FBBF24] px-4 py-3 rounded-lg hover:bg-[#FFF8E1] transition">
                            <!-- Icon -->
                            <add-icon color="#FBBF24" />
                            <span>{{ $t('forms.add_address') }}</span>
                        </button>

                        <button @click="handleSubmit" :disabled="!selectedAddressId || loading"
                            class="flex-1 bg-[#007B83] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#00666B] transition disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ loading ? $t('buttons.loading') : $t('buttons.continue') }}
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
const emit = defineEmits(['close', 'submit', 'addAddress'])
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})

// Store integration
const addressesStore = useClientAddressesStore()
const { addresses, loading } = storeToRefs(addressesStore)
const { fetchAddresses } = addressesStore

// Local state
const selectedAddressId = ref(null)

// Methods
const selectAddress = (addressId) => {
    selectedAddressId.value = addressId
}

const handleSubmit = () => {
    emit('submit', avtiveAddress.value)
}

// Computed
const avtiveAddress = computed(() => {
    const address = addresses.value.find((address) => address.id === selectedAddressId.value)
    return address ? address : {}
})

const fixedAddress = computed(() => {
    const address = addresses.value.find((address) => address.is_primary === true)
    return address ? address : {}
})

const filteredAddress = computed(() => {
    return addresses.value.filter((address) => address.is_primary !== true)
})

// Lifecycle
onMounted(async () => {
    if (addresses.value.length === 0) {
        await fetchAddresses()
    }
})

// Watch for modal opening to refresh addresses
watch(() => props.show, async (newVal) => {
    if (newVal && addresses.value.length === 0) {
        await fetchAddresses()
    }
})
</script>