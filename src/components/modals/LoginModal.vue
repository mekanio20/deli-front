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
                        <ModalTitle :title="$t('page.login')" />
                        <!-- Close Button -->
                        <button type="button" @click="$emit('close')"
                            class="w-[38px] h-[38px] rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Modal Header -->
                    <div class="px-6 text-center">
                        <!-- Tab Navigation -->
                        <div class="flex bg-[#F5F5F7] rounded-full p-1 mb-5">
                            <button :class="['flex-1 py-4 px-10 font-medium rounded-full transition-all duration-200 leading-[100%]',
                                activeTab === 'phone'
                                    ? 'bg-white text-[#0C1A30] shadow-sm'
                                    : 'text-[#838589] hover:text-[#0C1A30]'
                            ]" @click="activeTab = 'phone'">
                                {{ $t('forms.phoneNumber') }}
                            </button>
                            <button :class="['flex-1 py-4 px-10 font-medium rounded-full transition-all duration-200 leading-[100%]',
                                activeTab === 'email'
                                    ? 'bg-white text-[#0C1A30] shadow-sm'
                                    : 'text-[#838589] hover:text-[#0C1A30]'
                            ]" @click="activeTab = 'email'">
                                {{ $t('forms.email') }}
                            </button>
                        </div>
                    </div>

                    <!-- Modal Body -->
                    <AuthContainer>
                        <!-- Phone Tab Content -->
                        <FormSection v-if="activeTab === 'phone'" @submit="handleSubmit" class="space-y-6">
                            <!-- Phone Number Field -->
                            <FormGroup class="pb-3">
                                <FormTitle :id="'phone'" :title="$t('forms.phoneNumber')" />
                                <FormInput v-model="phoneNumber" :label="'phone'" :type="'tel'"
                                    :placeholder="'+993 ********'" />
                            </FormGroup>

                            <!-- Password Field -->
                            <FormGroup class="pb-2">
                                <FormTitle :id="'password'" :title="$t('forms.password')" />
                                <div class="relative">
                                    <FormInput v-model="password" :label="'password'"
                                        :type="showPassword ? 'text' : 'password'" :placeholder="'•••••••••'" />
                                    <button @click="showPassword = !showPassword"
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                        type="button">
                                        <eye-icon v-if="!showPassword" />
                                        <eye_hide-icon v-else />
                                    </button>
                                </div>
                                <div class="flex items-center justify-end mt-3">
                                    <button type="button"
                                        class="text-[#DE0045] hover:text-[#c4003e] hover:underline text-sm font-medium transition-colors duration-200"
                                        @click.stop="$emit('redirect', 'password')">
                                        {{ $t('forms.forgot_password') }}
                                    </button>
                                </div>
                            </FormGroup>

                            <!-- Submit Button -->
                            <AuthButton :title="$t('page.login')" :isFormValid="isFormValid" :loading="auth.loading"
                                :loadingText="$t('buttons.sending')" />

                        </FormSection>

                        <!-- Email Tab Content (placeholder) -->
                        <FormSection v-else @submit="handleSubmit" class="space-y-6">
                            <!-- Email Field -->
                            <FormGroup class="pb-3">
                                <FormTitle :id="'email'" :title="$t('forms.email')" />
                                <FormInput v-model="email" :label="'email'" :type="'email'"
                                    :placeholder="'example@.com'" />
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
                                <div class="flex items-center justify-end mt-3">
                                    <button type="button"
                                        class="text-[#DE0045] hover:text-[#c4003e] hover:underline text-sm font-medium transition-colors duration-200"
                                        @click.stop="$emit('redirect', 'password')">
                                        {{ $t('forms.forgot_password') }}
                                    </button>
                                </div>
                            </FormGroup>

                            <div class="pt-2">
                                <!-- Submit Button -->
                                <AuthButton :title="$t('page.login')" :isFormValid="isFormValid" :loading="auth.loading"
                                    :loadingText="$t('buttons.sending')" />
                            </div>
                        </FormSection>

                        <!-- Footer Links -->
                        <div class="flex items-center justify-center pt-8">
                            <span class="text-sm font-medium text-[#0C1A30] pr-1">Hasabyňyz ýokmy?</span>
                            <button type="button"
                                class="text-[#DE0045] hover:text-[#c7003f] hover:underline text-sm font-medium transition-colors duration-200"
                                @click.stop="$emit('redirect', 'register')">
                                {{ $t('forms.create_account') }}
                            </button>
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
const emit = defineEmits(['redirect', 'close'])
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})

const { toasts, removeToast } = useToast()
const auth = useAuthStore()

// Form state
const activeTab = ref('phone')
const phoneNumber = ref('+993')
const password = ref('')
const email = ref('')
const showPassword = ref(false)

// Computed properties
const isFormValid = computed(() => {
    if (!password.value) return false;

    if (activeTab.value === 'phone') return phoneNumber.value.length > 10;
    if (activeTab.value === 'email') return email.value.length > 0;

    return false;
});

// Methods
const handleSubmit = async () => {
    if (isFormValid.value) {
        try {
            const identifier = String(phoneNumber.value).trim().length === 12 ? phoneNumber.value : email.value
            await auth.login({ username: String(identifier).trim(), password: password.value })
            emit('close')
        } catch (err) {
            console.error(err)
        }
    }
}
</script>