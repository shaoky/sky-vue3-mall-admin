<template>
    <el-button type="primary" @click="onEdit(copyForm)">添加管理员</el-button>
    <el-table border :data="userList" class="mt20">
        <el-table-column label="页面名称" prop="username"></el-table-column>
        <el-table-column label="姓名" prop="realName"></el-table-column>
        <el-table-column label="状态">
            <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="onEdit(scope.row)" type="primary" link >编辑</el-button>
                <el-button @click="onDelete(scope.row.id)" type="primary" link>删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <pagination @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="count"></pagination>

    <el-dialog :title="form?.id ? '编辑管理员': '增加管理员'" v-model="dialogVisible" width="500px" center>
        <el-form label-width="120px">
            <el-form-item label="登录账号：">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" v-if="!form.id">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
                <el-input v-model="form.realName"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input v-model="form.remark" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="选择角色：">
                <el-select v-model="form.roleId" placeholder="选择角色">
                    <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="启用状态：">
                <el-checkbox v-model="form.isOpen"></el-checkbox>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </span>
    </el-dialog>
    
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getAdminUserList, addAdminUser, updateAdminUser, deleteAdminUser, getRoleList } from '@/api/getData'
import type { Models } from '@/rapper'

type RoleModel = Models['GET/admin/role/list']['Res']['data']['list'][0]
type UserInfoModel = Models['GET/admin/user/admin/list']['Res']['data']['list'][0]

let route = useRoute()
let parentId = ref(0)
let userList = ref<UserInfoModel[]>([])
let search = ref({
    page: 1,
    size: 10,
    status: undefined
})
let count = ref(0)
let dialogVisible = ref(false)
let copyForm = ref()
let form = ref({
    id: 0,
    username: '',
    password: '',
    remark: '',
    realName: '',
    isOpen: false,
    roleId: ''
})
let roleList = ref<RoleModel[]>([])

onMounted(() => {
    copyForm.value = {...form.value}
    getRole()
})

const getData = async() => {
    const res = await getAdminUserList(search.value)
    userList.value = res.list
    count.value = res.count
}

const getRole = async() => {
    const data = await getRoleList()
    roleList.value = data.list
}

const onEdit = (row) => {
    form.value = { ...row }
    dialogVisible.value = true
}

const onDelete = async(id: number) => {
    await deleteAdminUser({id})
}

const onSubmit = async() => {
    if (form.value.id) {
        await updateAdminUser({
            id: form.value.id,
            username: form.value.username,
            realName: form.value.realName,
            isOpen: form.value.isOpen,
            remark: form.value.remark,
            roleId: +form.value.roleId
        })
    } else {
        await addAdminUser({
            password: form.value.password,
            username: form.value.username,
            realName: form.value.realName,
            isOpen: form.value.isOpen,
            remark: form.value.remark,
            roleId: +form.value.roleId
        })
    }
    dialogVisible.value = false
    getData()
}

const handleCurrentChange = (value: number) => {
    search.value.page = value
    getData()
}

const handleSizeChange = (value: number) => {
    search.value.size = value
    getData()

}

watchEffect(() => {
    parentId.value = Number(route.query.parentId) || 0
    getData()
})

</script>