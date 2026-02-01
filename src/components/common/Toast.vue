<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="toast.visible"
      class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <div
              v-if="toast.type === 'success'"
              class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"
            >
              <check-icon class="w-4 h-4 text-green-600" />
            </div>
            <!-- Error Icon -->
            <div
              v-else-if="toast.type === 'error'"
              class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center"
            >
              <close-icon class="w-4 h-4 text-red-600" />
            </div>
            <!-- Warning Icon -->
            <div
              v-else-if="toast.type === 'warning'"
              class="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center"
            >
              <shield-icon class="w-4 h-4 text-yellow-600" />
            </div>
            <!-- Info Icon -->
            <div
              v-else
              class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"
            >
              <phone-icon class="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-[#0C1A30]">
              {{ toast.title }}
            </p>
            <p class="mt-1 text-sm text-[#838589]">
              {{ toast.message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="closeToast"
              class="bg-white rounded-md inline-flex text-[#838589] hover:text-[#0C1A30] focus:outline-none transition-colors duration-200"
            >
              <span class="sr-only">Close</span>
              <close-icon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <!-- Progress Bar -->
      <div
        v-if="toast.autoClose"
        class="h-1 bg-gray-200"
      >
        <div
          class="h-1 transition-all duration-100 ease-linear"
          :class="{
            'bg-green-500': toast.type === 'success',
            'bg-red-500': toast.type === 'error',
            'bg-yellow-500': toast.type === 'warning',
            'bg-blue-500': toast.type === 'info'
          }"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  toast: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const progressWidth = ref(100)
let progressInterval = null

const closeToast = () => {
  emit('close')
}

const startProgress = () => {
  if (!props.toast.autoClose) return
  
  const duration = 1500
  const interval = 50
  const decrement = (interval / duration) * 100
  
  progressInterval = setInterval(() => {
    progressWidth.value -= decrement
    if (progressWidth.value <= 0) {
      closeToast()
    }
  }, interval)
}

const stopProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

onMounted(() => {
  startProgress()
})

onUnmounted(() => {
  stopProgress()
})
</script>
