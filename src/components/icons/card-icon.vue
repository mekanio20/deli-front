<template>
  <svg   viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<rect width="38" height="38" rx="19" fill="#009FE3"/>
<path d="M11.4996 16.7499H26.4996M14.4996 20.2499H16.9996M13 13.25H24.9997C26.1042 13.25 26.9996 14.1447 26.9997 15.2493L26.9999 22.7508C26.9999 23.8554 26.1045 24.75 24.9999 24.75L13.0002 24.7499C11.8957 24.7498 11.0002 23.8545 11.0002 22.7499L11 15.2501C11 14.1455 11.8954 13.25 13 13.25Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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