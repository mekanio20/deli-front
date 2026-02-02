<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-show="modelValue"
                class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
                @click="$emit('close')">
                <!-- Modal Content -->
                <div class="relative bg-white rounded-[30px] w-full sm:max-w-md sm:mx-auto mx-2 transform transition-all duration-300 ease-out"
                    @click.stop>

                    <!-- Modal Header -->
                    <div class="px-6 sm:py-8 py-6 flex items-end justify-between relative">
                        <!-- Title -->
                        <ModalTitle :title="$t('names.update_password')" />
                        <!-- Close Button -->
                        <button type="button" @click="$emit('close')"
                            class="w-[38px] h-[38px] rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <AuthContainer>
                        <FormSection @submit="handleSubmit" class="space-y-4">
                            <FormGroup>
                                <FormTitle :id="'phone'" :title="$t('forms.phoneNumber')" />
                                <FormInput v-model="phoneNumber" :label="'phone'" type="tel"
                                    placeholder="+993 ********" />
                            </FormGroup>
                            <FormGroup>
                                <FormTitle :id="'new_password'" :title="$t('forms.new_password')" />
                                <div class="relative">
                                    <FormInput v-model="newPassword" :label="'new_password'"
                                        :type="showPassword ? 'text' : 'password'" placeholder="•••••••••" />
                                    <button @click="showPassword = !showPassword"
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                        type="button">
                                        <eye-icon v-if="!showPassword" />
                                        <eye_hide-icon v-else />
                                    </button>
                                </div>
                            </FormGroup>
                            <div class="pt-5">
                                <AuthButton @click="handleSubmit" :title="$t('buttons.continue')"
                                    :isFormValid="formValid" :loading="auth.loading"
                                    :loadingText="$t('buttons.sending')" />
                            </div>
                        </FormSection>
                    </AuthContainer>
                </div>

                <div class="fixed sm:top-4 top-0 sm:right-4 right-0 z-50 space-y-2">
                    <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="removeToast(toast.id)" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const emit = defineEmits(['close', 'redirect'])
defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
})

const { toasts, removeToast } = useToast()
const router = useRouter()
const auth = useAuthStore()

// --- FORM STATE ---
const phoneNumber = ref('+993')
const newPassword = ref('')
const showPassword = ref(false)

const formValid = computed(() => {
    return newPassword.value.length >= 8 && phoneNumber.value.length === 12
})

// --- METHODS ---
const handleSubmit = async () => {
    try {
        localStorage.setItem('reset_password_data', JSON.stringify({
            identifier: String(phoneNumber.value).trim(),
            new_password: String(newPassword.value).trim()
        }))
        await auth.sendOtp({ identifier: String(phoneNumber.value).trim(), purpose: 'reset_password' })
        router.push({ query: { purpose: 'reset_password' } })
        emit('redirect', 'otp')
    } catch (e) {
        console.error(e)
    }
}
</script>