import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { useStore } from '@/store'
import { getUserInfo } from '@/api/getData'
import { treeToArray } from '@/utils/tools'

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
        name: 'login',
        component: () => import("../views/login/index.vue"),
    },
    {
        name: 'index',
        meta: {
            title: '天空商城管理系统'
        },
        path: '/index',
        component: () => import("../views/index/index.vue"),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/error/404.vue')
    },
    ...routerList,
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

router.beforeEach(async(to, from , next) => {
    // console.log(to)
    const store = useStore()
    document.title = '天空商城管理系统'

    // 无需登录页面，直接进去
    if (notLogin.includes(to.path)) {
        next()
        return
    }
    // 需要登录页面，判断token
    if (store.token === '') {
        next('/404')
        return
    }
    
    // 判断是否需要重新获取用户信息
    if (!store.user.username) {
        const menuList = store.menuList
        if (menuList.length === 0) {
            const res = await getUserInfo()
            store.updateUser({
                username: res.username
            })
            store.updateMent(res.columnList)
        }
    }
    
    // 扁平化列表，查询用户有没有权限，访问页面
    const columnList = treeToArray(store.menuList)
    let path: string = to.path
    // 转化goods/info/123 => goods/info
    if (Object.keys(to.params).length > 0) {
        path = path.replace(/(.*)\/{1}.*/, '$1')
    }
    const find = columnList.find(item => path === item.url)
    if (find) {
        next()
    } else {
        next('/404')
    }
})

export const notLogin = ['/', '/404']

export default router
