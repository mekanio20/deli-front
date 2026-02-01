<template>
  <svg   viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path d="M10.4705 1.04199H6.41992C3.08867 1.04199 1 3.40041 1 6.73924V15.7461C1 19.0849 3.07892 21.4433 6.41992 21.4433H15.9793C19.3213 21.4433 21.4003 19.0849 21.4003 15.7461V11.3824" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58467 9.85138L15.6804 1.75563C16.689 0.748125 18.3238 0.748125 19.3323 1.75563L20.6508 3.07404C21.6593 4.08263 21.6593 5.71846 20.6508 6.72596L12.516 14.8607C12.0751 15.3016 11.4771 15.5497 10.8531 15.5497H6.79492L6.89676 11.4547C6.91192 10.8524 7.15784 10.2782 7.58467 9.85138Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.4492 3.00684L19.3957 7.95334" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
    default: '#FFA100'
  }
})
</script>