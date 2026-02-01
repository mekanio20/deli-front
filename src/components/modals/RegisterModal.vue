<template>
    <!-- Modal Backdrop -->
    <div v-if="modelValue"
        class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
        @click="$emit('close', false)">
        <!-- Modal Content -->
        <div class="relative bg-white rounded-[14px] w-full sm:max-w-md sm:mx-auto mx-2 transform transition-all duration-300 ease-out"
            @click.stop>

            <!-- Close Button -->
            <button @click="$emit('close', false)"
                class="w-[38px] h-[38px] absolute top-[30px] right-4 rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                <close-icon />
            </button>

            <!-- Background decorative element -->
            <div class="absolute top-16 right-0 -z-10 overflow-hidden rounded-tr-2xl">
                <div class="w-[100px]">
                    <img src="/icons/bg-1.webp" />
                </div>
            </div>

            <!-- Modal Header -->
            <div class="px-6 sm:py-8 py-6 text-center">
                <!-- Title -->
                <ModalTitle :title="$t('names.welcome')" />
                <!-- Subtitle -->
                <h2 class="text-[#0C1A30] text-start font-medium">{{ $t('forms.create_account') }}</h2>
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <!-- Phone Tab Content -->
                <FormSection @submit="handleSubmit" class="space-y-4">
                    <!-- Firstname Field -->
                    <FormGroup>
                        <FormTitle :id="'firstname'" :title="$t('forms.name')" />
                        <FormInput v-model="firstname" :label="'firstname'" :placeholder="''" />
                    </FormGroup>

                    <!-- Lastname Field -->
                    <FormGroup>
                        <FormTitle :id="'lastname'" :title="$t('forms.surname')" />
                        <FormInput v-model="lastname" :label="'lastname'" :placeholder="''" />
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
                            <FormInput v-model="password" :label="'phone'" :type="showPassword ? 'text' : 'password'"
                                :placeholder="'•••••••••'" />
                            <button @click="showPassword = !showPassword"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                type="button">
                                <eye-icon v-if="!showPassword" />
                                <eye_hide-icon v-else />
                            </button>
                        </div>
                    </FormGroup>

                    <!-- Submit Button -->
                    <AuthButton :title="$t('buttons.continue')" :isFormValid="isFormValid" :loading="auth.loading"
                        :loadingText="$t('buttons.sending')" />

                </FormSection>

                <!-- Footer Links -->
                <div @click="redirectLogin" class="flex items-center justify-center pt-8">
                    <div class="flex items-center space-x-1">
                        <span class="text-[#0C1A30] text-sm font-medium transition-colors duration-200">{{
                            $t('names.already_have_an_account') }}</span>
                        <button
                            class="text-[#037D84] hover:text-[#2d989e] hover:underline text-sm font-medium transition-colors duration-200">
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
</template>

<script setup>
const { toasts, removeToast } = useToast()
defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
})
const emit = defineEmits(['close', 'redirect'])
const auth = useAuthStore()

// Form state
const phoneNumber = ref('+993')
const showPassword = ref(false)
const password = ref('')
const firstname = ref('')
const lastname = ref('')

// Computed properties
const isFormValid = computed(() => {
    return phoneNumber.value.length > 10 && password.value.length > 0 && firstname.value.length > 0 && lastname.value.length > 0
})

// Methods
const handleSubmit = async () => {
    if (isFormValid.value) {
        try {
            const otp = await auth.sendOtp({ identifier: String(phoneNumber.value).trim(), purpose: "registration" })
            if (otp.status === "ok") {
                emit('send_otp', {
                    first_name: firstname.value,
                    last_name: lastname.value,
                    identifier: String(phoneNumber.value).trim(),
                    password: password.value
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
}

const redirectLogin = () => {
    emit('login')
}
</script>