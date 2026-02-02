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
                        <ModalTitle :title="$t('names.verify_user')" />
                        <!-- Close Button -->
                        <button type="button" @click="$emit('close')"
                            class="w-[38px] h-[38px] rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <AuthContainer class="pt-4">
                        <FormSection @submit="handleSubmit" class="space-y-5">
                            <!-- Phone Number Field -->
                            <FormGroup>
                                <FormTitle :id="'code'" :title="$t('names.enter_code')" />
                                <div class="w-full flex justify-between sm:gap-x-4 gap-x-2 pb-3">
                                    <input v-for="(_, index) in codeInputs" :key="index" v-model="codeInputs[index]"
                                        @input="handleInput(index)" @keydown.backspace="handleBackspace(index)"
                                        maxlength="1" :ref="el => inputRefs[index] = el"
                                        class="w-full h-14 text-center text-base font-sf_pro font-medium text-black rounded-lg bg-[#F5F5F7] focus:outline-none focus:ring-1 focus:ring-[#DE0045] focus:bg-white"
                                        type="text" inputmode="numeric" />
                                </div>
                            </FormGroup>

                            <div class="w-full">
                                <div class="flex items-center flex-col justify-center pb-5">
                                    <span class="text-sm font-medium">
                                        {{ formattedTime }}
                                    </span>
                                    <button @click="resetTimer"
                                        class="text-[#DE0045] text-sm hover:text-[#c7003f] hover:underline cursor-pointer pb-2">
                                        {{ $t('forms.resend_otp') }}
                                    </button>
                                </div>

                                <!-- Submit Button -->
                                <AuthButton :title="$t('page.login')" :isFormValid="isCodeComplete"
                                    :loading="auth.loading" :loadingText="$t('buttons.confirmation')" />
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
const emit = defineEmits(['close'])
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

const { toasts, removeToast } = useToast()
const route = useRoute()
const auth = useAuthStore()

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
            const register_data = JSON.parse(localStorage.getItem('registration_data'))
            const reset_data = JSON.parse(localStorage.getItem('reset_password_data'))
            if (route.query.purpose === 'registration') {
                await auth.register({ ...register_data, otp: [...codeInputs.value].join('') })
                localStorage.removeItem('registration_data')
            } else if (route.query.purpose === 'reset_password') {
                await auth.resetPassword({ ...reset_data, otp: [...codeInputs.value].join('') })
                localStorage.removeItem('reset_password_data')
            }
            emit('close')
        } catch (err) {
            console.error(err)
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

watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        isTimerActive.value = true
        startTimer()
    }
})

onUnmounted(() => {
    clearInterval(timerInterval.value);
})
</script>