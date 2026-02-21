<template>
    <div class="bg-white pb-10">
        <MainContainer>
            <LinkGroup :items="[{ label: `${$t('nav.account')}`, to: '/account' }]" />
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Sidebar -->
                <aside class="lg:col-span-1 bg-[#F5F5F7] rounded-2xl">
                    <div class="p-6 animate-fade-in">
                        <nav class="space-y-1">
                            <!-- Account Information -->
                            <button type="button" @click="activeSection = 'info'"
                                class="w-full flex items-center gap-4 px-4 py-3 rounded-full transition-all duration-300"
                                :class="activeSection === 'info' ? 'text-[#DE0045] font-bold' : 'text-[#0C1A30]'">
                                <div
                                    class="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-300">
                                    <profile-icon :color="'#DE0045'" :size="20" />
                                </div>
                                <span>{{ $t('names.account_info') }}</span>
                            </button>

                            <!-- Address -->
                            <button type="button" @click="activeSection = 'address'"
                                class="w-full flex items-center gap-4 px-4 py-3 rounded-full transition-all duration-300"
                                :class="activeSection === 'address' ? 'text-[#DE0045] font-bold' : 'text-[#0C1A30]'">
                                <div
                                    class="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-300">
                                    <map_pin-icon :color="'#DE0045'" :size="20" />
                                </div>
                                <span>{{ $t('names.my_addresses') }}</span>
                            </button>

                            <!-- Change Password -->
                            <button type="button" @click="showPasswordModal = true"
                                class="w-full flex items-center gap-4 px-4 py-3 rounded-full transition-all duration-300">
                                <div
                                    class="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-300">
                                    <lock-icon :color="'#DE0045'" :size="20" />
                                </div>
                                <span>{{ $t('names.update_password') }}</span>
                            </button>

                            <div class="pt-10">
                                <!-- Logout -->
                                <button type="button" @click="showLogoutModal = true"
                                    class="w-full flex items-center gap-4 px-4 py-3 text-[#0C1A30] rounded-full transition-all duration-300">
                                    <div
                                        class="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-300">
                                        <logout_circle-icon :color="'#DE0045'" :size="20" />
                                    </div>
                                    <span>{{ $t('buttons.account_logout') }}</span>
                                </button>
                                <!-- Delete -->
                                <button type="button" @click="showAccountDeleteModal = true"
                                    class="w-full flex items-center gap-4 px-4 py-3 text-[#0C1A30] rounded-full transition-all duration-300">
                                    <div
                                        class="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-300">
                                        <forbidden_circle-icon :color="'#DE0045'" :size="20" />
                                    </div>
                                    <span>{{ $t('buttons.account_delete') }}</span>
                                </button>

                            </div>
                        </nav>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="lg:col-span-2 bg-[#F5F5F7] rounded-2xl">
                    <Transition name="fade" mode="out-in">
                        <!-- Account Information Section -->
                        <div v-if="activeSection === 'info'" key="info" class="p-8 animate-slide-up">
                            <div class="flex items-center gap-4 mb-8">
                                <div class="w-11 h-11 bg-[#DE0045] rounded-full flex items-center justify-center">
                                    <profile-icon :size="20" :color="'white'" />
                                </div>
                                <h2 class="sm:text-2xl text-xl font-semibold text-[#0C1A30]">{{ $t('names.account_info')
                                }}
                                </h2>
                            </div>

                            <form @submit.prevent="handleSaveProfile" class="space-y-6">
                                <!-- Fullname and Phone number -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label class="block text-sm font-medium text-[#838589] mb-2">{{
                                            $t('forms.fullname')
                                        }}</label>
                                        <form-input v-model="profileData.fullname" type="text" bg="white" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-[#838589] mb-2">
                                            {{ $t('forms.phoneNumber') }}
                                        </label>
                                        <form-input disabled v-model="profileData.phone_number" type="tel" bg="white" />
                                    </div>
                                </div>

                                <!-- Email -->
                                <div>
                                    <label class="block text-sm font-medium text-[#838589] mb-2">{{ $t('forms.email')
                                        }}</label>
                                    <form-input disabled v-model="profileData.email" type="text" bg="white" />
                                </div>

                                <!-- Save Button -->
                                <div class="flex items-center justify-center pt-10">
                                    <button type="submit" :disabled="clientStore.loading"
                                        class="px-32 py-4 bg-[#DE0045] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                        <span v-if="!clientStore.loading">{{ $t('buttons.save') }}</span>
                                        <span v-else class="flex items-center justify-center">
                                            <animate_spin-icon />
                                            {{ $t('buttons.loading') }}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Address Section -->
                        <div v-else-if="activeSection === 'address'" key="address" class="p-8 animate-slide-up">
                            <div class="flex items-center gap-4 mb-8">
                                <div class="w-11 h-11 bg-[#DE0045] rounded-full flex items-center justify-center">
                                    <map_pin-icon :size="20" :color="'white'" />
                                </div>
                                <h2 class="sm:text-2xl text-xl font-semibold text-[#0C1A30]">{{ $t('names.my_addresses')
                                }}
                                </h2>
                            </div>

                            <div class="space-y-6">

                                <NoDataSection v-if="addressesStore.addressesCount === 0 && !addressesStore.loading"
                                    :image="'/icons/location.webp'" class="!py-0" />

                                <div v-else class="flex flex-col space-y-10">
                                    <div v-if="activeAddress" class="space-y-3">
                                        <label class="block text-sm font-medium text-[#838589]">{{
                                            $t('names.fixed_address')
                                        }}</label>
                                        <div class="flex items-center space-x-3">
                                            <form-input disabled class="flex-1" v-model="activeAddress.address" type="text" bg="white" />
                                            <button type="button" @click="addressEditModal(activeAddress)"
                                                class="w-[55px] h-[55px] rounded-[14px] bg-white hover:bg-[#FFA10033] duration-200 flex items-center justify-center">
                                                <edit-icon :color="'#FFA100'" />
                                            </button>
                                            <button type="button" @click="addressDeleteModal(activeAddress.id)"
                                                class="w-[55px] h-[55px] rounded-[14px] bg-white hover:bg-[#DE004533] duration-200 flex items-center justify-center">
                                                <delete-icon :color="'#DE0045'" />
                                            </button>
                                        </div>
                                    </div>
                                    <div v-if="addressesStore.addresses.filter(address => !address.is_primary).length > 0" class="space-y-3">
                                        <label class="block text-sm font-medium text-[#838589]">{{
                                                $t('names.my_addresses')
                                            }}</label>
                                        <div v-for="(item, index) in addressesStore.addresses.filter(address => !address.is_primary)" :key="index" class="space-y-3">
                                            <div class="flex items-center space-x-3">
                                                <form-input disabled class="flex-1" v-model="item.address" type="text" bg="white" />
                                                <button type="button" @click="addressEditModal(item)"
                                                    class="w-[55px] h-[55px] rounded-[14px] bg-white hover:bg-[#FFA10033] duration-200 flex items-center justify-center">
                                                    <edit-icon :color="'#FFA100'" />
                                                </button>
                                                <button type="button" @click="addressDeleteModal(item.id)"
                                                    class="w-[55px] h-[55px] rounded-[14px] bg-white hover:bg-[#DE004533] duration-200 flex items-center justify-center">
                                                    <delete-icon :color="'#DE0045'" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Save Button -->
                                <div class="flex items-center justify-center pt-5">
                                    <button type="button" @click="showAddressModal = true"
                                        class="px-32 py-4 bg-[#DE0045] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                        <span class="flex items-center justify-center">
                                            <add-icon class="mr-2" />
                                            {{ $t('forms.add_address') }}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </main>
            </div>
        </MainContainer>

        <!-- Address Modal -->
        <AddressAddModal :show="showAddressModal" :editingAddress="editingAddress" @submit="handleAddressSubmit"
            @close="() => { showAddressModal = false; editingAddress = null }" />

        <!-- Password Update Modal -->
        <PasswordUpdateModal :show="showPasswordModal" @submit="showPasswordModal = false"
            @close="showPasswordModal = false" />

        <!-- Logout Modal -->
        <ConfirmModal v-show="showLogoutModal" @confirm="logoutUser" @cancel="showLogoutModal = false"
            :title="$t('buttons.logout')" :button_name="$t('buttons.yes')" :button_color="'red'"
            :icon="'/icons/danger.webp'" />

        <!-- Delete Account Modal -->
        <ConfirmModal v-show="showAccountDeleteModal" @confirm="deleteAccount" @cancel="showAccountDeleteModal = false"
            :title="$t('buttons.delete_your_account')" :button_name="$t('buttons.delete')" :button_color="'red'"
            :icon="'/icons/danger.webp'" />

        <!-- Delete Address Modal -->
        <ConfirmModal v-show="showAddressDeleteModal" @confirm="deleteAddress" @cancel="showAddressDeleteModal = false"
            :title="$t('buttons.address_delete')" :button_name="$t('buttons.delete')" :button_color="'red'"
            :icon="'/icons/danger.webp'" />
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { success } = useToast()
const router = useRouter()
const authStore = useAuthStore()
const clientStore = useClientStore()
const addressesStore = useClientAddressesStore()

const isMobile = ref(false)
const activeSection = ref('info')
const showAddressModal = ref(false)
const showPasswordModal = ref(false)
const showLogoutModal = ref(false)
const showAddressDeleteModal = ref(false)
const showAccountDeleteModal = ref(false)
const deleteAddressId = ref(null)
const editingAddress = ref(null)

const profileData = reactive({
    id: null,
    fullname: '',
    email: '',
    phone_number: ''
})

const activeAddress = computed(() => {
    const active = addressesStore.addresses.find(address => address.is_primary)
    return active ? active : ''
})

const addressDeleteModal = (addressId) => {
    deleteAddressId.value = addressId
    showAddressDeleteModal.value = true
}

const addressEditModal = (address) => {
    editingAddress.value = address
    showAddressModal.value = true
}

const deleteAddress = async () => {
    try {
        await addressesStore.deleteAddress(deleteAddressId.value)
        showAddressDeleteModal.value = false
        deleteAddressId.value = null
        success(t('success.address_remove'))
    } catch (e) {
        console.log(e);
    }
}

const handleAddressSubmit = async (addressData) => {
    try {
        if (editingAddress.value) {
            // Edit mode
            await addressesStore.updateAddress(editingAddress.value.id, addressData)
            success(t('success.address_update'))
        } else {
            // Add mode
            await addressesStore.createAddress({
                ...addressData,
                address: addressData.address || `${addressData.street} ${addressData.building_number} ${addressData.house_number} ${addressData.floor}`
            })
            success(t('success.address_add'))
        }
        showAddressModal.value = false
        editingAddress.value = null
    } catch (e) {
        console.log(e);
    }
}

const handleSaveProfile = async () => {
    const updateData = {
        first_name: profileData.fullname?.split(' ')?.[0],
        last_name: profileData.fullname?.split(' ')?.[1]
    }
    await clientStore.updateAccount(profileData.id, updateData)
    success(t('success.account_update'))
}

const logoutUser = async () => {
    await authStore.logout()
    router.push({ name: "Home" });
}

const deleteAccount = async () => {
    await clientStore.deleteAccount(profileData.id)
    showAccountDeleteModal.value = false
}

const initialData = () => {
    profileData.id = clientStore.account.id
    profileData.fullname = `${clientStore.account.first_name} ${clientStore.account.last_name}`
    profileData.phone_number = clientStore.account.phone_number
    profileData.email = clientStore.account.email
}

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 640
}

onMounted(async () => {
    await clientStore.fetchAccount()
    await addressesStore.fetchAddresses()
    initialData()
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})

</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
    animation: slideUp 0.3s ease-out;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>