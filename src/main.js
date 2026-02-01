import App from "./App.vue";
import router from "./router";
import i18n from './i18n'
import "./style.css";

i18n.global.locale.value = localStorage.getItem('lang') || 'TK'
const pinia = createPinia();
const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(pinia);
app.mount("#app");