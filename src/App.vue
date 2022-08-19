<template>
	<div class="wrap">
        <web-header></web-header>
        <div class="mainBody" id="mainBody">
            <Menu v-if="!isIndex"></Menu>
            <div class="right-main" :class="{ 'index' : isIndex }">
                <Breadcrumb v-if="!isIndex"></Breadcrumb>
                <router-view />
            </div>
        </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WebHeader from '@/components/web-header/index.vue'
import Menu from './components/menu.vue'
import Breadcrumb from '@/components/breadcrumb.vue'

const route = useRoute()
const isIndex = computed(() => {
    return route.name === 'index'
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