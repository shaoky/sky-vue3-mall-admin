<template>
    <el-dialog title="个人信息" v-model="userInfoVisible" width="30%">
        <el-form ref="form" :model="userInfo" label-width="80px">
            <el-form-item label="用户名：">{{userInfo.username}}</el-form-item>
            <el-form-item label="姓名：">{{userInfo.realName}}</el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="userInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="userInfoVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Models } from '@/rapper'
type UserInfoModel = Models['GET/admin/user/admin/info']['Res']['data']

let userInfoVisible = ref(false)

defineProps<{userInfo: UserInfoModel}>()

const open = () => {
    userInfoVisible.value = true
}

defineExpose({open})
</script>

<style lang="less" scoped>
.v-header {
    display: flex;
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background: #007cfc;
    overflow: hidden;
    .logo {
        flex: 1;
        padding-left: 50px;
        font-size: 26px;
        line-height: 80px;
        color: #fff;
    }
    .nav {
        display: flex;
        align-items: center;
        margin-right: 52px;
        .el-menu-demo {
            background-color: transparent;
            border-bottom: none;
        }
        .el-menu--horizontal>.el-menu-item {
            height: 53px;
        }
    }
}
</style>
