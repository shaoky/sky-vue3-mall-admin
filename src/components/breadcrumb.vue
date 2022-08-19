<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'index' }" v-if="isIndexShow">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in menuList" :key="item.id">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { Models } from '@/rapper'
import { getParent } from '@/utils/tools'

type MenuModel = Models['GET/admin/user/admin/info']['Res']['data']['columnList'][0]

const route = useRoute()
const store = useStore()

/**
 * 面包屑导航
 * 取值分2种
 * 1. 根据接口返回层级
 * 本来用第一种实现，发现info之类页面没有配置，不好判断是那一层，其实也可以配置起来，加一个字段，判断是否在侧边栏显示
 * 2. 根据前端router层级
 * 这个比较简单，提前router配置好层级，使用route.matched
 * 但是缺点，修改页面名称，同时要在router里修改
 * 3. 结合1和2
 * 这里采用第三种，如果没有找到第1种，执行第2种
 */
const menuList = computed<MenuModel[]>(() => {
    // 防止绕过第一种，执行第二种
    if (store.menuList.length === 0) {
        return []
    }
    
    // 第一种
    let data = getParent(store.menuList, route.path, 'url')
    if (!data) {
        // 第二种
        data = route.matched.map(item => ({
            name: item.meta.title,
        }))
        return data
    }
    return data?.reverse()
})

const isIndexShow = computed(() => {
    const find = store.menuList.find(item => item.url === '/index')
    if (find) {
        return true
    } else {
        return false
    }
})
</script>