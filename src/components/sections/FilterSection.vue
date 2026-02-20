<template>
    <!-- Filter Controls -->
    <section class="flex flex-wrap items-center justify-end gap-3 mb-6 mt-5">

        <!-- Sort Dropdown -->
        <div class="relative" ref="sortRef">
            <button @click="toggleSort"
                class="bg-[#F6F7F9] px-4 py-3 rounded-full transition-all duration-300 flex items-center justify-between gap-3 sm:min-w-[215px] min-w-[180px]">
                <div class="flex items-center gap-3">
                    <sort-icon />
                    <span class="text-[#0C1A30] sm:text-base text-sm"> {{ selectedSort.name }}</span>
                </div>
                <dropdown-icon :isRotate="isSortOpen" />
            </button>

            <!-- Sort Options Menu -->
            <Transition name="dropdown">
                <div v-if="isSortOpen"
                    class="absolute top-full left-0 mt-2 bg-white shadow-xl border border-[#E4004F] sm:min-w-[250px] w-[200px] rounded-lg z-50">
                    <div v-for="(option, index) in options" :key="index" @click="selectSort(option)"
                        class="flex items-center px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-gray-50">
                        <!-- Radio Button -->
                        <div class="flex items-center justify-center sm:mr-4 mr-2">
                            <div v-if="selectedSort.id === option.id"
                                class="w-5 h-5 bg-[#E4004F] rounded-full flex items-center justify-center">
                                <check-icon />
                            </div>
                            <div v-else class="w-5 h-5 border-2 border-[#EDEDED] rounded-full"></div>
                        </div>

                        <!-- Option Text -->
                        <span class="text-[#0C1A30] sm:text-base text-sm font-normal">
                            {{ option.name }}
                        </span>
                    </div>
                </div>
            </Transition>
        </div>

    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['applySort'])
// Refs
const sortRef = ref(null)

// State
const isSortOpen = ref(false)
const selectedSort = ref({
    id: 1,
    name: t('names.simple'),
    value: null
})

// Options
const options = [
    {
        id: 1,
        name: t('names.simple'),
        value: null
    },
    {
        id: 2,
        name: t('names.newest'),
        value: 'newest'
    },
    {
        id: 3,
        name: t('names.oldest'),
        value: 'oldest'
    },
    {
        id: 4,
        name: t('names.cheapest'),
        value: 'cheapest'
    },
    {
        id: 5,
        name: t('names.most_expensive'),
        value: 'most_expensive'
    },
    {
        id: 6,
        name: t('names.most_purchased'),
        value: 'most_purchased'
    },
    {
        id: 7,
        name: t('names.most_liked'),
        value: 'most_liked'
    },
]

const toggleSort = () => {
    isSortOpen.value = !isSortOpen.value
}

const selectSort = (option) => {
    selectedSort.value = option
    isSortOpen.value = false
    emit('applySort', selectedSort.value)
}

// Click outside handler
const handleClickOutside = (event) => {
    if (sortRef.value && !sortRef.value.contains(event.target)) {
        isSortOpen.value = false
    }
}

// Lifecycle
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}
</style>