<template>
    <div @click="goToDetail(category.id)"
        class="relative overflow-hidden cursor-pointer bg-[#F5F5F7] rounded-2xl"
        :class="[isFlex ? 'flex items-center justify-between flex-row-reverse h-[140px] sm:px-10 px-4' : 'sm:h-[250px] h-[200px]']">
        <div :class="[isFlex ? '' : 'py-12 w-[160px] mx-auto']">
            <img class="w-full h-full object-contain" src="/images/product.png">
        </div>
        <h3 class="text-[#0C1A30] text-center font-medium sm:text-lg">
            {{ category.name }}
        </h3>
    </div>
</template>

<script setup>
const router = useRouter()
const props = defineProps({
    isFlex: Boolean,
    category: {
        type: Object,
        required: true
    }
})
const goToDetail = (id) => {
    router.push({ name: "ProductList", query: { category: id } })
}
</script>