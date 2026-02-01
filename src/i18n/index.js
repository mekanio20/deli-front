import { createI18n } from 'vue-i18n'
import TK from './locales/tk.json'
import RU from './locales/ru.json'
const i18n = createI18n({
    locale: 'TK',
    fallbackLocale: 'TK',
    legacy: false,
    globalInjection: true,
    messages: {
        TK, RU
    },
})

  export default i18n