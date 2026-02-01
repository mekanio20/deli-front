<template>
  <svg   viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<rect width="38" height="38" rx="19" fill="#DE0045"/>
<path d="M14 17V20.5M24 17V20.5M12.5 24H25.5C26.3284 24 27 23.3284 27 22.5V15.5C27 14.6716 26.3284 14 25.5 14H12.5C11.6716 14 11 14.6716 11 15.5V22.5C11 23.3284 11.6716 24 12.5 24ZM21 19C21 20.1046 20.1046 21 19 21C17.8954 21 17 20.1046 17 19C17 17.8954 17.8954 17 19 17C20.1046 17 21 17.8954 21 19Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 38
  },
  color: {
    type: String,
    default: 'white'
  }
})
</script>