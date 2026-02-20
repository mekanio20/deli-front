<template>
    <div>
        <!-- MENU BAR -->
        <div class="relative" @mouseleave="hoveredItem = null">
            <MainContainer>
                <div class="overflow-x-auto no-scrollbar">
                    <div class="flex items-center">
                        <div v-for="item in categoryStore.categories" :key="item.id" class="relative shrink-0"
                            @mouseenter="item.children.length > 0 && (hoveredItem = item.id)">
                            <router-link :to="`/product/list?category=${item.id}`" class="sm:px-6 px-4 py-2 rounded-md text-sm font-medium
                                       text-[#0C1A30]
                                       hover:bg-red-50 hover:text-[#DE0045]
                                       transition-colors duration-300 flex items-center gap-2">
                                <span>{{ item.name }}</span>
                                <chevron_down-icon v-if="item?.children?.length > 0" :size="14" :color="'currentColor'"
                                    :class="[
                                        'transition-transform duration-200',
                                        hoveredItem === item.id ? 'rotate-180' : ''
                                    ]" />
                            </router-link>
                        </div>
                    </div>
                </div>
            </MainContainer>

            <!-- CHILDREN GRID AREA -->
            <div class="absolute top-10 z-50 bg-white w-full">
                <div v-if="hoveredItem && currentChildren" class="w-full flex items-start overflow-hidden px-16 py-8"
                    @mouseenter="hoveredItem = hoveredItem">
                    <div class="flex space-x-2 overflow-x-auto no-scrollbar">
                        <router-link v-for="(child, index) in currentChildren" :key="index"
                            :to="'/product/list?subcategory=' + child.id">
                            <MenuCard :data="child" />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['hovered'])
const categoryStore = useCategoriesStore()
const hoveredItem = ref(null)

const currentChildren = computed(() => {
    if (!hoveredItem.value) return null
    const item = categoryStore.categories.find(r => r.id === hoveredItem.value)
    return item?.children || null
})

watch(() => hoveredItem.value, (newVal) => {
    if (newVal) emit('hovered', true)
    else emit('hovered', false)
})

onMounted(async () => {
    await categoryStore.fetchCategories()
})
</script>