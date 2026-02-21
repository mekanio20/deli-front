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
                        <ModalTitle :title="$t('forms.create_account')" />
                        <!-- Close Button -->
                        <button type="button" @click="$emit('close')"
                            class="w-[38px] h-[38px] rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <AuthContainer>
                        <!-- Phone Tab Content -->
                        <FormSection @submit="handleSubmit" class="space-y-4">
                            <!-- Fullname Field -->
                            <FormGroup>
                                <FormTitle :id="'fullname'" :title="$t('forms.fullname')" />
                                <FormInput v-model="fullname" :label="'fullname'" :placeholder="''" />
                            </FormGroup>

                            <!-- Phone Number Field -->
                            <FormGroup>
                                <FormTitle :id="'phone'" :title="$t('forms.phoneNumber')" />
                                <FormInput v-model="phoneNumber" :label="'phone'" :type="'tel'"
                                    :placeholder="'+993 ********'" />
                            </FormGroup>

                            <!-- Password Field -->
                            <FormGroup class="pb-2">
                                <FormTitle :id="'phone'" :title="$t('forms.password')" />
                                <div class="relative">
                                    <FormInput v-model="password" :label="'phone'"
                                        :type="showPassword ? 'text' : 'password'" :placeholder="'•••••••••'" />
                                    <button @click="showPassword = !showPassword"
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                        type="button">
                                        <eye-icon v-if="!showPassword" />
                                        <eye_hide-icon v-else />
                                    </button>
                                </div>
                            </FormGroup>

                            <!-- Submit Button -->
                            <AuthButton :title="$t('buttons.continue')" :isFormValid="isFormValid"
                                :loading="auth.loading" :loadingText="$t('buttons.sending')" />

                        </FormSection>

                        <!-- Footer Links -->
                        <div @click="$emit('redirect', 'login')" class="flex items-center justify-center pt-8">
                            <div class="flex items-center space-x-1">
                                <span class="text-[#0C1A30] text-sm font-medium transition-colors duration-200">{{
                                    $t('names.already_have_an_account') }}</span>
                                <button
                                    class="text-[#DE0045] hover:text-[#c7003f] hover:underline text-sm font-medium transition-colors duration-200">
                                    {{ $t('buttons.login') }}
                                </button>
                            </div>
                        </div>
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
        required: true
    },
})

const { toasts, removeToast } = useToast()
const router = useRouter()
const auth = useAuthStore()

// Form state
const phoneNumber = ref('+993')
const showPassword = ref(false)
const password = ref('')
const fullname = ref('')

// Computed properties
const isFormValid = computed(() => {
    return phoneNumber.value.length > 10 && password.value.length > 0 &&
        fullname.value.trim().split(' ').length === 2
})

// Methods
const handleSubmit = async () => {
    if (isFormValid.value) {
        try {
            localStorage.setItem('registration_data', JSON.stringify({
                first_name: String(fullname.value).trim()?.split(' ')[0],
                last_name: String(fullname.value).trim()?.split(' ')[1],
                identifier: String(phoneNumber.value).trim(),
                password: String(password.value).trim()
            }))
            await auth.sendOtp({ identifier: String(phoneNumber.value).trim(), purpose: "registration" })
            router.push({ query: { purpose: 'registration' } })
            emit('redirect', 'otp')
        } catch (err) {
            console.error(err)
        }
    }
}
</script>