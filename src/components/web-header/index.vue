<template>
    <header class="v-header">
        <div class="logo">后台管理系统</div>
        <div class="nav" v-if="init">
            <el-menu 
                class="el-menu-demo"
                :default-active="navIndex"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
            >
                <el-menu-item :index="item.url" :key="index" v-for="(item,index) in group">{{item.name}}</el-menu-item>
                <el-sub-menu index="5">
                    <template #title>角色账号</template>
                    <el-menu-item index="userInfo">个人信息</el-menu-item>
                    <el-menu-item index="editPasswrod">修改密码</el-menu-item>
                    <el-menu-item index="loginOut">登出</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </header>
    <UserInfo ref="userInfoRef" :userInfo="userInfo"></UserInfo>
    <Password ref="passwordRef" :userInfo="userInfo"></Password>

</template>

<script lang="ts" setup name="hedaer">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { getUserInfo } from '@/api/getData'
import { useStore } from '@/store/index'
import UserInfo from './components/userInfo.vue'
import Password from './components/password.vue'
import { Models } from '@/rapper'

type UserInfoModel = Models['GET/admin/user/admin/info']['Res']['data']

const route = useRoute()
const router = useRouter()
const store = useStore()
let init = ref(false)
let userInfoRef = ref()
let passwordRef = ref()
let navIndex = ref('/index')
let userInfo = ref<UserInfoModel>({
    username: '',
    realName: '',
    columnList: []
}) // 用户信息

onMounted(() => {
    getUser()
})

const group = computed((): any => {
    return userInfo.value.columnList.map(item => ({
        name: item.name,
        url: item.url
    }))
})

const getUser = async() => {
    const data = await getUserInfo()
    userInfo.value = data
    store.updateUser({
        username: data.username
    })
    // 获取当前页面url的第一层
    for(let item of userInfo.value.columnList) {
        for(let item1 of item.children) {
            for (let item2 of item1.children) {
                if (item2.url === route.path) {
                    navIndex.value = item.url
                    break
                }
            }
        }
    }
    setMentList(navIndex.value)
    init.value = true
}

const handleSelect = async(key: string) => {
    let find = group.value.find(item => item.url === key)
    if (find) {
        setMentList(find.url)
        router.push({
            path: find.url
        })
    }
    

    switch (key) {
        case 'userInfo':
            userInfoRef.value.open()
            break
        case 'editPasswrod':
            passwordRef.value.open()
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

const setMentList = (path: string) => {
    const menuList = userInfo.value.columnList.find(item => item.url === path)?.children
    menuList && store.updateMent(menuList)
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