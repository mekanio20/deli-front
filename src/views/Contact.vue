<template>
    <div class="min-h-screen bg-white">
        <!-- Main Content -->
        <MainContainer>
            <LinkGroup :items="[{ label: $t('footer.contact'), to: '/contact' }]" />

            <!-- Header -->
            <div class="max-w-[1500px] mx-auto">
                <SectionTitle :title="$t('footer.contact')" class="pt-6" />

                <!-- Responsive Form & Info Section -->
                <div class="flex flex-col lg:flex-row gap-10 lg:gap-40 pt-10">
                    <!-- Form Section -->
                    <FormSection @submit="handleSubmit" class="space-y-8 flex-1 flex flex-col">
                        <FormGroup>
                            <FormTitle :id="'full_name'" :title="$t('forms.fullname')" />
                            <FormInput v-model="formData.full_name" :label="'full_name'" />
                        </FormGroup>

                        <FormGroup>
                            <FormTitle :id="'phone'" :title="$t('forms.phoneNumber')" />
                            <FormInput v-model="formData.phone" :label="'phone'" :type="'tel'"
                                :placeholder="'+993 ********'" />
                        </FormGroup>

                        <FormGroup>
                            <FormTitle :id="'email'" :title="$t('forms.email')" />
                            <FormInput v-model="formData.email" :label="'email'" :type="'email'"
                                :placeholder="'example@.com'" />
                        </FormGroup>

                        <FormGroup>
                            <FormTitle :id="'text'" :title="$t('footer.contact')" />
                            <textarea v-model="formData.text"
                                class="w-full h-[100px] resize-none px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] 
                         focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"></textarea>
                        </FormGroup>

                        <button type="submit" :disabled="loading" class="sm:w-[350px] w-full self-center bg-[#037D84] hover:bg-[#25969c] 
                       text-white rounded-md py-3 text-sm font-medium transition">
                            <span v-if="loading">{{ $t('buttons.sending') }}</span>
                            <span v-else>{{ $t('buttons.send') }}</span>
                        </button>
                    </FormSection>

                    <!-- Contact Info -->
                    <div class="space-y-8 flex-1 pt-8">
                        <!-- Phones -->
                        <div class="flex flex-col space-y-8">
                            <a v-for="value in contact?.phone_numbers" :key="value" :href="`tel:${value}`"
                                target="_blank" class="text-base sm:text-lg md:text-xl text-[#0C1A30] flex items-center sm:space-x-6 space-x-3">
                                <div class="sm:w-[55px] sm:h-[55px] w-[50px] h-[50px] bg-[#FFF1D1] rounded-full flex items-center justify-center">
                                    <component :is="icons['phone-icon']" :size="19" :color="'#FEB918'" />
                                </div>
                                <span>{{ value }}</span>
                            </a>
                            <!-- Email -->
                            <a :href="`mailto:${contact?.email}`" target="_blank"
                                class="text-base sm:text-lg md:text-xl text-[#0C1A30] flex items-center sm:space-x-6 space-x-3">
                                <div class="sm:w-[55px] sm:h-[55px] w-[50px] h-[50px] bg-[#FFF1D1] rounded-full flex items-center justify-center">
                                    <component :is="icons['mail-icon']" :size="19" :color="'#FEB918'" />
                                </div>
                                <span>{{ contact?.email }}</span>
                            </a>
                        </div>
                        <div v-for="(item, index) in items" :key="index"
                            class="flex items-center sm:space-x-6 space-x-3">
                            <div
                                class="sm:w-[55px] sm:h-[55px] w-[50px] h-[50px] bg-[#FFF1D1] rounded-full flex items-center justify-center">
                                <component :is="icons[item?.icon]" :size="19" :color="'#FEB918'" />
                            </div>
                            <a v-if="item.type === 'site'" class="text-base sm:text-lg md:text-xl text-[#0C1A30]">
                                {{ item.value }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const contact = ref({})
const contactStore = useContactStore()
const { createContact } = contactStore
const { loading } = storeToRefs(contactStore)
const { success, error: toastError } = useToast()
const { icons, loadIcons } = useIcons()

// SEO Setup
const { setSEO } = useSEO()

// Set SEO for contact page
setSEO({
    title: 'Habarlaşmak - TamRahat | Biz Bilen Habarlaşyň',
    description: 'TamRahat bilen habarlaşmak üçin biz bilen baglanyşyň. Soraglaryňyz, teklip we şikayetleriňiz üçin biz bilen habarlaşyň. Tez we amatly hyzmat.',
    keywords: 'TamRahat habarlaşmak, biz bilen habarlaşmak, sorag bermek, teklip bermek, şikayet bermek, Türkmenistanda hyzmat, Aşgabatda hyzmat, Maryda hyzmat, Türkmenabatda hyzmat, onlaýn hyzmat, müşderi hyzmaty, tez jogap bermek',
    ogTitle: 'Habarlaşmak - TamRahat | Biz Bilen Habarlaşyň',
    ogDescription: 'TamRahat bilen habarlaşmak üçin biz bilen baglanyşyň. Soraglaryňyz, teklip we şikayetleriňiz üçin biz bilen habarlaşyň. Tez we amatly hyzmat.',
    ogImage: 'https://tamrahat.com.tm/icons/logo.png',
    canonical: 'https://tamrahat.com.tm/contact'
})

onMounted(async () => {
    loadIcons()
    contact.value = await contactStore.fetchContact()
})

const formData = ref({
    full_name: '',
    phone: '+993',
    email: '',
    text: ''
})

const items = ref([
    { icon: 'tiktok-icon', type: 'site', value: '@tamrahat.com.tm1' },
    { icon: 'instagram-icon', type: 'site', value: '@tamrahat.store' }
])

const handleSubmit = async () => {
    // Valiadtion Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!emailRegex.test(formData.value.email)) {
        toastError(t('errors.invalid_email'))
        return
    }
    // Validation phone number
    const phoneRegex = /^\+993/
    if (!phoneRegex.test(formData.value.phone.trim())) {
        toastError(t('errors.invalid_phone'))
        return
    }
    // Validation
    if (!formData.value.full_name &&
        !formData.value.phone &&
        !formData.value.email &&
        !formData.value.text) {
        toastError(t('errors.empty_fields'))
        return
    }
    try {
        await createContact(formData.value)
        success(t('success.contact_send'))
        formData.value.full_name = ''
        formData.value.phone = ''
        formData.value.email = ''
        formData.value.text = ''
    } catch (error) {
        console.log(error);
    }
}

</script>