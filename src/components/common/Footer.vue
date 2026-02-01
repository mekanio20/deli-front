<template>
    <footer class="bg-white pt-10 mt-10 relative">
        <div class="absolute left-0 bottom-0">
            <img src="/icons/footer-1.webp" />
        </div>
        <div class="absolute right-0 -top-3">
            <img src="/icons/footer-2.webp" />
        </div>
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
                            <p class="text-[#0C1A30] sm:text-sm" v-html="$t('descriptions.footer1')"></p>
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
                    class="mt-12 py-8 border-t border-white flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div class="text-[5px] text-[#8afd8e] order-2 sm:order-1">
                        Made by <a href="https://parlaknesil.com" target="_blank"
                            class="text-[#9cfec2] font-medium cursor-pointer">ParlakNesil</a>
                    </div>
                    <div class="sm:text-sm text-xs text-[#838589] order-1 sm:order-2">
                        © {{ new Date().getFullYear() }} {{ $t('footer.copyright') }}
                    </div>
                </div>
            </div>
        </MainContainer>
    </footer>
</template>

<script setup>
</script>