<template>
    <footer class="bg-[#1F1F1F] pt-10 mt-10 relative">
        <MainContainer class="max-w-[1500px] mx-auto ">
            <div class="relative z-10">
                <div class="w-full flex lg:flex-row flex-col-reverse gap-8 items-start justify-between">

                    <div class="space-y-10">
                        <!-- TamRahat Logo -->
                        <div class="w-[82px]">
                            <logo-icon />
                        </div>

                        <!-- Description -->
                        <div class="space-y-3">
                            <p class="text-white sm:text-sm" v-html="$t('descriptions.footer1')"></p>
                        </div>

                        <!-- App Store Links -->
                        <div class="flex flex-col sm:flex-row gap-3">
                            <a href="https://play.google.com/store/apps/details?id=tam.rahat.client&pcampaignid=web_share" class="w-[153px]">
                                <img src="/icons/googleplay.webp">
                            </a>
                            <a href="#" class="w-[153px]">
                                <img src="/icons/appstore.webp">
                            </a>
                        </div>
                    </div>

                    <div class="grid lg:gap-4 gap-8 text-nowrap lg:grid-cols-4 md:grid-cols-3 grid-cols-2">

                        <div class="space-y-4">
                            <FooterLinkTitle :title="$t('footer.market')" />
                            <ul class="space-y-3">
                                <li>
                                    <FooterLink to="/categories" :title="$t('footer.categories')" />
                                </li>
                                <li>
                                    <FooterLink to="/product/list" :title="$t('footer.products')" />
                                </li>
                            </ul>
                        </div>

                        <div class="space-y-4">
                            <FooterLinkTitle :title="$t('footer.help')" />
                            <ul class="space-y-3">
                                <li>
                                    <FooterLink to="/faq" :title="$t('footer.questions')" />
                                </li>
                                <li>
                                    <FooterLink to="/contact" :title="$t('footer.contact')" />
                                </li>
                            </ul>
                        </div>

                        <div class="space-y-4">
                            <FooterLinkTitle :title="$t('footer.about')" />
                            <ul class="space-y-3">
                                <li>
                                    <FooterLink to="/about" :title="$t('footer.about')" />
                                </li>
                                <li>
                                    <FooterLink to="/faq" :title="$t('footer.questions')" />
                                </li>
                                <li>
                                    <FooterLink to="/faq" :title="$t('footer.about_orderding')" />
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div
                    class="mt-12 py-8 border-t border-[#3F4041] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div class="text-[5px] text-white order-2 sm:order-1">
                        Made by <a href="https://parlaknesil.com" target="_blank"
                            class="text-white font-medium cursor-pointer">ParlakNesil</a>
                    </div>
                    <div class="sm:text-sm text-xs text-white order-1 sm:order-2">
                        © {{ new Date().getFullYear() }} {{ $t('footer.copyright') }}
                    </div>
                </div>
            </div>
        </MainContainer>
    </footer>
</template>

<script setup>
</script>