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
let navIndex = ref('/index') // 导航栏默认选中状态
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
    store.updateMent(userInfo.value.columnList)
   
    const title = route.matched[0].meta.title
    const find = userInfo.value.columnList.find(item => item.name === title)
    if (find) {
        navIndex.value = find.url
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

/**
 * 设置左边列表
 */
const setMentList = (path: string) => {
    let menuList = userInfo.value.columnList.find(item => item.url === path)?.children || []
    menuList && store.updateMentAside(menuList)
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

:deep(.el-menu--horizontal>.el-menu-item) {
    padding: 0 10px;
    margin: 0 21px;
    color: #fff;
    font-size: 16px;
    &.is-active {
        color: #fff!important;
    }
    &:hover {
        color: #fff!important;
    }
    .el-sub-menu__title {
        color: #fff!important; font-size: 16px;
    }
}
.el-menu-item:focus, .el-menu-item:hover{
    background-color: transparent!important;
}
:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title){
    color: #fff;
    font-size: 16px;
    &:hover {
        opacity: .8;
        background-color: transparent; 
        color: #fff;
    }
}
</style>