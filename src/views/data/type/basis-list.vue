<template>
    <Table
        :api="getGoodsTypeList"
        :apiParams="{ type: 2 }"
        :pagination="false"
        row-key="id"
        ref="tableRef"
    >
        <template #btns>
            <el-button type="primary" @click="onEdit({})">新建</el-button>
        </template>
        <el-table-column label="分类名称" prop="title"></el-table-column>
        <el-table-column label="排序" prop="sort" width="80px;"></el-table-column>
        <el-table-column label="分类图标" width="180px;">
            <template #default="scope">
                <img :src="scope.row.imageUrl" class="v-table-image">
            </template>
        </el-table-column>
        <el-table-column label="状态" width="80px;">
            <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="340px">
            <template #default="scope">
                <el-button type="primary" link @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="primary" link @click="onEdit({parentId: scope.row.id})">添加子类</el-button>
                <el-button type="primary" link @click="$router.push({name: 'goodsAttr', params: {id: scope.row.id}})">查看属性</el-button>
                <el-button type="primary" link @click="$router.push({name: 'goodsSpec', params: {id: scope.row.id}})">查看规格</el-button>
                <el-button type="primary" link @click="onDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </Table>

    <el-dialog :title="form.id ? '编辑分类' : '新增分类'" v-model="dialogVisible" width="500px" center>
        <el-form label-width="120px">
            <el-form-item label="分类名称：">
                <el-input style="max-width:300px;" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="分类排序：">
                <el-input style="width:300px;" v-model.number="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="分类图片：">
                <upload-image :imageUrl="form.imageUrl" @success="handleAvatarSuccess"></upload-image>
            </el-form-item>
            <el-form-item label="是否启用：">
                <el-checkbox v-model="form.isOpen"></el-checkbox>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/components/table/index.vue'
import { getGoodsTypeList, addGoodsType, updateGoodsType, deleteGoodsType } from '@/api/getData'
import useMessageBox from '@/hooks/useMessageBox'
import UploadImage from '@/components/upload/image.vue'

let tableRef = ref()
let dialogVisible =  ref(false)
let form = ref({
    id: 0,
    title: '',
    isOpen: true,
    imageUrl: '',
    sort: 10
})

const handleAvatarSuccess = (url: string) => {
    form.value.imageUrl = url
}

const onEdit = (row) => {
    form.value = { ...row }
    dialogVisible.value = true
}

const onDelete = async(id: number) => {
    await useMessageBox()
    await deleteGoodsType({id})
    tableRef.value.refresh()
}

const onSubmit = async() => {
    if (form.value.id) {
        await updateGoodsType(form.value)
    } else {
        await addGoodsType(form.value)
    }
    dialogVisible.value = false
    tableRef.value.refresh()
}
</script>