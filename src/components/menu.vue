<template>
    <el-aside width="200px">
        <el-menu 
            router 
            :default-active="asideIndex" 
        >
            <el-sub-menu :index="String(item.id)" :key="item.id" v-for="item in menuList">
                <template #title>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item-group :key="index1" v-for="(item1, index1) in item.children">
                    <el-menu-item :index="item1.url">{{item1.name}}</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import cloneDeep from 'lodash/cloneDeep'

const store = useStore()
let route = useRoute()

const menuList = computed(() => {
    let menuAsideList = cloneDeep(store.menuAsideList)
    return menuAsideList
        .filter(item => {
            item.children = item.children.filter(item => item.isVisible)
            return item.isVisible
        })
})

const asideIndex = computed(() => {
    return route.path
})

</script>

<style lang="less">
.el-aside{
    position: fixed;
    top: 80px;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    overflow-x: hidden!important;
    .el-menu {
        border-right: none;
    }
}
</style>