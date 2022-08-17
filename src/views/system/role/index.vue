<template>
    <el-button type="primary" @click="onEdit({})">添加角色</el-button>
    <el-table border :data="roleList" class="mt20">
        <el-table-column label="角色" prop="name"></el-table-column>
        <el-table-column label="描述" prop="remark"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="onEdit(scope.row)" type="primary" link >编辑</el-button>
                <el-button @click="onPermissions(scope.row)" type="primary" link >分配权限</el-button>
                <el-button @click="onDelete(scope.row.id)" type="primary" link>删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <Permissions ref="PermissionsRef" @success="getData"></Permissions>

    <el-dialog :title="form?.id ? '编辑管理员': '增加管理员'" v-model="dialogVisible" width="500px" center>
        <el-form label-width="120px">
            <el-form-item label="角色账号：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input v-model="form.remark" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </span>
    </el-dialog>
    
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRoleList, addRole, deleteRole, updateRole } from '@/api/getData'
import type { Models } from '@/rapper'
import Permissions from './components/permissions.vue'

type RoleModel = Models['POST/admin/role/update']['Req']
type RoleInfoModel = Models['GET/admin/role/list']['Res']['data']['list'][0]

let route = useRoute()
let PermissionsRef = ref()
let parentId = ref(0)
let roleList = ref<RoleInfoModel[]>([])
let dialogVisible = ref(false)
let form = ref<RoleModel>({
    id: 0,
    name: '',
    remark: ''
})

onMounted(() => {
    getData()
})

const getData = async() => {
    const res = await getRoleList()
    roleList.value = res.list
}

const onEdit = (row) => {
    form.value = { ...row }
    dialogVisible.value = true
}

const onDelete = async(id: number) => {
    await deleteRole({id})
}

const onSubmit = async() => {
    if (form.value.id) {
        await updateRole({
            id: form.value.id,
            name: form.value.name!,
            remark: form.value.remark!
        })
    } else {
        await addRole({
            name: form.value.name!,
            remark: form.value.remark!
        })
    }
    getData()
    dialogVisible.value = false
}

const onPermissions = (row) => {
    PermissionsRef.value.open(row)
}

</script>