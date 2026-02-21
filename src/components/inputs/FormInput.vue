<template>
    <div class="relative">
        <component v-if="icon" :is="icons[icon?.name]" :size="icon.size" :color="icon.color"
            class="absolute left-4 top-1/2 -translate-y-1/2" />
        <input :disabled="disabled" :id="label" :type="type" :required="required" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            class="w-full text-[#0C1A30] sm:text-base text-sm px-5 py-4 border-0 rounded-2xl focus:ring-1 focus:ring-[#DE0045] focus:bg-white outline-none transition-all duration-200 pr-12"
            :class="{ 'pl-12': icon?.name, 'cursor-not-allowed': disabled, 'capitalize': capitalize }"
            :style="{ 'background-color': bg }" />
    </div>
</template>

<script setup>
const { icons, loadIcons } = useIcons()
onMounted(() => { loadIcons() })
defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: ''
    },
    icon: {
        type: Object,
        default: {}
    },
    disabled: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    capitalize: {
        type: Boolean,
        default: false
    },
    bg: {
        type: String,
        default: '#F5F5F7'
    }
})
</script>