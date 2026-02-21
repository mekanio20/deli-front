<template>
    <button ref="dropDownContainer" @click="toggleDropDown" class="relative flex items-center gap-2 py-0 rounded-l">
        <div class="active:bg-gray-200 p-2 flex sm:flex-col flex-row sm:space-x-0 space-x-1 items-center space-y-1 rounded-md">
            <globe-icon class="pt-[2px]" />
            <span class="sm:text-[12px] text-[#0C1A30] uppercase sm:block hidden">{{ $i18n.locale }}</span>
        </div>
        <div v-show="dropDown === true"
            class="absolute sm:w-fit rounded-md top-full left-0 right-0 !z-50 bg-white border border-[#F6F7F9] shadow-sm p-2 flex flex-col item-start max-xl:right-0 max-lg:left-auto">
            <button v-for="item in langs" :key="item.id" @click="switchLanguage(item.lang)"
                class="flex items-start gap-2 w-full font-medium whitespace-nowrap text-sm py-2 px-2 hover:bg-gray-100 hover:rounded-md ease-linear transition-all duration-150 cursor-pointer"
                :class="{ 'text-[#FEB918]': $i18n.locale === item.lang }">
                {{ item.desc }}
            </button>
        </div>
    </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'
const { locale } = useI18n({ useScope: 'global' })
const langs = [
    { id: 1, name: 'TK', desc: 'Türkmen dili', lang: 'TK' },
    { id: 2, name: 'RU', desc: 'Русский', lang: 'RU' },
]

const dropDownContainer = ref()
const dropDown = ref(false)
onClickOutside(dropDownContainer, () => dropDown.value = false)
const toggleDropDown = () => {
    dropDown.value = !dropDown.value
}
const switchLanguage = (language) => {
    locale.value = language
    localStorage.setItem('lang', language)
    window.location.reload()
}
</script>