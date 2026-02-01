<template>
    <div class="bg-white">
        <MainContainer>
            <LinkGroup :items="[{ label: `${$t('nav.about')}`, to: '/account/favorite' }]" />
            <SectionTitle :title="$t('nav.about')" class="pt-6" />

            <div class="py-8 relative w-full h-full">
                <img src="/images/about.webp" class="w-full sm:h-full h-[200px] sm:object-contain object-cover rounded-2xl">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full sm:space-y-8 space-y-3">
                    <h1 class="text-white lg:text-[64px] md:text-5xl sm:text-3xl text-2xl font-bold">{{ $t('about.a1') }}</h1>
                    <p class="text-white sm:text-[22px] text-base">{{ $t('about.a2') }}</p>
                </div>
            </div>

            <div class="pb-8">
                <h4 class="lg:text-lg sm:text-base text-sm text-[#0C1A30]">{{ $t('about.a3') }}</h4>
            </div>

            <div class="pb-8">
                <h3 class="lg:text-lg sm:text-base text-sm font-bold text-[#0C1A30]">{{ $t('nav.about') }}</h3>
                <p class="pt-4 lg:text-lg sm:text-base text-sm text-[#0C1A30]">{{ $t('about.a4') }}</p>
            </div>
            <div class="pb-8">
                <h3 class="lg:text-lg sm:text-base text-sm font-bold text-[#0C1A30]">{{ $t('about.a5') }}</h3>
                <ul class="pt-4 lg:text-lg sm:text-base text-sm text-[#0C1A30] list-disc list-inside">
                    <li>{{ $t('about.a6') }}</li>
                    <li>
                        {{ $t('about.a7') }}
                    </li>
                    <li>
                        {{ $t('about.a8') }}
                    </li>
                    <li>
                        {{ $t('about.a9') }}
                    </li>
                </ul>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO'

// SEO Setup
const { setSEO } = useSEO()

// Set SEO for about page
setSEO({
  title: 'Hakymyzda - TamRahat | Türkmenistanda Öý Üçin Harytlar Dükany',
  description: 'TamRahat - Türkmenistanda öý üçin ähli harytlary amatly bahadan satyn alyň. Gap-gaç, arassaçylyk serişdeleri, elektrik enjamlary we öý bezegleri. Tez eltip berme we ýokary hilli hyzmat.',
  keywords: 'TamRahat hakymyzda, öý harytlary dükany, Türkmenistanda onlaýn dükan, gap-gaç dükany, arassaçylyk serişdeleri, elektrik enjamlary, öý bezegleri, Aşgabatda dükan, Maryda dükan, Türkmenabatda dükan, öý üçin harytlar, amatly baha, tez eltip berme, ýokary hilli hyzmat',
  ogTitle: 'Hakymyzda - TamRahat | Türkmenistanda Öý Üçin Harytlar Dükany',
  ogDescription: 'TamRahat - Türkmenistanda öý üçin ähli harytlary amatly bahadan satyn alyň. Gap-gaç, arassaçylyk serişdeleri, elektrik enjamlary we öý bezegleri. Tez eltip berme we ýokary hilli hyzmat.',
  ogImage: 'https://tamrahat.com.tm/images/about.webp',
  canonical: 'https://tamrahat.com.tm/about'
})
</script>