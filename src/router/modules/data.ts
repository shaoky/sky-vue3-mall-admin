import { RouteRecordRaw } from "vue-router"
/**
 * 基础数据
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/data',
        meta: {
            title: '数据管理'
        },
        children: [
            {
                path: '',
                meta: {
                    title: '基础类目管理'
                },
                children: [
                    {
                        path: '/data/type/basis-list',
                        meta: { title: '产品类目' },
                        component: () => import("@/views/data/type/basis-list.vue"),
                    },
                    {
                        path: '/data/type/goods-attr/:id',
                        name: 'goodsAttr',
                        meta: { title: '商品属性' },
                        component: () => import("@/views/data/type/goods-attr.vue"),
                    },
                    {
                        path: '/data/type/goods-spec/:id',
                        name: 'goodsSpec',
                        meta: { title: '商品规格' },
                        component: () => import("@/views/data/type/goods-spec.vue"),
                    },
                ]
            },
        ]
    }
]

export default routes