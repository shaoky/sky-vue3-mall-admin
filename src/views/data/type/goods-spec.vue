<template>
    <Table :api="getGoodsSpecList" :api-params="{goodsClassId: initForm.goodsClassId}" :pagination="false" ref="tableRef">
        <template #btns>
            <el-button type="primary" @click="onEdit(initForm)">新增</el-button>
        </template>
        <el-table-column label="规格名称" prop="name"></el-table-column>
        <el-table-column label="可选列表" prop="content"></el-table-column>
        <el-table-column label="排序" prop="sort" width="80px;"></el-table-column>
        <el-table-column label="状态" width="80px;">
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
            <el-form-item label="规格名称：">
                <el-input style="max-width:300px;" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="可选值：">
                <el-input style="width:300px;" v-model="form.content"></el-input>
                多个值用,隔开
            </el-form-item>
            <el-form-item label="排序：">
                <el-input style="width:300px;" v-model.number="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否启用：">
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
import { getGoodsSpecList, addGoodsSpec, updateGoodsSpec, deleteGoodsSpec } from '@/api/getData'
import useMessageBox from '@/hooks/useMessageBox'
import { useRoute } from 'vue-router'

let route = useRoute()
let tableRef = ref()
let initForm = ref({
    goodsClassId: 0,
    sort: 10,
    type: 1
})
let form = ref({
    id: 0,
    name: '',
    sort: 0,
    content: '',
    isOpen: true,
    goodsClassId: 0
})
let dialogVisible = ref(false)

initForm.value.goodsClassId = Number(route.params.id) 

const onEdit = (row) => {
    form.value = { ...row }
    dialogVisible.value = true
}

const onDelete = async(id: number) => {
    await useMessageBox()
    await deleteGoodsSpec({id})
    tableRef.value.refresh()
}

const onSubmit = async() => {
    if (form.value.id) {
        await updateGoodsSpec(form.value)
    } else {
        await addGoodsSpec(form.value)
    }
    dialogVisible.value = false
    tableRef.value.refresh()
}

</script>
