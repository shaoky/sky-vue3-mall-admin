import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const modulesFiles: any = import.meta.glob("./modules/*.ts", {
    eager: true
})

let routerList: RouteRecordRaw[] = []
for(let item in modulesFiles) {
    routerList = [...routerList, ...modulesFiles[item].default]
}

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("../views/login/index.vue"),
    },
    /**
     * 首页
     */
    {
        name: 'index',
        meta: {
            title: '商城运营管理系统'
        },
        path: '/index',
        component: () => import("../views/index/index.vue"),
    },
    ...routerList,
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
