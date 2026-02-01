<template>
  <svg   viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<g clip-path="url(#clip0_1687_8534)">
<path d="M13.875 4.125L4.125 13.875" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" :stroke="color" stroke-width="1.5"/>
</g>
<defs>
<clipPath id="clip0_1687_8534">
<rect width="18" height="18" fill="white"/>
</clipPath>
</defs>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 18
  },
  color: {
    type: String,
    default: '#DE0045'
  }
})
</script>