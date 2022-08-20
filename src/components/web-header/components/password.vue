<template>
    <el-dialog title="修改密码" v-model="editPasswordVisible" width="30%">
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
</template>

<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import validator from '@/utils/validator'
import { resetPassword } from '@/api/getData'
import { Models } from '@/rapper'
type UserInfoModel = Models['GET/admin/user/admin/info']['Res']['data']

let editPasswordVisible = ref(false)
let editPassword = ref({
    password: '',
    newPassword: ''
})
let confirmNewPassword = ref('')

defineProps<{userInfo: UserInfoModel}>()

const open = () => {
    editPasswordVisible.value = true
}

const reset = async() => {
    if (validator.pass(editPassword.value.password)) {
        ElNotification({
            title: '提示',
            message: validator.pass(editPassword.value.password),
            type: 'warning'
        })
        return
    }
    if (!editPassword.value.newPassword) {
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
    if (editPassword.value.newPassword !== confirmNewPassword.value) {
        ElNotification({
            title: '提示',
            message: '两次输入的密码不一致',
            type: 'warning'
        })
        return
    }
    await resetPassword({
        password: editPassword.value.password,
        newPassword: editPassword.value.newPassword
    })
    editPasswordVisible.value = false
}

defineExpose({open})
</script>
