<template>
    <Table :api="getGoodsList" :search="searchList" ref="tableRef">
        <template #btns>
            <el-button type="primary" @click="$router.push({ path: '/business/article/add' })">新建</el-button>
        </template>
        <el-table-column label="标题" prop="title" min-width="200"></el-table-column>
        <el-table-column label="类型" prop="goodsClassName"></el-table-column>
        <el-table-column label="图片" prop="imageUrl">
            <template #default="scope">
                <img :src="scope.row.imageUrl" class="v-table-image">
            </template>
        </el-table-column>
        <el-table-column label="价格" prop="price" sortable></el-table-column>
        <el-table-column label="销量" prop="saleCount" sortable></el-table-column>
        <el-table-column label="库存" prop="stock" sortable></el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="状态" width="80">
            <template #default="scope">
                 <el-switch v-model="scope.row.isOpen" @change="setIsOpen(scope.row)" />
            </template>
        </el-table-column>
        <el-table-column label="操作" width="160px;">
            <template #default="scope">
                <el-button @click="$router.push({name: 'goodsInfo', params: {id: scope.row.id}})" type="primary" link>编辑</el-button>
                <el-button @click="onDelete(scope.row.id)" type="primary" link>删除</el-button>
            </template>
        </el-table-column>
    </Table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/components/table/index.vue'
import { getGoodsList, getGoodsTypeList, deleteGoods, setGoodsIsOpen } from '@/api/getData'
import useMessageBox from '@/hooks/useMessageBox'
import { SearchModel } from '@/components/search/interface'

let tableRef = ref()

let searchList = ref<SearchModel[]>([
    {
        label: '标题',
        field: 'title',
        type: 'text',
        value: '',
    },
    {
        label: '类型',
        field: 'goodsClassId',
        type: 'cascader',
        value: '',
        api: getGoodsTypeList,
        params: {
            type: 2
        },
        props: {
            label: 'title',
            value: 'id'
        }
    },
    {
        label: '状态',
        field: 'isOpen',
        type: 'select',
        value: '',
        items: [
            {
                label: '全部',
                value: '',
            },
            {
                label: '未发布',
                value: 0,
            },
            {
                label: '已发布',
                value: 1,
            },
        ]
    }
])

const onDelete = async(id: number) => {
    await useMessageBox()
    await deleteGoods({id})
    tableRef.value.refresh()
}

const setIsOpen = async(data) => {
    await setGoodsIsOpen({
        id: data.id,
        isOpen: data.isOpen ? 1 : 0
    })
}
</script>