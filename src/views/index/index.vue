<template>
    <div class="index-container">
        <div class="top">
            <div class="title">下午好！{{store.user.username}}</div>
            <div class="content">
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store'
const store = useStore()
</script>
<style lang="less" scoped>
.index-container {
    background: #f5f5f5;
    .top {
        padding-bottom: 50px;
        background: #fff;
        .title {
            height: 60px;
            line-height: 60px;
            font-size: 18px;
            color: #606266;
        }
        .content {
            display: flex;
            margin-top: 10px;
        }
    }
}
</style>
