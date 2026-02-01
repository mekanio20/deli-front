<template>
    <div class="bg-white">
        <MainContainer>
            <SectionHeaderGroup class="sm:-mb-0 -mb-4">
                <SectionTitle :title="sectionTitle" />
                <ViewAllLink :title="linkTitle" :to="'/categories'" />
            </SectionHeaderGroup>
            <Swiper :slides-per-view="6" :modules="modules" :duration="1000" :autoplay="{
                delay: 1500,
                disableOnInteraction: false
            }" :breakpoints="{
                100: { slidesPerView: 2, spaceBetween: 10 },
                640: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1280: { slidesPerView: 6, spaceBetween: 20 }
            }">
                <SwiperSlide v-for="(item, index) in categories" :key="index" class="py-6">
                    <CategoryCard :category="item" />
                </SwiperSlide>
            </Swiper>
        </MainContainer>
    </div>
</template>

<script setup>
import { Autoplay } from 'swiper/modules';
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
const { t } = useI18n()
import 'swiper/css'
const modules = [Autoplay];

const props = defineProps({
    categories: {
        type: Array,
        required: true
    },
    sectionTitle: {
        type: String
    },
    linkTitle: {
        type: String
    },
    link: {
        type: String,
        default: '/'
    }
})

const linkTitle = computed(() => props.linkTitle || t('names.view_all'))
</script>