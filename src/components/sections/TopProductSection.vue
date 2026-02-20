<template>
    <MainContainer class="bg-white">
        <div
            class="relative sm:py-10 py-6 overflow-hidden rounded-lg bg-[linear-gradient(to_bottom,#C4C4C4,#E7E7E7,#BDBDBD)]">
            <!-- Bg Icon -->
            <div class="absolute top-0 left-0">
                <img class="w-full h-full" src="/images/top_bg.png" />
            </div>
            <MainContainer class="flex items-center sm:justify-end justify-between">
                <div class="absolute sm:block hidden left-1/2 transform -translate-x-1/2">
                    <h2 class="font-bold lg:text-[36px] sm:text-[24px] text-lg text-[#2B2727]">{{ $t('names.top_selling_products') }}</h2>
                </div>
                <div class="sm:hidden z-10">
                    <h2 class="font-bold lg:text-[36px] sm:text-[24px] text-lg text-white">{{ $t('names.top_selling_products') }} 🏆</h2>
                </div>
                <ViewAllLink :title="$t('names.view_all')" :to="'/product/list?top_products'" bg_color="#fff" text_color="#DE0045"
                    isIcon icon_color="#fff" class="z-10" />
            </MainContainer>
            <div class="sm:px-10 px-4 sm:pt-10">
                <Swiper :modules="modules" :slides-per-view="slidesPerView" :duration="1000" :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false
                }" :breakpoints="{
                    100: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 3, spaceBetween: 20 }
                }" class="flex items-center space-x-6">
                    <SwiperSlide v-for="(item, index) in products" :key="index" class="py-6">
                        <TopProductCard :product="item" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </MainContainer>
</template>

<script setup>
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const slidesPerView = ref(3)
const isMobile = ref(false)
const modules = [Autoplay];

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
})


const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 640
}

onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})
</script>