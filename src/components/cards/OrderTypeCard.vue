<template>
    <article class="flex-shrink-0 relative cursor-pointer group" :class="{'hidden': is_hidden}" @click="$emit('toggle', { price })">
        <div :class="[
        'relative px-4 py-3 rounded-2xl border-[1px] transition-all duration-300 ease-in-out transform',
        selected
            ? 'border-[#FEB918] bg-[#FEB9180D]'
            : 'border-[#EDEDED] bg-white hover:shadow-sm'
    ]">
            <!-- Radio Circle -->
            <div class="absolute top-4 right-4">
                <div :class="[
        'w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center',
        selected
            ? 'border-[#FEB918] border-4 bg-[#FEB9180D]'
            : 'border-[#EDEDED] border-2 bg-white group-hover:border-[#FEB918]'
    ]">
                    <div v-if="selected" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
            </div>

            <!-- Content -->
            <div class="pr-8">
                <h2
                    class="sm:text-base text-sm bg-gradient-to-r from-[#FF6F00] to-[#FEB918] bg-clip-text text-transparent font-semibold">
                    {{ title }}
                </h2>
            </div>

            <!-- Price -->
            <div class="pt-4">
                <span v-if="isFree || price === 0" class="text-[#FEB918] font-semibold">
                    {{ $t('names.free') }}
                </span>
                <span v-else class="text-[#FEB918] font-semibold">
                    {{ price }} TMT
                </span>
            </div>
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    regionPrices: {
        type: Array,
        default: () => []
    },
    region_id: {
        type: Number,
        required: false
    },
    isFree: {
        type: Boolean,
        default: false
    },
    selected: {
        type: Boolean,
        default: false
    },
    is_hidden: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['toggle'])

const price = computed(() => {
  if (!props.region_id || !props.regionPrices.length) return 0
  const region = props.regionPrices.find(r => r.region_id === props.region_id)
  return region ? region.price : 0
})
</script>