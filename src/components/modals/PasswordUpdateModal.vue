<template>
    <!-- Modal Overlay -->
    <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="show"
            class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center"
            @click="$emit('close')">
            <!-- Modal Container -->
            <Transition enter-active-class="transition-transform duration-300 ease-out"
                enter-from-class="translate-y-full sm:scale-95" enter-to-class="translate-y-0 sm:scale-100"
                leave-active-class="transition-transform duration-200 ease-in"
                leave-from-class="translate-y-0 sm:scale-100" leave-to-class="translate-y-full sm:scale-95">
                <div v-show="show"
                    class="bg-white w-[500px] overflow-y-auto px-8 py-4 rounded-[14px] flex flex-col relative"
                    @click.stop>

                    <!-- Header -->
                    <div class="flex items-center justify-center pt-4 pb-5">
                        <h2 class="text-[22px] text-center font-medium text-[#0C1A30]">
                            {{ $t('names.update_password') }}
                        </h2>
                        <button @click="$emit('close')"
                            class="absolute top-8 right-5 flex items-center justify-center bg-[#F6F7F9] rounded-full hover:bg-gray-100">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Content -->
                    <FormSection @submit="handleSubmit" class="space-y-4">

                        <!-- Step 2: OTP Code -->
                        <FormGroup v-if="section === 2">
                            <FormTitle id="otp" :title="$t('names.verification_code')" />
                            <div class="w-full flex justify-between sm:gap-x-4 gap-x-2 pb-3">
                                <input v-for="(_, index) in codeInputs" :key="index" v-model="codeInputs[index]"
                                    @input="handleInput(index)" @keydown.backspace="handleBackspace(index)"
                                    maxlength="1" :ref="el => inputRefs[index] = el"
                                    class="w-full h-14 text-center text-base font-sf_pro font-medium text-black rounded-lg bg-[#F6F7F9] focus:outline-none focus:ring-1 focus:ring-[#FEB918] focus:bg-white"
                                    type="text" inputmode="numeric" />
                            </div>

                            <!-- Timer or Resend -->
                            <div class="flex items-center flex-col justify-center pt-3">
                                <span class="text-sm font-medium text-black pb-2">
                                    {{ formattedTime }}
                                </span>

                                <button type="button" @click="resetTimer"
                                    class="text-[#037D84] text-sm hover:underline font-medium">
                                    {{ $t('buttons.resend') }}
                                </button>
                            </div>

                        </FormGroup>

                        <!-- Step 1: New Password -->
                        <FormGroup v-if="section === 1">
                            <FormTitle id="new_password" :title="$t('forms.password')" />
                            <div class="relative">
                                <FormInput v-model="formData.new_password" label="new_password"
                                    :type="showPassword ? 'text' : 'password'" placeholder="•••••••••" />
                                <button @click="togglePassword(1)"
                                    class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                    type="button">
                                    <eye-icon v-if="!showPassword" />
                                    <eye_hide-icon v-else />
                                </button>
                            </div>
                        </FormGroup>

                        <!-- Step 1: Confirm Password -->
                        <FormGroup v-if="section === 1">
                            <FormTitle id="confirm_password" :title="$t('names.verify_password')" />
                            <div class="relative">
                                <FormInput v-model="formData.confirm_password" label="confirm_password"
                                    :type="showConfirmPassword ? 'text' : 'password'" placeholder="•••••••••" />
                                <button @click="togglePassword(2)"
                                    class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                    type="button">
                                    <eye-icon v-if="!showConfirmPassword" />
                                    <eye_hide-icon v-else />
                                </button>
                            </div>
                        </FormGroup>
                    </FormSection>

                    <!-- Footer Button -->
                    <button @click="handleSubmit" :disabled="loading || !isCodeComplete && section === 2"
                        class="w-full mt-6 bg-[#FEB918] text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-500 transition-colors transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
                        {{ loading ? $t('buttons.udpating') : $t('buttons.update') }}
                    </button>
                </div>
            </Transition>

            <div class="fixed sm:top-4 top-0 sm:right-4 right-0 z-50 space-y-2">
                <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="removeToast(toast.id)" />
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const { sendOtp: sendOtpApi, resetPassword: resetPasswordApi } = authStore
const { toasts, removeToast, handleApiError } = useToast()

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close', 'submit'])

const timer = ref(60)
const timerInterval = ref(null)
const isTimerActive = ref(false)
const codeInputs = ref(["", "", "", "", ""])
const inputRefs = ref([]);

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const section = ref(1)
const loading = ref(false)
const otpLoading = ref(false)

const formData = ref({
    identifier: String(authStore.user.phone_number).trim() || String(authStore.user.email).trim(),
    otp: '',
    new_password: '',
    confirm_password: ''
})

const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60);
    const seconds = timer.value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
})

const isCodeComplete = computed(() => {
    return codeInputs.value.every((digit) => digit !== "");
})

const startTimer = () => {
    timerInterval.value = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;
        } else {
            isTimerActive.value = false;
            clearInterval(timerInterval.value);
        }
    }, 1000);
}

const resetTimer = async () => {
    await authStore.sendOtp({ identifier: String(formData.value.identifier).trim(), purpose: "registration" })
    timer.value = 60;
    isTimerActive.value = true;
    clearInterval(timerInterval.value);
    startTimer();
}

const handleInput = (index) => {
    const currentInput = codeInputs.value[index];
    if (!/^\d$/.test(currentInput)) {
        codeInputs.value[index] = "";
        return;
    }
    if (index < codeInputs.value.length - 1) {
        inputRefs.value[index + 1]?.focus();
    }
}
const handleBackspace = (index) => {
    if (codeInputs.value[index] === "" && index > 0) {
        inputRefs.value[index - 1]?.focus();
    }
}

// 🔹 Send OTP
const sendOtp = async () => {
    otpLoading.value = true
    try {
        await sendOtpApi({ identifier: formData.value.identifier, purpose: 'reset_password' })
        isTimerActive.value = true
        startTimer()
    } catch (e) {
        console.error('OTP send failed:', e)
    } finally {
        otpLoading.value = false
    }
}

// 🔹 Handle form submit
const handleSubmit = async () => {
    if (section.value === 1 && formData.value.new_password.length < 8) {
        handleApiError($t('warning.error'), $t('warning.password_length'))
        return
    }
    if (formData.value.new_password !== formData.value.confirm_password) {
        handleApiError($t('warning.error'), $t('warning.password_mismatch'))
        return
    }
    if (section.value === 2 && !isCodeComplete.value) {
        handleApiError($t('warning.error'), $t('warning.otp_length'))
        return
    }

    // Step 1 → send OTP
    if (section.value === 1) {
        section.value = 2
        sendOtp()
        return
    }

    // Step 2 → verify OTP and reset password
    try {
        loading.value = true
        await resetPasswordApi({
            identifier: String(formData.value.identifier).trim(),
            otp: [...codeInputs.value].join(''),
            new_password: formData.value.new_password
        })
        emit('submit', true)
    } catch (e) {
        console.error('Password reset failed:', e)
        emit('submit', false)
    } finally {
        loading.value = false
    }
}

const togglePassword = (id) => {
    if (id === 1) showPassword.value = !showPassword.value
    else showConfirmPassword.value = !showConfirmPassword.value
}

// Reset form when modal closes
watch(() => props.show, (newVal) => {
    if (!newVal) {
        formData.value = {
            identifier: '',
            otp: '',
            new_password: '',
            confirm_password: ''
        }
    }
})

onUnmounted(() => {
    clearInterval(timerInterval.value)
})
</script>