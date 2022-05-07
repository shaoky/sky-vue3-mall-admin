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
            path: '/system',
            group: [
                {
                    name: '系统设置',
                    url: '',
                    children: [
                        {
                            name: '网站设置',
                            url: '/system/setting/website'
                        },
                        {
                            name: '地图设置',
                            url: '/system/setting/map'
                        },
                    ]
                },
                {
                    name: '日志管理',
                    url: '',
                    children: [
                        {
                            name: '用户登录日志',
                            url: '/system/log/login'
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
