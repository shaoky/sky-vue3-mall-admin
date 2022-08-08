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

<script lang="ts" setup name="data">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute()

const group = ref([
    {
        name: '基础类目管理',
        url: '',
        children: [
            {
                name: '产品类目',
                url: '/data/type/basis-list'
            },
        ]
    },
])
let asideIndex = ref('')

const initData = () => {
    asideIndex.value = route.fullPath
}

initData()
</script>

<style scoped>

</style>
