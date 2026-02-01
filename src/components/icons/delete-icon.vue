<template>
  <svg   viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path d="M17.8736 8.27734C17.8736 8.27734 17.2853 15.5736 16.9441 18.647C16.7816 20.1149 15.8748 20.9751 14.3896 21.0022C11.5632 21.0531 8.7335 21.0563 5.90817 20.9968C4.47925 20.9675 3.58767 20.0965 3.42842 18.6546C3.085 15.5541 2.5 8.27734 2.5 8.27734" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.3712 4.77995H1" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8306 4.77975C14.9802 4.77975 14.2479 4.1785 14.0811 3.34542L13.8178 2.02808C13.6553 1.42033 13.105 1 12.4777 1H7.89198C7.26473 1 6.7144 1.42033 6.5519 2.02808L6.28865 3.34542C6.12181 4.1785 5.38948 4.77975 4.53906 4.77975" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
    default: '#DE0045'
  }
})
</script>