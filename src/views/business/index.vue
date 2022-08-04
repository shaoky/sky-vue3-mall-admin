<template>
    <div>
        <el-container>
            <el-aside width="200px" >
                <!-- v-if="group[groupIndex]" -->
            <el-menu router :default-active="asideIndex" >
                <el-sub-menu :index="index+'1'" :key="index" v-for="(item, index) in group">
                    <template #title>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group :key="index1" v-for="(item1, index1) in item.children">
                        <el-menu-item :index="item1.url">{{item1.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
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

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute()

let asideIndex = ref('')
const group = ref([
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
            }
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
])

const initData = () => {
    asideIndex.value = route.fullPath
}

initData()

</script>

<style scoped>

</style>
