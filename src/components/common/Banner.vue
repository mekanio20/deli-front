<template>
    <div>
        <BannerSkeleton v-show="bannerLoading" />
        <div v-show="!bannerLoading" class="bg-white rounded-b-[14px] mb-5">
            <MainContainer>
                <div class="w-full h-full -mb-5">
                    <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :space-between="10" :loop="true"
                        :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }"
                        class="overflow-hidden custom-swiper">
                        <!-- Slide 1 -->
                        <SwiperSlide v-for="(slide, index) in banners" :key="index">
                            <div @click="handleBannerClick(slide)"
                                class="w-full md:h-[450px] sm:h-[300px] h-[180px] bg-[#f7f7f9] rounded-2xl cursor-pointer">
                                <img class="w-full h-full my-2 lg:object-cover object-fill rounded-2xl"
                                    :src="image(slide)" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </MainContainer>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n({ useScope: 'global' })

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";

const router = useRouter()
const bannerStore = useBannerStore()
const bannerLoading = ref(true)
const banners = ref([])

const image = (image) => {
    if (locale.value === 'TK') {
        return image.image_tk?.path || image.image_ru?.path || '/icons/default.webp'
    } else return image.image_ru?.path || image.image_tk?.path || '/icons/default.webp'
}

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

const handleBannerClick = (banner) => {
    const { content_type_name, object_id, products } = banner

    if (content_type_name === 'Product') {
        if (object_id === null && Array.isArray(products) && products.length > 0) {
            const ids = products.join(',')
            router.push(`/product/list/?product_ids=${ids}`)
        }
    } else if (object_id && content_type_name.toLowerCase() === 'category') {
        router.push(`/product/list/?category=${object_id}`)
    } else if (object_id && content_type_name.toLowerCase() === 'subcategory') {
        router.push(`/product/list/?subcategory=${object_id}`)
    }
}

onMounted(async () => {
    bannerLoading.value = true
    banners.value = [
        { id: 1, image_ru: { path: '/images/banner.png' }, image_tk: { path: '/images/banner.png' } },
        { id: 1, image_ru: { path: '/images/banner.png' }, image_tk: { path: '/images/banner.png' } },
    ]
    // banners.value = await bannerStore.fetchBanners({ type: 'banner' })
    bannerLoading.value = false
})
</script>

<style>
.curtom-swiper .swiper-pagination,
.swiper-pagination-clickable,
.swiper-pagination-bullets,
.swiper-pagination-horizontal {
    padding-bottom: 20px;
}

.custom-swiper .swiper-pagination-bullet {
    margin: 0 0 10px 0;
    background: #FFFFFF99;
}

@media (max-width: 640px) {
    .curtom-swiper .swiper-pagination,
    .swiper-pagination-clickable,
    .swiper-pagination-bullets,
    .swiper-pagination-horizontal {
        padding-bottom: 2px;
    }
}

.custom-swiper .swiper-pagination-bullet-active {
    background: #FFFFFF;
}
</style>