<template>
	<div class="wrap">
        <header class="v-header">
            <div class="logo">后台管理系统</div>
            <div class="nav">
                <el-menu  :default-active="navIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item :index="item.url" :key="index" v-for="(item,index) in group">{{item.name}}</el-menu-item>
                    <el-sub-menu index="5">
                        <template #title>角色账号</template>
                        <el-menu-item index="userInfo">个人信息</el-menu-item>
                        <el-menu-item index="editPasswrod">修改</el-menu-item>
                        <el-menu-item index="loginOut">登出</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </header>

        <div class="mainBody" id="mainBody">
            <router-view />
        </div>

        <!-- 弹出框-个人信息 -->
        <el-dialog
            title="个人信息"
            v-model="userInfoVisible"
            width="30%"
            class="userInfo">
            <el-form ref="form" :model="userInfo" label-width="80px">
                <el-form-item label="用户名：">{{userInfo.username}}</el-form-item>
                <el-form-item label="姓名：">{{userInfo.realName}}</el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userInfoVisible = false">取 消</el-button>
                <el-button type="primary" @click="userInfoVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 弹出框-修改密码 -->
        <el-dialog title="修改密码" v-model="editPasswordVisible" width="30%" class="editPassword">
            <el-form ref="form" :model="editPassword" label-width="100px">
                <el-form-item label="用户名：">{{userInfo.username}}</el-form-item>
                <el-form-item label="旧密码：">
                    <el-input type="password" v-model="editPassword.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码：">
                    <el-input type="password" v-model="editPassword.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码：">
                    <el-input type="password" v-model="confirmNewPassword"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="reset">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { reactive, onMounted, ref } from 'vue'
import validator from '../utils/validator'
import { getUserInfo, resetPassword } from '../api/getData'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification, ElMessageBox } from 'element-plus'
import { useStore } from '../store/index'

const store = useStore()
let navIndex = ref<string>('/')
let group = ref([
    {
        url: '/',
        name: '首页',
    },
    {
        url: '/business',
        name: '前台业务'
    },
    {
        url: '/system',
        name: '系统管理'
    },
    {
        url: '/data',
        name: '数据管理'
    }
])
let userInfo = ref({}) // 用户信息
let userInfoVisible = ref<boolean>(false) // 用户信息-弹窗
let editPasswordVisible = ref<boolean>(false) // 修改密码-弹窗
let editPassword = ref({ // 修改密码-表单
    password: '',
    newPassword: ''
})
let router = ref({})
let confirmNewPassword = ref<string>('') // 确认密码

onMounted(() => {
    router = useRouter()
    const path = useRoute().path
    if (path.indexOf('/business') > -1) {
        navIndex = '/business'
    }
    if (path.indexOf('/system') > -1) {
        navIndex = '/system'
    }
    if (path.indexOf('/data') > -1) {
        navIndex = '/data'
    }
    _getUserInfo()
})

const _getUserInfo = async() => {
    const data: any = await getUserInfo()
    userInfo.value = data
    store.updateUser({
        username: data.username
    })
}

const handleSelect = async(key: any) => {
    switch (key) {
        case '/':
            router.push({name: 'index'})
            break
        case '/business':
            router.push({path: '/business/goods/index'})
            break
        case '/system':
            router.push({path: '/system/setting/website'})
            break
        case '/data':
            router.push({path: '/data/type/basis-list'})
            break
        case 'userInfo':
            userInfoVisible.value = true
            break
        case 'editPasswrod':
            editPasswordVisible.value = true
            break
        case 'loginOut':
            ElMessageBox.confirm('是否确认退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                window.localStorage.clear()
                router.push('/')
            })
    }
}

const reset = async() => {
    if (validator.pass(editPassword.password)) {
        ElNotification({
            title: '提示',
            message: validator.pass(editPassword.password),
            type: 'warning'
        })
        return
    }
    if (!editPassword.newPassword) {
        ElNotification({
            title: '提示',
            message: '请输入新密码',
            type: 'warning'
        })
        return
    }
    if (!confirmNewPassword) {
        ElNotification({
            title: '提示',
            message: '请再次输入新密码',
            type: 'warning'
        })
        return
    }
    if (editPassword.newPassword !== confirmNewPassword) {
        ElNotification({
            title: '提示',
            message: '两次输入的密码不一致',
            type: 'warning'
        })
        return
    }
    try {
        let data: any = await resetPassword({
            password: editPassword.password,
            newPassword: editPassword.newPassword
        })
        ElNotification({
            title: '成功',
            message: data,
            type: 'success'
        })
    } catch(e) {
        ElNotification({
            title: '错误',
            message: e.data,
            type: 'error'
        })
        return
    }
    editPasswordVisible.value = false
}

const out = () => {
    router.push({path: '/'})
}

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
.mainBody {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
    width: auto;
    /*左边导航*/
    .el-aside {
        position: fixed;
        top: 80px;
        left: 0;
        bottom: 0;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        .el-menu {
            border-right: none;
        }
    }
    /*主体内容区*/
    .right-main {
        flex: 1;
        padding: 0 40px 40px 240px;
        background: #fff;
    }
}
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