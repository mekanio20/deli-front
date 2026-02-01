<template>
    <div class="flex items-center space-x-3 p-4">
        <!-- Checkbox -->
        <div class="relative flex-shrink-0 mt-1">
            <input :id="id" v-model="isChecked" type="checkbox" class="sr-only"
                @change="$emit('update:modelValue', isChecked)" />
            <label :for="id"
                class="flex items-center justify-center w-6 h-6 border-[1px] rounded-full cursor-pointer transition-all duration-200 ease-in-out"
                :class="[
                isChecked
                    ? 'bg-amber-400 border-amber-400 shadow-md'
                    : 'bg-white border-gray-300 hover:border-gray-400'
            ]">
                <!-- Check Icon -->
                <Transition enter-active-class="transition-all duration-150 ease-out"
                    enter-from-class="scale-0 opacity-0" enter-to-class="scale-100 opacity-100"
                    leave-active-class="transition-all duration-100 ease-in" leave-from-class="scale-100 opacity-100"
                    leave-to-class="scale-0 opacity-0">
                    <svg v-if="isChecked" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </Transition>
            </label>
        </div>

        <!-- Text Content -->
        <div class="flex-1">
            <label :for="id" class="text-gray-900 font-medium text-base leading-[100%] cursor-pointer select-none">
                {{ text }}
            </label>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: () => `checkbox-${Math.random().toString(36).substr(2, 9)}`
    }
})

const emit = defineEmits(['update:modelValue'])

const isChecked = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
    isChecked.value = newValue
})

watch(isChecked, (newValue) => {
    emit('update:modelValue', newValue)
})
</script>