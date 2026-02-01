<template>
    <article class="flex-shrink-0 relative cursor-pointer group" @click="$emit('toggle')">
        <div :class="[
            'relative px-4 py-3 rounded-2xl border-[1px] transition-all duration-300 ease-in-out transform',
            selected
                ? 'border-[#FEB918] bg-[#FEB9180D]'
                : 'border-[#EDEDED] bg-white hover:shadow-sm'
        ]">
            <!-- Radio Circle -->
            <div class="absolute top-4 right-4">
                <div :class="[
            'w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center',
            selected
                ? 'border-[#FEB918] border-4 bg-[#FEB9180D]'
                : 'border-[#EDEDED] border-2 bg-white group-hover:border-[#FEB918]'
        ]">
                    <div v-if="selected" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
            </div>

            <!-- Content -->
            <div class="pr-8">
                <div class="w-7 h-7 rounded-full flex items-center justify-center" :style="{ backgroundColor: icon.bg_color }">
                    <component :is="icons[icon?.name]" :size="icon?.size" :color="icon?.color" />
                </div>
                <h2 :class="[
            'transition-colors duration-300 mt-5 sm:text-base text-sm text-nowrap',
            selected ? 'bg-gradient-to-r from-[#FF6F00] to-[#FEB918] bg-clip-text text-transparent' : 'text-[#0C1A30]'
        ]">
                    {{ title }}
                </h2>
            </div>
        </div>
    </article>
</template>

<script setup>
const { icons, loadIcons } = useIcons()
onMounted(() => { loadIcons() })
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    icon: {
        type: Object,
        default: {}
    },
    selected: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['toggle'])
</script>