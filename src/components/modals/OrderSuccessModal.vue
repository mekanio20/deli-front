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
                    class="bg-white w-[500px] overflow-y-auto mx-4 px-8 py-4 rounded-[14px] flex flex-col relative"
                    @click.stop>
                    <!-- Header -->
                    <div class="flex flex-col items-center justify-center pb-5">
                        <div class="sm:w-[187px] w-[150px]">
                            <img src="/icons/success.webp">
                        </div>
                        <div class="flex flex-col space-y-4">
                            <h2 class="sm:text-[24px] text-lg text-center font-medium text-[#0C1A30]">
                                {{ $t('names.thank_you') }}
                            </h2>
                            <p class="sm:text-base text-sm text-center text-[#0C1A30]">
                                {{ $t('descriptions.orders1', { order_number: order_number }) }}
                            </p>
                        </div>
                        <button @click="$emit('close')"
                            class="absolute top-12 right-10 flex items-center justify-center">
                            <close-icon :size="40" />
                        </button>
                    </div>

                    <!-- Content -->
                    <FormSection @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-2">

                    </FormSection>
                    <!-- Footer Button -->
                    <div class="p-4 mx-auto sm:w-fit w-full">
                        <button @click="handleSubmit"
                            class="sm:w-[390px] w-full duration-300 border border-[#FEB918] text-[#FEB918] hover:text-white font-bold py-3 px-4 sm:text-base text-sm rounded-lg hover:bg-[#FEB918] transition-colors">
                            {{ $t('buttons.download_fakt') }}
                        </button>
                    </div>
                </div>
            </Transition>

            <div class="fixed sm:top-4 top-0 sm:right-4 right-0 z-50 space-y-2">
                <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="removeToast(toast.id)" />
            </div>
        </div>
    </Transition>
</template>

<script setup>
const { toasts, removeToast } = useToast()
const props = defineProps({ show: Boolean, order_number: [Number, String] })
const emit = defineEmits(['close', 'submit'])
const handleSubmit = () => {
    emit('submit', props.order_number)
}
</script>