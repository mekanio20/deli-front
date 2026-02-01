<template>
    <MainContainer>
        <!-- MENU BAR -->
        <div class="relative w-full" @mouseleave="hoveredItem = null">
            <div class="overflow-x-auto no-scrollbar">
                <div class="flex items-center">
                    <div v-for="item in routes" :key="item.id" class="relative shrink-0"
                        @mouseenter="item.children && (hoveredItem = item.id)">
                        <router-link :to="item.to" class="px-6 py-2 rounded-md text-sm font-medium
                                   text-[#0C1A30]
                                   hover:bg-red-50 hover:text-[#DE0045]
                                   transition-colors duration-300 flex items-center gap-2">
                            <span>{{ item.name }}</span>
                            <chevron_down-icon v-if="item?.children" :size="14" :color="'currentColor'" :class="[
                                'transition-transform duration-200',
                                hoveredItem === item.id ? 'rotate-180' : ''
                            ]" />
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- CHILDREN GRID AREA -->
            <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
                <div v-if="hoveredItem && currentChildren"
                    class="w-full flex items-start justify-between overflow-hidden py-8"
                    @mouseenter="hoveredItem = hoveredItem">
                    <div class="flex flex-col space-y-6 px-10">
                        <span class="font-bold text-[#0C1A30]">Categories</span>
                        <span class="text-[#838589]">Categories</span>
                        <span class="text-[#838589]">Categories</span>
                        <span class="text-[#838589]">Categories</span>
                    </div>
                    <div class="max-w-7xl flex items-center space-x-2 overflow-x-auto no-scrollbar">
                        <router-link v-for="(child, index) in currentChildren" :key="index" :to="child.link"
                            class="shrink-0">
                            <MenuCard :title="child.name" />
                        </router-link>
                    </div>
                </div>
            </transition>
        </div>
    </MainContainer>
</template>

<script setup>
const hoveredItem = ref(null)

const routes = ref([
    {
        id: 1,
        name: 'Cashier Drawer',
        to: '#',
        children: [
            { name: 'Ammarlar', link: '/warehouses' },
            { name: 'Täzelikler', link: '/news' },
            { name: 'Gadagan edilýän ýükler', link: '/forbidden-cargo' },
            { name: 'Köp soralýan soraglar', link: '/faq' },
            { name: 'Model A', link: '/model-a' },
            { name: 'Model B', link: '/model-b' },
            { name: 'Model C', link: '/model-c' },
            { name: 'Accessories', link: '/accessories' },
        ]
    },
    { id: 2, name: 'Video Camera', to: '#' },
    {
        id: 3,
        name: 'Laser Printer',
        to: '#',
        children: [
            { name: 'Office Printers', link: '/office-printers' },
            { name: 'Industrial Printers', link: '/industrial-printers' },
            { name: 'Color Printers', link: '/color-printers' },
            { name: 'Monochrome', link: '/monochrome' },
            { name: 'Consumables', link: '/consumables' },
            { name: 'Spare Parts', link: '/spare-parts' },
            { name: 'Office Printers', link: '/office-printers' },
            { name: 'Industrial Printers', link: '/industrial-printers' },
            { name: 'Color Printers', link: '/color-printers' },
            { name: 'Monochrome', link: '/monochrome' },
            { name: 'Consumables', link: '/consumables' },
            { name: 'Spare Parts', link: '/spare-parts' },
        ]
    },
    { id: 4, name: 'Motion Sensor', to: '#' },
    { id: 5, name: 'Laminator', to: '#' },
])

// Aktif kategorinin children'larını al
const currentChildren = computed(() => {
    if (!hoveredItem.value) return null
    const item = routes.value.find(r => r.id === hoveredItem.value)
    return item?.children || null
})
</script>