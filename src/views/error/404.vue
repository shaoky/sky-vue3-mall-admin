<template>
    <div class="main">
        <img src="@/assets/images/404.jpg">
        <div class="text">
            <el-button @click="$router.push({path: url})" type="primary">返回首页</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '@/store'
let store = useStore()
let url = ref('')

if (store.menuList.length) {
    url.value = store.menuList[0].url
} else {
    url.value = '/'
}

</script>
<style lang="less" scoped>
.main {
    text-align: center;
}
</style>