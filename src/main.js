import "./assets/main.css"

import router from "./router"
import { createApp, markRaw } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount("#app")
