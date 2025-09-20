import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Particles from "vue3-particles"
import DataVVue3 from '@kjgl77/datav-vue3'
import ElementPlus from 'element-plus'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(Particles)
app.use(DataVVue3)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(ArcoVue)
app.mount('#app')
