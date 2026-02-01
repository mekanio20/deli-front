<template>
    <div class="min-h-screen bg-white">
        <MainContainer>
            <LinkGroup :items="[{ label: `${$t('nav.account')}`, to: '/account' }]" />
            <SectionTitle :title="$t('names.account_info')" class="pt-6" />

            <!-- Main Content -->
            <div class="grid lg:grid-cols-2 gap-8 sm:py-10 py-6">
                <!-- Left Column - Account Information -->
                <section class="rounded-[10px] border border-[#EDEDED] p-8">
                    <div class="flex items-center sm:space-x-6 space-x-3 mb-10">
                        <div
                            class="sm:w-[50px] w-[40px] sm:h-[50px] h-[40px] rounded-full bg-[#FEB91833] flex items-center justify-center">
                            <user-icon color="#FEB918" :size="isMobile ? 21 : 24" />
                        </div>
                        <h2 class="sm:text-lg font-semibold text-[#0C1A30]">{{ $t('names.account_info') }}</h2>
                    </div>

                    <div class="flex flex-col sm:space-y-10 space-y-4">
                        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4">
                            <!-- Name Field -->
                            <div class="flex flex-col space-y-2">
                                <label for="fullname" class="text-[13px] text-[#838589]">
                                    {{ $t('forms.name') }}
                                </label>
                                <input id="fullname" type="text" v-model="account.first_name"
                                    class="border-none outline-none p-3 sm:text-base text-sm bg-[#F6F7F9] rounded-md">
                            </div>
                            <!-- Phone Field -->
                            <!-- <div class="flex flex-col space-y-2">
                                <label for="phone" class="text-[13px] text-[#838589]">
                                    {{ $t('forms.phoneNumber') }}
                                </label>
                                <input id="phone" type="text" v-model="account.phone_number"
                                    class="border-none outline-none p-3 sm:text-base text-sm bg-[#F6F7F9] rounded-md">
                            </div> -->
                        </div>

                        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4">
                            <!-- Email Field -->
                            <div class="flex flex-col space-y-2">
                                <label for="email" class="text-[13px] text-[#838589]">
                                    {{ $t('forms.email') }}
                                </label>
                                <input id="email" type="email" v-model="account.email"
                                    class="border-none outline-none p-3 sm:text-base text-sm bg-[#F6F7F9] rounded-md">
                            </div>
                        </div>

                        <!-- Save Button -->
                        <button
                            class="sm:w-[353px] w-full mx-auto !sm:mt-16 !mt-10 bg-[#037D84] text-white font-medium py-3 px-4 rounded-lg hover:bg-teal-700 active:bg-teal-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 sm:text-base text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                            :disabled="clientStore.loading" @click="saveAccount">
                            {{ clientStore.loading ? $t('buttons.saved') : $t('buttons.save') }}
                        </button>
                    </div>
                </section>

                <!-- Right Column - Addresses -->
                <section class="rounded-[10px] border border-[#EDEDED] p-8">
                    <div class="flex items-center sm:space-x-6 space-x-3 mb-10">
                        <div
                            class="sm:w-[50px] w-[40px] sm:h-[50px] h-[40px] rounded-full bg-[#DF3DFF33] flex items-center justify-center">
                            <map_pin-icon color="#DF3DFF" :size="isMobile ? 18 : 24" />
                        </div>
                        <h2 class="sm:text-lg font-semibold text-[#0C1A30]">{{ $t('names.my_addresses') }}</h2>
                    </div>

                    <!-- Delivery Address -->
                    <div class="mb-4 grid grid-cols-1 gap-10">
                        <div v-if="addresses.length > 0" class="flex flex-col space-y-2 relative">
                            <label for="address" class="text-[13px] text-[#838589]">
                                {{ $t('names.fixed_address') }}
                            </label>
                            <input id="address" type="text" :value="avtiveAddress"
                                class="border-none outline-none p-3 sm:text-base text-sm bg-[#F6F7F9] rounded-md">
                        </div>
                        <div v-for="(item, index) in addresses" :key="index" class="flex flex-col space-y-2 relative">
                            <label :for="`address` + index" class="text-[13px] text-[#838589]">
                                {{ $t('forms.address') }}
                            </label>
                            <input :id="`address` + index" type="text" v-model="item.address" disabled
                                class="border-none outline-none p-3 pr-20 sm:text-base text-sm bg-[#F6F7F9] rounded-md" />
                            <!-- Edit & Delete Icons -->
                            <div
                                class="absolute right-3 top-[43px] flex items-center space-x-3 transform -translate-y-1/2">
                                <edit-icon class="cursor-pointer" @click="editAddress(item)" />
                                <delete-icon @click="removeAddress(item.id)" class="cursor-pointer" />
                            </div>
                        </div>

                    </div>

                    <!-- Add Address Button -->
                    <button
                        class="sm:w-[239px] w-full !mt-16 bg-[#FEB918] text-white font-medium py-3 px-4 rounded-lg hover:bg-yellow-600 active:bg-yellow-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center sm:text-base text-sm"
                        @click="showModal = true">
                        <add-icon class="mr-2" />
                        {{ $t('forms.add_address') }}
                    </button>
                </section>
            </div>

            <!-- Bottom Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-6 sm:mt-8">
                <button
                    class="flex items-center space-x-4 bg-[#009FE31A] text-[#0C1A30] py-3 px-6 rounded-[10px] transform hover:scale-[1.02] transition-all duration-200"
                    @click="openDictionary">
                    <div class="w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center">
                        <shield-icon />
                    </div>
                    <span class="font-medium sm:text-base text-sm">
                        {{ $t('names.update_password') }}
                    </span>
                </button>

                <button
                    class="flex items-center space-x-4 bg-[#FA004C1A] text-[#FA004C] py-3 px-6 rounded-[10px] transform hover:scale-[1.02] transition-all duration-200"
                    :disabled="authStore.loading" @click="logoutModal = true">
                    <div class="w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center">
                        <logout_circle-icon />
                    </div>
                    <span class="font-medium  sm:text-base text-sm">
                        {{ authStore.loading ? $t('buttons.loading') : $t('buttons.account_logout') }}
                    </span>
                </button>
            </div>
        </MainContainer>
        <!-- Address Modal -->
        <AddressAddModal :show="showModal" :editingAddress="editingAddress" @submit="handleAddressSubmit"
            @close="closeModal" />

        <!-- Password Update Modal -->
        <PasswordUpdateModal :show="showPasswordModal" @submit="showPasswordModal = false" @close="showPasswordModal = false" />

        <!-- Logout Modal -->
        <ConfirmModal v-if="logoutModal" @confirm="logoutUser" @cancel="logoutModal = false"
            :title="$t('buttons.logout')" :button_name="$t('buttons.yes')" :button_color="'red'"
            :icon="'/icons/logout.webp'" />
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const clientStore = useClientStore()
const authStore = useAuthStore()
const addressesStore = useClientAddressesStore()
const { account } = storeToRefs(clientStore)
const { addresses, loading: addressesLoading } = storeToRefs(addressesStore)
const { fetchAccount, updateAccount } = clientStore
const { fetchAddresses, createAddress, updateAddress, deleteAddress } = addressesStore
const { logout, resetPassword } = authStore
const showModal = ref(false)
const showPasswordModal = ref(false)
const isMobile = ref(false)
const router = useRouter()
const logoutModal = ref(false)
const { success } = useToast()

