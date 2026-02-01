<template>
  <svg   viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.51802 14.2905C4.32809 14.2905 0.75 14.924 0.75 17.4611C0.75 19.9981 4.3054 20.6543 8.51802 20.6543C12.7079 20.6543 16.285 20.0198 16.285 17.4838C16.285 14.9477 12.7306 14.2905 8.51802 14.2905Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.51805 10.6717C11.2677 10.6717 13.4962 8.44213 13.4962 5.69253C13.4962 2.94293 11.2677 0.714355 8.51805 0.714355C5.76845 0.714355 3.53885 2.94293 3.53885 5.69253C3.52956 8.43285 5.74369 10.6624 8.48297 10.6717H8.51805Z" :stroke="color" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 22
  },
  color: {
    type: String,
    default: '#0C1A30'
  }
})
</script>