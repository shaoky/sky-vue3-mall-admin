import { RouteRecordRaw } from "vue-router"
/**
 * 系统管理
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/system',
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: '',
                meta: {
                    title: '系统设置'
                },
                children: [
                    {
                        path: '/system/setting/website',
                        meta: { title: '网站设置' },
                        component: () => import("@/views/system/setting/website.vue"),
                    },
                    {
                        path: '/system/setting/map',
                        meta: { title: '地图设置' },
                        component: () => import("@/views/system/setting/map.vue"),
                    },
                ]
            },
            {
                path: '',
                meta: {
                    title: '日志管理'
                },
                children: [
                    {
                        path: '/system/log/login',
                        meta: { title: '网站设置' },
                        component: () => import("@/views/system/log/login.vue"),
                    }
                ]
            },
            {
                path: '',
                meta: {
                    title: '权限管理'
                },
                children: [
                    {
                        path: '/system/column/index',
                        meta: { title: '菜单管理' },
                        component: () => import("@/views/system/column/index.vue"),
                    },
                    {
                        path: '/system/admin/index',
                        meta: { title: '员工管理' },
                        component: () => import("@/views/system/admin/index.vue"),
                    },
                    {
                        path: '/system/role/index',
                        meta: { title: '角色管理' },
                        component: () => import("@/views/system/role/index.vue"),
                    }
                ]
            }
        ]
    }
]

export default routes