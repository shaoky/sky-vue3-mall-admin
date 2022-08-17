<template>
    <el-drawer v-model="drawer" direction="rtl">
        <template #title>
            <div class="title">角色权限配置</div>
        </template>
        <template #default>
            <el-tree
                ref="treeRef"
                :data="columnList"
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                :props="defaultProps"
            />
        </template>
        <template #footer>
            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onConfirm">保存</el-button>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref, defineExpose, defineEmits, defineProps } from 'vue'
import { getColumnList, updateRole } from '@/api/getData'
import type { Models } from '@/rapper'

type RoleModel = Models['GET/admin/role/list']['Res']['data']['list'][0]

let treeRef = ref()
let drawer = ref(false)
const defaultProps = {
    children: 'children',
    label: 'label',
}
let form = ref<RoleModel>()
let columnList = ref<RoleModel[]>()

const emit = defineEmits(['success'])

const getData = async() => {
    const res = await getColumnList({isOpen: 1})
    columnList.value = JSON.parse(JSON.stringify(res.list).replace(/name/g, 'label'))
}

const onCancel = () => {
    drawer.value = false
}

const onConfirm = async() => {
    const columnIds = treeRef.value.getCheckedKeys()
    await updateRole({
        id: form.value!.id,
        columnIds: columnIds.join(',')
    })
    emit('success')
    onCancel()
}

const open = async(row) => {
    form.value = row
    const columnIds = form.value!.columnIds?.split(',').map(item => Number(item)) || []
    drawer.value = true
    if (!columnList.value) {
        await getData()
    }
    treeRef.value!.setCheckedKeys(columnIds, false)
}

defineExpose({open})
</script>
<style lang="less" scoped>
:deep(.el-form-item__content) {
    padding-right: 50px;
}
</style>