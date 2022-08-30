<template>
	<div class="wrap" v-if="login">
        <web-header></web-header>
        <div class="mainBody" id="mainBody">
            <Menu v-if="!isIndex"></Menu>
            <div class="right-main" :class="{ 'index' : isIndex }">
                <Breadcrumb v-if="!isIndex"></Breadcrumb>
                <el-config-provider :locale="locale">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"></component>
                        </keep-alive> 
                        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"></component>
                    </router-view>
                </el-config-provider>
            </div>
        </div>
    </div>
    <router-view v-else />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import WebHeader from '@/components/web-header/index.vue'
import Menu from './components/menu.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { notLogin } from './router/index'

const route = useRoute()
const locale = ref(zhCn)

const isIndex = computed(() => {
    return route.name === 'index'
})
const login = computed(() => {
    if (notLogin.includes(route.path)) {
        return false
    }
    return true
})


</script>

<style lang="less">
.mainBody {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
    width: auto;
    
    /*主体内容区*/
    .right-main {
        flex: 1;
        padding: 0 40px 40px 240px;
        background: #fff;
        &.index {
            padding: 0 40px 40px 40px;
        }
    }
}


</style>