const avtiveAddress = computed(() => {
    const active = addresses.value.find(address => address.is_primary)
    return active ? active.address : ''
})

const saveAccount = async () => {
    try {
        await updateAccount(account.value.id, {
            first_name: account.value.first_name,
            // phone_number: account.value.phone_number,
            email: account.value.email
        })
        success(t('success.account_update'))
        showModal.value = false
    } catch (e) {
        console.log(e);
    }
}

const handleAddressSubmit = async (addressData) => {
    try {
        if (editingAddress.value) {
            // Edit mode
            await updateAddress(editingAddress.value.id, addressData)
            success(t('success.address_update'))
        } else {
            // Add mode
            await createAddress({
                ...addressData,
                address: addressData.address || `${addressData.street} ${addressData.building_number} ${addressData.house_number} ${addressData.floor}`
            })
            success(t('success.address_add'))
        }
        showModal.value = false
        editingAddress.value = null
    } catch (e) {
        console.log(e);
    }
}

const removeAddress = async (addressId) => {
    try {
        await deleteAddress(addressId)
        success(t('success.address_remove'))
    } catch (e) {
        console.log(e);
    }
}

const openDictionary = () => {
    showPasswordModal.value = true
}

const editingAddress = ref(null)

const closeModal = () => {
    showModal.value = false
    editingAddress.value = null
}

const editAddress = (item) => {
    editingAddress.value = { ...item }
    showModal.value = true
}


const logoutUser = async () => {
    try {
        await logout()
    } catch (error) {
        console.log(error);
    } finally {
        logoutModal.value = false
        router.push({ name: "Home" });
    }
}

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 640
}

onMounted(async () => {
    await fetchAccount()
    await fetchAddresses()
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})
</script>