<template>
    <div v-if="categories.length > 0" class="w-full mb-14 max-w-[320px] bg-white">
        <!-- Title -->
        <h3 class="sm:text-lg text-base font-semibold text-[#0B1B2B]">
            Kiçi Kategoriýalar
        </h3>

        <!-- List -->
        <div class="mt-6 space-y-5">
            <button v-for="item in visibleCategories" :key="item.id" type="button"
                class="w-full flex items-center gap-4 text-left group" @click="select(item.id)">
                <!-- Radio Button -->
                <div class="flex items-center justify-center">
                    <div v-if="isActive(item.id)"
                        class="w-6 h-6 bg-[#E4004F] border-[#E4004F] rounded-full flex items-center justify-center">
                        <check-icon />
                    </div>
                    <div v-else class="w-6 h-6 border-2 border-[#EDEDED] rounded-full"></div>
                </div>

                <!-- Text -->
                <span class="sm:text-base text-sm transition" :class="isActive(item.id)
                    ? 'text-[#0C1A30]'
                    : 'text-[#0B1B2B]/90 group-hover:text-[#0B1B2B]'">
                    {{ item.name }}
                </span>
            </button>
        </div>

        <!-- See All -->
        <button v-if="categories.length > limit && !showAll" type="button"
            class="mt-6 text-[#E4004F] font-semibold text-[16px] hover:underline" @click="toggle">
            Ählisini gör...
        </button>
    </div>
</template>

<script setup>
/**
 * Props
 * categories: [{ id: 1, name: "Cashier Drawer" }, ...]
 * modelValue: selected id
 */
const props = defineProps({
    categories: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: [String, Number, null],
        default: 2
    },
    limit: {
        type: Number,
        default: 4
    }
})

const emit = defineEmits(["update:modelValue"])

const showAll = ref(false)

const visibleCategories = computed(() => {
    if (showAll.value) return props.categories
    return props.categories.slice(0, props.limit)
})

const isActive = (id) => props.modelValue === id

const select = (id) => {
    if (isActive(id)) {
        emit("update:modelValue", null)
        return
    }
    emit("update:modelValue", id)
}

const toggle = () => {
    showAll.value = !showAll.value
}
</script>
