import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import './assets/less/main.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/es/components/notification/style/css'
import filter from './utils/filter';
import VueUeditorWrap from 'vue-ueditor-wrap'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$filters = filter
router.beforeEach((to, from , next) => {
    document.title = 'xxx商城'
    next()
})

app.use(router)
.use(VueUeditorWrap)
.use(pinia)
.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
