<template>
    <!-- Modal Backdrop -->
    <div v-if="modelValue"
        class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
        @click="$emit('update:modelValue', false)">
        <!-- Modal Content -->
        <div class="relative bg-white rounded-[14px] w-full sm:max-w-md sm:mx-auto mx-2 transform transition-all duration-300 ease-out"
            @click.stop>

            <MainContainer class="pb-8">
                <!-- Header -->
                <div class="pt-6 pb-8 flex items-center justify-between">
                    <!-- Modal title -->
                    <h1 class="sm:text-[22px] text-lg font-semibold text-[#0C1A30]">
                        {{ $t('footer.contact') }}
                    </h1>
                    <!-- Close Button -->
                    <button @click="$emit('update:modelValue', false)"
                        class="w-[38px] h-[38px] rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200">
                        <close-icon />
                    </button>
                </div>

                <!-- Phones -->
                <div class="grid grid-cols-2 gap-x-6">
                    <a v-for="(item, index) in contact?.phone_numbers" :key="index" :href="`tel:${item}`"
                        class="px-6 py-3 mb-2 bg-[#F6F7F9] rounded-lg flex items-center space-x-1">
                        <phone-icon :color="'#037D84'" :size="16" class="flex-shrink-0" />
                        <span class="font-medium text-[#222222] sm:text-base text-sm">
                            {{ item }}
                        </span>
                    </a>
                </div>

                <!-- Email -->
                <div class="space-y-4 mt-10">
                    <h1 class="sm:text-lg text-base font-semibold text-[#0C1A30]">
                        {{ $t('forms.email') }}
                    </h1>
                    <a :href="`mailto:${contact?.email}`"
                        class="px-6 py-3 bg-[#F6F7F9] rounded-lg flex items-center space-x-3">
                        <mail-icon :color="'#FA004C'" :size="16" class="flex-shrink-0" />
                        <span class="font-medium text-[#222222] sm:text-base text-sm">
                            {{ contact?.email }}
                        </span>
                    </a>
                </div>

                <!-- Addresses -->
                <div class="space-y-4 mt-10">
                    <h1 class="sm:text-lg text-base font-semibold text-[#0C1A30]">
                        {{ $t('names.adresses') }}
                    </h1>
                    <div v-for="(address, index) in contact?.addresses" :key="index"
                        class="px-6 py-3 bg-[#F6F7F9] rounded-lg flex items-center space-x-3">
                        <map_pin-icon :color="'#FEB918'" :size="16" class="flex-shrink-0" />
                        <span class="font-medium text-[#222222] sm:text-base text-sm">
                            {{ address }}
                        </span>
                    </div>
                </div>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
const contact = ref({})
const contactStore = useContactStore()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})

onMounted(async () => {
    contact.value = await contactStore.fetchContact()
})
</script>