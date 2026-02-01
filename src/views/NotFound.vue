<template>
    <div class="min-h-screen">
        <MainContainer>
            <div class="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 sm:px-6 lg:px-8">
                <!-- Error Message -->
                <div class="mb-8">
                    <h1 class="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#0C1A30] mb-4">
                        404
                    </h1>
                    <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0C1A30] mb-3">
                        {{ $t('names.404') }}
                    </h2>
                    <p class="text-[#838589] text-base sm:text-lg max-w-md mx-auto">
                        {{ $t('descriptions.404') }}
                    </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col justify-center sm:flex-row gap-4 mb-8 w-full max-w-md">
                    <router-link to="/"
                        class="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-[#FFA100] text-white font-medium rounded-md hover:bg-[#E59400] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl w-full sm:w-auto">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {{ $t('nav.home_page') }}
                    </router-link>

                    <button @click="goBack"
                        class="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-[#FFA100] text-[#FFA100] font-medium rounded-md hover:bg-[#FFA100] hover:text-white transition-all duration-300 ease-in-out w-full sm:w-auto">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {{ $t('buttons.back') }}
                    </button>
                </div>

                <!-- Helpful Links -->
                <div class="border-t border-gray-200 pt-8 w-full max-w-md">
                    <p class="text-[#838589] text-sm mb-4">{{ $t('names.etc_pages') }}:</p>
                    <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
                        <router-link to="/categories"
                            class="text-[#FFA100] hover:text-[#E59400] text-sm font-medium transition-colors duration-200">
                            {{ $t('footer.categories') }}
                        </router-link>
                        <router-link to="/product/list"
                            class="text-[#FFA100] hover:text-[#E59400] text-sm font-medium transition-colors duration-200">
                            {{ $t('footer.products') }}
                        </router-link>
                        <router-link to="/account"
                            class="text-[#FFA100] hover:text-[#E59400] text-sm font-medium transition-colors duration-200">
                            {{ $t('nav.account') }}
                        </router-link>
                    </div>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
const goBack = () => {
    if (window.history.length > 1) {
        window.history.back()
    } else {
        window.location.href = '/'
    }
}
</script>