import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import index from "../views/index/index.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import(/* webpackChunkName: "login" */ "../views/login/index.vue"),
    },
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/index/index.vue"),
    // },
    {
        path: '/home',
        name: "home",
        component: () => import(/* webpackChunkName: "manage" */ "../views/home.vue"),
        children: [
            /**
             * 首页
             */
            {
                name: 'index',
                meta: {
                    title: '商城运营管理系统'
                },
                path: '/home',
                component: () => import(/* webpackChunkName: "index" */ "../views/index/index.vue"),
            },
            /**
             * 前台业务
             */
            {
                name: 'business',
                path: '/business',
                component: () => import(/* webpackChunkName: "business" */ "../views/business/index.vue"),
                children: [
                    // {
                    //     path: '/business/user/user-list',
                    //     meta: { title: '用户列表' },
                    //     component: () => import(/* webpackChunkName: "businessUserList" */ "../views/business/user/user-list.vue"),
                    // },
                    /**
                     * 广告管理
                     */
                    {
                        path: '/business/ad/index',
                        component: () => import(/* webpackChunkName: "businessAdIndex" */ "../views/business/ad/index.vue"),
                    },
                    {
                        path: '/business/ad/add',
                        component: () => import(/* webpackChunkName: "businessAdInfo" */ "../views/business/ad/info.vue"),
                    },
                    {
                        path: '/business/ad/info/:id',
                        name: 'adInfo',
                        component: () => import(/* webpackChunkName: "businessAdInfo" */ "../views/business/ad/info.vue"),
                    },
                    {
                        path: '/business/ad/type',
                        component: () => import(/* webpackChunkName: "businessAdType" */ "../views/business/ad/type.vue"),
                    },
                    /**
                     * 文章管理
                     */
                    {
                        path: '/business/article/index',
                        component: () => import(/* webpackChunkName: "businessArticleIndex" */ "../views/business/article/index.vue"),
                    },
                    {
                        path: '/business/article/add',
                        component: () => import(/* webpackChunkName: "businessArticleAdd" */ "../views/business/article/info.vue"),
                    },
                    {
                        path: '/business/article/info/:id',
                        name: 'articleInfo',
                        component: () => import(/* webpackChunkName: "businessArticleInfo" */ "../views/business/article/info.vue"),
                    },
                    {
                        path: '/business/article/type',
                        component: () => import(/* webpackChunkName: "businessArticleType" */ "../views/business/article/type.vue"),
                    },
                    /**
                     * 产品管理
                     */
                    {
                        path: '/business/goods/index',
                        meta: { title: '产品列表' },
                        component: () => import(/* webpackChunkName: "businessGoodsIndex" */ "../views/business/goods/index.vue"),
                    },
                    {
                        path: '/business/goods/add',
                        meta: { title: '添加产品' },
                        component: () => import(/* webpackChunkName: "businessGoodsInfo" */ "../views/business/goods/info.vue"),
                    },
                    {
                        path: '/business/goods/info/:id',
                        name: 'goodsInfo',
                        meta: { title: '产品详情' },
                        component: () => import(/* webpackChunkName: "businessGoodsInfo" */ "../views/business/goods/info.vue"),
                    },
                ]
            },
            /**
             * 基础数据
             */
            {
                path: '/data',
                component: () => import(/* webpackChunkName: "dataIndex" */ "../views/data/index.vue"),
                children: [
                    {
                        path: '/data/type/basis-list',
                        meta: { title: '后台基础类目' },
                        component: () => import(/* webpackChunkName: "dataTypeBasisList" */ "../views/data/type/basis-list.vue"),
                    }
                ]
            },
            {
                path: '/system',
                component: () => import(/* webpackChunkName: "system" */ "../views/system/index.vue"),
                children: [
                    {
                        path: '/system/setting/website',
                        meta: { title: '网站设置' },
                        component: () => import(/* webpackChunkName: "systemWebsite" */ "../views/system/setting/website.vue"),
                    },
                    {
                        path: '/system/setting/map',
                        meta: { title: '地图设置' },
                        component: () => import(/* webpackChunkName: "systemMap" */ "../views/system/setting/map.vue"),
                    }
                ]
            },
        ]
    }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
