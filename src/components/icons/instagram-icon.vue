<template>
  <svg   viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path d="M14 1C16.76 1 19 3.24 19 6V14C19 16.76 16.76 19 14 19H6C3.24 19 1 16.76 1 14V6C1 3.24 3.24 1 6 1H10H14Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6C12.21 6 14 7.79 14 10C14 12.21 12.21 14 10 14C7.79 14 6 12.21 6 10C6 7.79 7.79 6 10 6Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 20
  },
  color: {
    type: String,
    default: '#DE0045'
  }
})
</script>