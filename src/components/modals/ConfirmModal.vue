<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-[14px] shadow-xl p-6 relative flex flex-col items-center sm:space-y-8 space-y-6">
            <!-- Icon -->
            <div class="sm:w-[140px] sm:h-[140px] w-[120px] h-[120px]">
                <img :src="icon" alt="modal-icon" class="w-full h-full object-contain" />
            </div>

            <!-- Title -->
            <h2 class="lg:text-xl sm:text-lg font-bold text-gray-800 text-center sm:w-[330px] w-full">{{ title }}</h2>
            <slot />
            <!-- Buttons -->
            <div class="flex justify-center gap-4">
                <button
                    class="px-8 py-3 bg-[#E5E5E5] text-[#838589] rounded-lg hover:bg-gray-200 transition sm:text-sm text-xs font-medium text-nowrap"
                    @click="$emit('cancel')">
                    {{ $t('buttons.cancel') }}
                </button>

                <button class="px-8 py-3 rounded-lg text-white sm:text-sm text-xs font-semibold transition"
                    :class="resolveButtonColor" @click="$emit('confirm')">
                    {{ button_name }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: String,
    title: {
        type: String
    },
    button_name: {
        type: String
    },
    button_color: {
        type: String,
        default: 'green',
    },
})

const emit = defineEmits(['confirm', 'cancel'])

const resolveButtonColor = computed(() => {
    const colors = {
        green: 'bg-[#1DB954] hover:bg-green-600',
        red: 'bg-[#FA004C] hover:bg-red-600',
        blue: 'bg-[#009FE3] hover:bg-blue-600',
    }
    return colors[props.button_color] || colors.green
})
</script>