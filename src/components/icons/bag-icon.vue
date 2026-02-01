<template>
  <svg   viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0632 21.5739H6.01968C2.69779 21.5739 0.14935 20.374 0.873225 15.5449L1.71609 9.00026C2.16232 6.59065 3.69931 5.66846 5.0479 5.66846H16.0746C17.443 5.66846 18.8908 6.66007 19.4064 9.00026L20.2493 15.5449C20.8641 19.8286 18.385 21.5739 15.0632 21.5739Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2119 5.43044C15.2119 2.84553 13.1164 0.750042 10.5315 0.750042V0.750042C9.28678 0.744768 8.0912 1.23555 7.20916 2.11387C6.32712 2.99218 5.83129 4.18568 5.8313 5.43044H5.8313" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.7442 10.3093H13.6946" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.42782 10.3093H7.37824" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 23
  },
  color: {
    type: String,
    default: '#0C1A30'
  }
})
</script>