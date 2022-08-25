import { RouteRecordRaw } from "vue-router"
/**
 * 前台业务
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/business',
        meta: {
            title: '前台业务'
        },
        children: [
            {
                path: '',
                meta: {
                    title: '文章管理'
                },
                children: [
                    {
                        path: '/business/article/index',
                        meta: {
                            title: '文章列表'
                        },
                        component: () => import("@/views/business/article/index.vue"),
                    },
                    {
                        path: '/business/article/add',
                        meta: {
                            title: '添加文章'
                        },
                        component: () => import("@/views/business/article/info.vue"),
                    },
                    {
                        path: '/business/article/info/:id',
                        name: 'articleInfo',
                        meta: {
                            title: '编辑文章'
                        },
                        component: () => import("@/views/business/article/info.vue"),
                    },
                    {
                        path: '/business/article/type',
                        component: () => import("@/views/business/article/type.vue"),
                    },
                ]
            },
            {
                path: '',
                meta: {
                    title: '广告管理'
                },
                children: [
                    {
                        path: '/business/ad/index',
                        meta: {
                            title: '广告列表'
                        },
                        component: () => import("@/views/business/ad/index.vue"),
                    },
                    {
                        path: '/business/ad/add',
                        meta: {
                            title: '添加广告'
                        },
                        component: () => import("@/views/business/ad/info.vue"),
                    },
                    {
                        path: '/business/ad/info/:id',
                        name: 'adInfo',
                        meta: {
                            title: '编辑广告'
                        },
                        component: () => import("@/views/business/ad/info.vue"),
                    },
                    {
                        path: '/business/ad/type',
                        component: () => import("@/views/business/ad/type.vue"),
                    },
                ]
            },
            {
                path: '',
                meta: {
                    title: '产品管理'
                },
                children: [
                    {
                        path: '/business/goods/index',
                        meta: { title: '产品列表' },
                        component: () => import("@/views/business/goods/index.vue"),
                    },
                    {
                        path: '/business/goods/add',
                        name: 'goodsAdd',
                        meta: { title: '添加产品' },
                        component: () => import("@/views/business/goods/info.vue"),
                    },
                    {
                        path: '/business/goods/info/:id',
                        name: 'goodsInfo',
                        meta: { title: '产品详情' },
                        component: () => import("@/views/business/goods/info.vue"),
                    }
                ]
            },
            {
                path: '',
                meta: {
                    title: '订单管理'
                },
                children: [
                    {
                        path: '/business/order/index',
                        name: 'order',
                        meta: { title: '订单列表', keepAlive: true },
                        component: () => import("@/views/business/order/index.vue"),
                    },
                    {
                        path: '/business/order/info/:id',
                        name: 'orderInfo',
                        meta: { title: '订单详情' },
                        component: () => import("@/views/business/order/info.vue"),
                    },
                ]
            }
        ]
    }
]

export default routes