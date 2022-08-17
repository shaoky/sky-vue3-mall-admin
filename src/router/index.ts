import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import index from "../views/index/index.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import(/* webpackChunkName: "login" */ "../views/login/index.vue"),
    },
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
                path: '/index',
                component: () => import(/* webpackChunkName: "index" */ "../views/index/index.vue"),
            },
            /**
             * 前台业务
             */
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
            /**
             * 订单管理
             */
            {
                path: '/business/order/index',
                name: 'order',
                meta: { title: '订单列表' },
                component: () => import(/* webpackChunkName: "businessOrderIndex" */ "../views/business/order/index.vue"),
            },
            {
                path: '/business/order/info/:id',
                name: 'orderInfo',
                meta: { title: '订单详情' },
                component: () => import(/* webpackChunkName: "businessOrderInfo" */ "../views/business/order/info.vue"),
            },
            /**
             * 基础数据
             */
            {
                path: '/data/type/basis-list',
                meta: { title: '产品类目' },
                component: () => import(/* webpackChunkName: "dataTypeBasisList" */ "../views/data/type/basis-list.vue"),
            },
            {
                path: '/data/type/goods-attr/:id',
                name: 'goodsAttr',
                meta: { title: '商品属性' },
                component: () => import(/* webpackChunkName: "dataBasisGoodsAttr" */ "../views/data/type/goods-attr.vue"),
            },
            {
                path: '/data/type/goods-spec/:id',
                name: 'goodsSpec',
                meta: { title: '商品规格' },
                component: () => import(/* webpackChunkName: "dataBasisGoodsSpec" */ "../views/data/type/goods-spec.vue"),
            },
            /**
             * 系统管理
             */
            {
                path: '/system/setting/website',
                meta: { title: '网站设置' },
                component: () => import(/* webpackChunkName: "systemWebsite" */ "../views/system/setting/website.vue"),
            },
            {
                path: '/system/setting/map',
                meta: { title: '地图设置' },
                component: () => import(/* webpackChunkName: "systemMap" */ "../views/system/setting/map.vue"),
            },
            {
                path: '/system/log/login',
                meta: { title: '地图设置' },
                component: () => import(/* webpackChunkName: "logLogin" */ "../views/system/log/login.vue"),
            },
            {
                path: '/system/column/index',
                meta: { title: '菜单管理' },
                component: () => import(/* webpackChunkName: "columnIndex" */ "../views/system/column/index.vue"),
            },
            {
                path: '/system/admin/index',
                meta: { title: '员工管理' },
                component: () => import(/* webpackChunkName: "adminIndex" */ "../views/system/admin/index.vue"),
            },
            {
                path: '/system/role/index',
                meta: { title: '角色管理' },
                component: () => import(/* webpackChunkName: "roleIndex" */ "../views/system/role/index.vue"),
            }
        ]
    }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
