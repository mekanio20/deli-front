<template>
  <svg   viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path d="M10.8938 6.3317V4.54254C10.8938 2.44837 9.19547 0.750037 7.1013 0.750037C5.00714 0.74087 3.30214 2.43087 3.29297 4.52587V4.54254V6.3317" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2775 16.1666H3.91C2.165 16.1666 0.75 14.7525 0.75 13.0066V9.43246C0.75 7.68663 2.165 6.27246 3.91 6.27246H10.2775C12.0225 6.27246 13.4375 7.68663 13.4375 9.43246V13.0066C13.4375 14.7525 12.0225 16.1666 10.2775 16.1666Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.09342 10.2944V12.1453" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 17
  },
  color: {
    type: String,
    default: '#DE0045'
  }
})
</script>