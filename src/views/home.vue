<template>
	<div class="wrap">
        <web-header></web-header>
        <div class="mainBody" id="mainBody">
            <Menu v-if="$route.name !== 'index'"></Menu>
            <div class="right-main">
                <router-view />
            </div>
        </div>
  </div>
</template>

<script lang="ts" setup>
import WebHeader from '@/components/web-header/index.vue'
import Menu from '../components/menu.vue'


</script>

<style lang="less" scoped>


</style>
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
    }
}


</style>