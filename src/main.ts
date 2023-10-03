import './assets/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import { useCommonStore } from './stores/common'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

useCommonStore().init()

app.mount('#app')
