<template>
    <!-- Modal Backdrop -->
    <div v-if="modelValue"
        class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
        @click="$emit('update:modelValue', false)">
        <!-- Modal Content -->
        <div class="relative bg-white rounded-[14px] w-full sm:max-w-md sm:mx-auto mx-2 transform transition-all duration-300 ease-out"
            @click.stop>

            <!-- Close Button -->
            <button @click="$emit('update:modelValue', false)"
                class="w-[38px] h-[38px] absolute top-[30px] right-4 rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                <close-icon />
            </button>

            <!-- Background decorative element -->
            <div class="absolute top-14 right-0 -z-10 overflow-hidden rounded-tr-2xl">
                <div class="w-[100px]">
                    <img src="/icons/bg-1.webp" />
                </div>
            </div>

            <!-- Modal Header -->
            <div class="px-6 pt-8 pb-8 text-center">
                <!-- Title -->
                <ModalTitle :title="$t('names.verify_user')" />
                <!-- Subtitle -->
                <h2 class="text-[#0C1A30] text-start font-medium">{{ $t('names.verification_code') }}</h2>
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <FormSection @submit="handleSubmit" class="space-y-5">
                    <!-- Phone Number Field -->
                    <FormGroup>
                        <FormTitle :id="'code'" :title="$t('names.enter_code')" />
                        <div class="w-full flex justify-between sm:gap-x-4 gap-x-2 pb-3">
                            <input v-for="(_, index) in codeInputs" :key="index" v-model="codeInputs[index]"
                                @input="handleInput(index)" @keydown.backspace="handleBackspace(index)" maxlength="1"
                                :ref="el => inputRefs[index] = el"
                                class="w-full h-14 text-center text-base font-sf_pro font-medium text-black rounded-lg bg-[#F6F7F9] focus:outline-none focus:ring-1 focus:ring-[#FEB918] focus:bg-white"
                                type="text" inputmode="numeric" />
                        </div>
                    </FormGroup>

                    <div class="w-full">
                        <div class="flex items-center flex-col justify-center pb-5">
                            <span class="text-sm font-medium">
                                {{ formattedTime }}
                            </span>
                            <button @click="resetTimer" class="text-yellow-500 hover:underline cursor-pointer pb-2">
                                {{ $t('forms.resend_otp') }}
                            </button>
                        </div>

                        <!-- Submit Button -->
                        <AuthButton :title="$t('page.login')" :isFormValid="isCodeComplete" :loading="auth.loading"
                            :loadingText="$t('buttons.confirmation')" />
                    </div>

                </FormSection>
            </AuthContainer>
        </div>

        <div class="fixed sm:top-4 top-0 sm:right-4 right-0 z-50 space-y-2">
            <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="removeToast(toast.id)" />
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const { toasts, removeToast } = useToast()
const auth = useAuthStore()
const emit = defineEmits(['update:modelValue', 'success'])
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})

// Form state
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

// Methods
const handleSubmit = async () => {
    if (isCodeComplete.value) {
        try {
            const response = await auth.register({ ...props.data, otp: [...codeInputs.value].join('') })
            if (response.status === "ok") {
                emit('update:modelValue', false)
                emit('success', true)
                isTimerActive.value = true
                startTimer()
            }
        } catch (err) {
            console.error(err)
            emit('success', false)
        }
    }
}

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
    await auth.sendOtp({ identifier: String(props.data.identifier).trim(), purpose: "reset_password" })
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

onUnmounted(() => {
    clearInterval(timerInterval.value);
})
</script>