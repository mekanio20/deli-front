
<template>
  <div class="flex items-center space-x-2 rounded-full px-[18px] py-[6px]" :style="{ backgroundColor: bg_color }">
    <component v-if="icon" :is="icons[icon]" :color="icon_color" :size="icon_size" />
    <span class="text-[13px] leading-[25px]" :style="{ color: text_color }">{{ title }}</span>
  </div>
</template>

<script setup>
const { icons, loadIcons } = useIcons()
onMounted(() => { loadIcons() })
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  bg_color: {
    type: String,
    default: 'black'
  },
  text_color: {
    type: String,
    default: 'white'
  },
  icon: {
    type: String,
    default: ''
  },
  icon_color: {
    type: String
  },
  icon_size: {
    type: Number,
    default: 14
  }
})
</script>