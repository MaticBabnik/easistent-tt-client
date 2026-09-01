import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import { useCommonStore } from './stores/common'
import { init } from './analytics'

init()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

useCommonStore().init()

app.mount('#app')
