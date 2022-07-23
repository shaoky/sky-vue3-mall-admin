import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
// import store from './store';
import './assets/less/main.less';
import ElementPlus, { ElNotification } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import filter from './utils/filter';
import VueUeditorWrap from 'vue-ueditor-wrap';
import { createPinia } from 'pinia'
const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$filters = filter
app.config.globalProperties.$ElNotification = ElNotification

router.beforeEach((to, from , next) => {
    document.title = 'xxx商城'
    next()
})
app.use(router)
.use(ElementPlus)
.use(VueUeditorWrap)
.use(pinia)
.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// app.config.globalProperties.$filters = filters
