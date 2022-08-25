<template>
    <Table :api="getAdPositionList" :pagination="false" ref="tableRef">
        <template #btns>
            <el-button type="primary" @click="onEdit({})">新建类型</el-button>
        </template>
        <el-table-column label="广告位名称" prop="title"></el-table-column>
            <el-table-column label="广告位描述" prop="description"></el-table-column>
            <el-table-column label="广告位宽度" prop="width"></el-table-column>
            <el-table-column label="广告位高度" prop="height"></el-table-column>
            <el-table-column label="广告位标识码" prop="mark"></el-table-column>
            <el-table-column label="状态">
                <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
        <el-table-column label="操作" width="150px;">
            <template #default="scope">
                <el-button type="primary" link @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="primary" link @click="onDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </Table>

    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="dialogVisible" width="500px" center>
        <el-form label-width="120px">
            <el-form-item label="广告位名称：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="广告位描述：">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="广告位宽度：">
                <el-input v-model.number="form.width"></el-input>
            </el-form-item>
            <el-form-item label="广告位高度：">
                <el-input v-model.number="form.height"></el-input>
            </el-form-item>
            <el-form-item label="广告位标识码：">
                <el-input v-model="form.mark"></el-input>
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

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/components/table/index.vue'
import { getAdPositionList, deleteAdPosition, addAdPosition, updateAdPosition } from '@/api/getData'
import useMessageBox from '@/hooks/useMessageBox'

let tableRef = ref()
let form = ref({
    id: 0,
    title: '',
    description: '',
    width: 0,
    height: 0,
    mark: '',
    isOpen: true
})
let dialogVisible = ref(false)

const onEdit = (row) => {
    form.value = { ...row }
    dialogVisible.value = true
}

const onDelete = async(id: number) => {
    await useMessageBox()
    await deleteAdPosition({id})
    tableRef.value.refresh()
}

const onSubmit = async () => {
    if (form.value.id) {
        await updateAdPosition(form.value)
    } else {
        await addAdPosition(form.value)
    }
    dialogVisible.value = false
    tableRef.value.refresh()
}

</script>
