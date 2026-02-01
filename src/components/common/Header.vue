<template>
    <div class="bg-[rgb(247,247,249)]">
        <MainContainer class="max-w-[1500px] mx-auto">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div @click="toogleDropdown" class="flex items-center space-x-2 cursor-pointer">
                        <map_pin-icon color="#949494" />
                        <span class="text-[12px] text-[#949494] capitalize">{{ selectedCity }}</span>
                        <chevron_right-icon :size="7" color="#949494" class="rotate-90" />
                    </div>
                    <div class="sm:block hidden w-[1px] h-[14px] bg-[#949494]"></div>
                    <div class="sm:flex hidden items-center space-x-2">
                        <clock-icon />
                        <span class="text-[12px] text-[#949494]">{{ $t('names.every_day') }}: 09:00 - 21:00</span>
                    </div>
                </div>
                <div class="flex items-center sm:space-x-8 space-x-4">
                    <div class="flex items-center space-x-1 cursor-pointer" @click="isContactModal = !isContactModal">
                        <mingcute-icon />
                        <span class="text-[12px] text-[#A3A4A3]">{{ $t('footer.contact') }}</span>
                    </div>
                </div>
            </div>
            <!-- City Select Modal -->
            <CitySelectModal v-model="showCityModal" :cities="cities" @select="handleCitySelect" :isClose="true" />
            <ContactModal v-model="isContactModal"/>
        </MainContainer>
    </div>
</template>

<script setup>
const cities = ref([])
const showCityModal = ref(false)
const selectedCity = ref(null)
const productStore = useProductsStore()
const { fetchAvailableCities } = productStore
const isContactModal = ref(false)

const toogleDropdown = () => {
    showCityModal.value = true
}

const fetchCities = async () => {
    cities.value = await fetchAvailableCities()
    if (cities.value.length === 1) handleCitySelect(cities.value[0])
}

const handleCitySelect = (selected = {}) => {
    const code = selected?.code
    selectedCity.value = code
    if (!code) return
    localStorage.setItem('city', String(code))
}

onMounted(async () => {
    await fetchCities()
})
</script>
