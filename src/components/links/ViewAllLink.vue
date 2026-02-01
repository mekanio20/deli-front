<template>
    <router-link :to="to" class="w-fit rounded-full pl-6 pr-1 sm:py-1 flex items-center space-x-2 view-all-link" :style="{ '--bg-color': bg_color }">
        <span class="font-semibold leading-[25px] sm:text-base text-sm text-[#DE0045]" :style="{ color: text_color }">{{ title }}</span>
        <div v-if="isIcon" class="w-[33px] h-[33px] rounded-full flex items-center justify-center bg-[#DE0045]">
            <arrow_right-icon :color="icon_color" />
        </div>
    </router-link>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    bg_color: {
        type: String,
        default: ''
    },
    text_color: {
        type: String,
        default: '#DE0045'
    },
    isIcon: {
        type: Boolean,
        default: false
    },
    icon_color: {
        type: String,
        default: '#DE0045'
    }
})
</script>

<style scoped>
.view-all-link {
    background-color: transparent;
}

@media (min-width: 640px) {
    .view-all-link {
        background-color: var(--bg-color);
    }
}
</style>