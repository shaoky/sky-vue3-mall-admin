<template>
    <div class="login">
        <div class="box">
            <div class="login-title">管理后台</div>
            <div class="login-title1">为您提供真实可信的数据服务</div>
            <div class="login-box">
                <div class="box-title">登录账号</div>
                <div class="box-container">
                    <div class="item">
                        <div class="icon">
                            账号
                        </div>
                        <el-input v-model="account.username" @keyup.enter.native="login" placeholder="手机号/用户名"></el-input>
                    </div>
                    <div class="item password">
                        <div class="icon">
                            密码
                        </div>
                        <el-input v-model="account.password" @keyup.enter.native="login" type="password" placeholder="请输入密码"></el-input>
                    </div>
                </div>
                <div class="submit-btn" @click="onLogin">登录</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-ignore
import { reactive } from 'vue'
import { login } from '../../api/getData'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useStore } from '../../store/index'

let account = reactive({
    username: '',
    password: ''
})

let store = useStore()
let router = useRouter()

const onLogin = async() => {
    try {
        const loginInfo: any = await login(account)
        store.updateUser({
            username: loginInfo.username
        })
        window.localStorage.setItem('token', loginInfo.token)
        router.push({ name: 'index' })
    } catch (e) {
        ElNotification({
            title: '提示',
            message: e.error,
            type: 'warning'
        })
    }
}
</script>

<style lang="less" scoped>
.login {
    .box {
        width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    height: 1080px;
    background: url('./assets/bg.png');
    background-position: top center;
    position:relative;
    .login-title {
        position: absolute;
        top: 170px;
        left: 0;
        font-size: 26px;
        color: #fff;
    }
    .login-title1 {
        position: absolute;
        top: 560px;
        left: 90px;
        font-size: 26px;
        color: #fff;
    }
    .login-box {
        width: 400px;
        height: 520px;
        background:#fff;
        float: left;
        margin: 178px 0 0 745px;
        .box-title {
            font-size: 30px;
            color:#2ca3ff;
            text-align: center;
            padding-top: 55px;
        }
        .box-container {
            width: 320px;
            margin: 0 auto;
            margin-top: 52px;
            .item {
                height: 50px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                border: 1px solid #becef5;
                .icon {
                    width: 70px;
                    height: 50px;
                    line-height: 50px;
                    text-indent: 12px;
                    font-size: 20px;
                    color: #88a4e8;
                    margin-right: 2px;
                }
                :deep(.el-input__inner) {
                    height: 28px;
                    line-height: 28px;
                    border: none;
                }
                &.password {
                    margin-top: 37px;
                }
            }
        }
        .submit-btn {
            width: 320px; margin: 0 auto;
            height: 54px;
            line-height: 54px;
            text-align: center;
            font-size: 20px;
            color:#fff;
            background-image: -webkit-gradient(linear, left top, right top, from(rgba(39, 158, 255, 1)), to(rgba(6, 120, 254, 1)));
            margin: 0 auto;
            margin-top: 72px;
            cursor: pointer;
        }
    }
    .footer {
        float: left;
        width: 100%;
        margin-top: 310px;
        text-align: center;
        color: #fff;
        span {
            margin-left: 15px;
        }
    }
}
</style>
