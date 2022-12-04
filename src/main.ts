import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vue3-timepicker/dist/VueTimepicker.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
