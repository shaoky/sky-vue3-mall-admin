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
import { ref, defineProps, defineExpose } from 'vue'
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

<style lang="less">
/*
 * 导航样式覆盖
 */

// 默认颜色
.el-menu--horizontal>.el-menu-item {
    padding: 0 10px;
    margin: 0 21px!important;
    color: #fff!important;
    font-size: 16px;
}
// 选中颜色
.el-menu--horizontal>.el-menu-item.is-active {
    color: #fff!important;
    opacity: .8;
    border-bottom: 2px solid #fff;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{color: #fff;}
// 选中背景颜色
.el-menu--horizontal>.el-menu-item:hover{background-color: transparent!important;}
.el-menu-item:focus, .el-menu-item:hover{background-color: transparent!important;}
// 二级下拉
.el-menu--horizontal>.el-sub-menu.is-active .el-submenu__title{opacity: .8; color: #fff;}
.el-menu--horizontal>.el-sub-menu .el-sub-menu__title{color: #fff!important; font-size: 16px;} // 文字
.el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover{opacity: .8; background-color: transparent!important; color: #fff!important;}
.el-menu--horizontal .el-sub-menu__title i{color: #fff;} // 箭头
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title{color: #303133;}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title:hover{color: #303133;}
.el-menu--horizontal .el-menu .el-menu-item:hover{color: #f00!important;} // 鼠标经过
.el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu__title:hover{color: #f00;} // 选中
</style>