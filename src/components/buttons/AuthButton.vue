<template>
    <button type="submit" :disabled="!isFormValid || loading" :class="[
        'w-full py-4 font-bold rounded-lg transition-all duration-200 transform cursor-pointer flex items-center justify-center gap-2',
        (isFormValid && !loading)
            ? 'bg-[#FEB918] hover:bg-yellow-500 text-white hover:scale-[1.01] active:scale-[0.98]'
            : 'bg-gray-200 text-white cursor-not-allowed'
    ]">
       <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        <span>{{ loading ? loadingText : title }}</span>
    </button>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    isFormValid: {
        type: Boolean,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String
    }
})
</script>