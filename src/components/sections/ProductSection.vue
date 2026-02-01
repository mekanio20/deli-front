<template>
    <div class="bg-white mt-5">
        <MainContainer>
            <SectionHeaderGroup v-if="sectionTitle">
                <h3 v-if="sectionTitle" class="font-semibold lg:text-[30px] leading-[100%] sm:text-[30px] text-lg text-[#0C1A30]">{{ sectionTitle }}</h3>
                <ViewAllLink v-if="isRedirectLink" :title="linkTitle" :to="link" />
            </SectionHeaderGroup>
            <Swiper :modules="modules" :slides-per-view="slidesPerView" :duration="1000" :autoplay="{
                    delay: 1500,
                    disableOnInteraction: false
                }" :breakpoints="{
                    100: { slidesPerView: 2, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 30 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                    1280: { slidesPerView: 5, spaceBetween: 30 }
                }">
                <SwiperSlide v-for="(item, index) in products" :key="index" class="sm:py-6 py-2">
                    <ProductCard :product="item" />
                </SwiperSlide>
            </Swiper>
        </MainContainer>
    </div>
</template>

<script setup>
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import 'swiper/css'

const modules = [Autoplay];

const props = defineProps({
    slidesPerView: {
        type: [Number, String],
        default: 5
    },
    products: {
        type: Array,
        required: true
    },
    isRedirectLink: {
        type: Boolean,
        default: true
    },
    sectionTitle: {
        type: String,
        default: ''
    },
    linkTitle: {
        type: String
    },
    link: {
        type: String,
        default: '/product/list'
    }
})
const linkTitle = computed(() => props.linkTitle || t('names.view_all'))
</script>