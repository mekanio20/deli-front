<template>
    <!-- Modal Backdrop -->
    <div v-if="modelValue"
        class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
        @click="$emit('update:modelValue', false)">
        <!-- Modal Content -->
        <div class="relative bg-white rounded-[14px] w-full sm:max-w-md sm:mx-auto mx-2 transform transition-all duration-300 ease-out"
            @click.stop>
            <!-- Close Button -->
            <button @click="closeModal"
                class="w-[38px] h-[38px] absolute top-[30px] right-4 rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                <close-icon />
            </button>

            <!-- Decorative background -->
            <div class="absolute top-16 right-0 -z-10 overflow-hidden rounded-tr-2xl">
                <div class="w-[100px]">
                    <img src="/icons/bg-1.webp" />
                </div>
            </div>

            <!-- Modal Header -->
            <div class="px-6 pt-8 text-center">
                <ModalTitle :title="step === 'request' ? $t('names.update_password') : $t('buttons.confirm')" />
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <FormSection @submit="handleSubmit" class="space-y-4">
                    <!-- Step 1: Request OTP -->
                    <template v-if="step === 'request'">
                        <FormGroup>
                            <FormTitle :id="'phone'" :title="$t('forms.phoneNumber')" />
                            <FormInput v-model="phoneNumber" :label="'phone'" type="tel" placeholder="+993 ********" />
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
                        <AuthButton @click="handleSubmit" :title="$t('buttons.continue')" :isFormValid="formValid"
                            :loading="auth.loading" :loadingText="$t('buttons.sending')" />
                    </template>

                    <!-- Step 2: Confirm OTP -->
                    <template v-else>
                        <FormGroup>
                            <FormTitle id="code" :title="$t('names.enter_code')" />
                            <div class="w-full flex justify-between sm:gap-x-4 gap-x-2 pb-3">
                                <input v-for="(_, index) in codeInputs" :key="index" v-model="codeInputs[index]"
                                    @input="handleInput(index)" @keydown.backspace="handleBackspace(index)"
                                    maxlength="1" :ref="el => inputRefs[index] = el"
                                    class="w-full h-14 text-center text-base font-sf_pro font-medium text-black rounded-lg bg-[#F6F7F9] focus:outline-none focus:ring-1 focus:ring-[#FEB918] focus:bg-white"
                                    type="text" inputmode="numeric" />
                            </div>
                        </FormGroup>

                        <!-- Countdown Timer + Resend -->
                        <div class="flex items-center flex-col justify-center pb-5">
                            <span class="text-sm font-medium text-black pb-2">
                                {{ formattedTime }}
                            </span>

                            <button type="button" @click="resetTimer"
                                class="text-[#037D84] text-sm hover:underline font-medium">
                                {{ $t('buttons.resend') }}
                            </button>
                        </div>

                        <div class="flex items-center justify-between pt-4">
                            <button type="button" @click="resetForm" class="text-sm text-[#0C1A30] hover:underline">
                                {{ $t('buttons.back') }}
                            </button>
                            <div class="w-40">
                                <AuthButton :title="$t('buttons.confirm')" :isFormValid="isCodeComplete"
                                    :loading="auth.loading" :loadingText="$t('buttons.confirmation')" />
                            </div>
                        </div>
                    </template>
                </FormSection>
            </AuthContainer>
        </div>

        <div class="fixed sm:top-4 top-0 sm:right-4 right-0 z-50 space-y-2">
            <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="removeToast(toast.id)" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
const { toasts, removeToast } = useToast()
const auth = useAuthStore()

const emit = defineEmits(['update:modelValue', 'success'])
defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
})

// --- FORM STATE ---
const phoneNumber = ref('+993')
const newPassword = ref('')
const showPassword = ref(false)
const step = ref('request')

// --- TIMER STATE ---
const timer = ref(60)
const timerInterval = ref(null)
const isTimerActive = ref(false)
const codeInputs = ref(["", "", "", "", ""])
const inputRefs = ref([]);

const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60);
    const seconds = timer.value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
})

const isCodeComplete = computed(() => {
    return codeInputs.value.every((digit) => digit !== "");
})

const formValid = computed(() => {
    return newPassword.value.length >= 8 && phoneNumber.value.length === 12
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
    await auth.sendOtp({ identifier: String(phoneNumber.value).trim(), purpose: "reset_password" })
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

// --- METHODS ---
const handleSubmit = async () => {
    try {
        if (step.value === 'request') {
            const res = await auth.sendOtp({ identifier: String(phoneNumber.value).trim(), purpose: 'reset_password' })
            if (res.status === 'ok') {
                step.value = 'confirm'
                isTimerActive.value = true
                startTimer();
            }
        } else {
            const res = await auth.resetPassword({
                identifier: String(phoneNumber.value).trim(),
                otp: [...codeInputs.value].join(''),
                new_password: newPassword.value,
            })
            if (res.status === 'ok') {
                emit('update:modelValue', false)
                emit('success', true)
                resetForm()
            }
        }
    } catch (e) {
        console.error(e)
        emit('success', false)
    }
}

const resetForm = () => {
    step.value = 'request'
    codeInputs.value = ["", "", "", "", ""]
    newPassword.value = ''
}

const closeModal = () => {
    emit('update:modelValue', false)
    resetForm()
}

onUnmounted(() => {
    clearInterval(timerInterval.value)
})
</script>