import './assets/main.css'        // existing import
import './styles/global.css'      // add this line – adjust path if needed

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')