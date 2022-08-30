<template>
    <el-form :inline="true">
        <el-button type="primary" @click="onEdit(copyForm)">增加</el-button>
    </el-form>
    <el-table border :data="culumnList" row-key="id" default-expand-all class="mt20">
        <el-table-column label="页面名称" prop="name"></el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="显示状态">
            <template #default="scope">{{$filters.isOpen(scope.row.isVisible)}}</template>
        </el-table-column>
        <el-table-column label="启用状态">
            <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="onEdit(scope.row)" type="primary" link >编辑</el-button>
                <el-button @click="onEdit({...copyForm, parentId: scope.row.id})" type="primary" link>增加下级</el-button>
                <el-button @click="onDelete(scope.row.id)" type="primary" link>删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog :title="form?.id ? '编辑页面': '增加页面'" v-model="dialogVisible" width="500px" center>
        <el-form label-width="120px">
            <el-form-item label="页面名称：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="页面url：">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="父节点：">
                <el-cascader 
                    v-model="form.parentId"
                    :options="culumnList"
                    :props="{checkStrictly: true, value: 'id', label: 'name'}" 
                    clearable
                />
            </el-form-item>
            <el-form-item label="显示状态：">
                <el-checkbox v-model="form.isVisible"></el-checkbox>
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
import { onMounted, ref } from 'vue'
import { getColumnList, deleteColumn, updateColumn, addeColumn } from '@/api/getData'
import type { Models } from '@/rapper'
import useMessageBox from '@/hooks/useMessageBox'

type ColumnModel = Models['POST/admin/column/update']['Req']
type ColumnInfo = Models['GET/admin/column/list']['Res']['data']['list'][0]

let culumnList = ref<ColumnInfo[]>([])
let copyForm = ref<ColumnModel>()
let form = ref<ColumnModel>({
    id: 0,
    isOpen: false,
    isVisible: true,
    name: '',
    url: '',
    sort: 10,
    parentId: 0
})
let dialogVisible = ref(false)

onMounted(() => {
    copyForm.value = {...form.value}
    getData()
})

const getData = async() => {
    const res = await getColumnList()
    culumnList.value = res.list
}

const onEdit = (row) => {
    form.value = { ...row }
    dialogVisible.value = true
}

const onDelete = async(id: number) => {
    await useMessageBox()
    await deleteColumn({id})
    getData()
}

const onSubmit = async() => {
    // 修改过父节点，绑定的值变成数组
    let parentId: number
    if (typeof form.value.parentId === 'number') {
        parentId = form.value.parentId
    } else {
        // @ts-ignore
        parentId = form.value.parentId.at(-1)
    }

    if (form.value.id) {
        await updateColumn({...form.value, parentId })
    } else {
        await addeColumn({
            name: form.value.name,
            url: form.value.url,
            sort: form.value.sort,
            isOpen: form.value.isOpen,
            isVisible: form.value.isVisible,
            parentId
        })
    }
    dialogVisible.value = false
    getData()
}

</script>
