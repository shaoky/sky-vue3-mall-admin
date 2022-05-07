<template>
    <div>
        <el-container>
            <el-aside width="200px" >
                <!-- v-if="group[groupIndex]" -->
            <el-menu router :default-active="asideIndex" >
                <el-submenu :index="index+'1'" :key="index" v-for="(item, index) in group">
                    <template #title>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group :key="index1" v-for="(item1, index1) in item.children">
                        <el-menu-item :index="item1.url">{{item1.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- <aside-menu :group="group" :path="path"></aside-menu> -->
            </el-menu>
            </el-aside>
            <div class="right-main">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </el-container>
    </div>
</template>

<script>
// import { mapMutations } from 'vuex'
// import asideMenu from '@/components/aside'

export default {
    data () {
        return {
            path: '/business',
            group: [
                // {
                //     name: '用户管理',
                //     url: '',
                //     children: [
                //         {
                //             name: '用户列表',
                //             url: '/business/user/user-list'
                //         }
                //     ]
                // },
                {
                    name: '文章管理',
                    url: '',
                    children: [
                        {
                            name: '文章列表',
                            url: '/business/article/index'
                        },
                        {
                            name: '文章类型',
                            url: '/business/article/type'
                        }
                    ]
                },
                {
                    name: '广告管理',
                    url: '',
                    children: [
                        {
                            name: '广告列表',
                            url: '/business/ad/index'
                        },
                        {
                            name: '广告位置',
                            url: '/business/ad/type'
                        }
                    ]
                },
                {
                    name: '产品管理',
                    url: '',
                    children: [
                        {
                            name: '产品列表',
                            url: '/business/goods/index'
                        },
                        // {
                        //     name: '新增产品',
                        //     url: '/business/goods/add'
                        // }
                    ]
                },
                {
                    name: '订单管理',
                    url: '',
                    children: [
                        {
                            name: '订单列表',
                            url: '/business/order/index'
                        },
                    ]
                },
            ]
        }
    },
    computed: {
        asideIndex () {
            return this.$route.path
        },
        // group () {
        //     return this.$store.state.groups.group
        // }
    },
    mounted () {
        // this.setNavIndex('/business')
    },
    methods: {
    },
    components: {
        // asideMenu
    }
}
</script>

<style scoped>

</style>
