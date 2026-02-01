<template>
  <svg   viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.11845 9.34832C0.0454474 5.99832 1.29945 2.16932 4.81645 1.03632C6.66645 0.439322 8.70845 0.791322 10.2464 1.94832C11.7014 0.823322 13.8184 0.443322 15.6664 1.03632C19.1834 2.16932 20.4454 5.99832 19.3734 9.34832C17.7034 14.6583 10.2464 18.7483 10.2464 18.7483C10.2464 18.7483 2.84445 14.7203 1.11845 9.34832Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.2466 4.4502C15.3166 4.7962 16.0726 5.7512 16.1636 6.8722" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 21
  },
  color: {
    type: String,
    default: '#0C1A30'
  }
})
</script>