<template>
    <div class="relative">
        <component v-if="icon" :is="icons[icon?.name]" :size="icon.size" :color="icon.color"
            class="absolute left-4 top-1/2 -translate-y-1/2" />
        <input :disabled="disabled" :id="label" :type="type" :required="required" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            class="w-full sm:text-base text-sm px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"
            :class="{ 'pl-12': icon?.name, 'cursor-not-allowed': disabled, 'capitalize': capitalize }" />
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
    }
})
</script>