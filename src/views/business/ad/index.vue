<template>
    <Table :api="getAdList" :search="searchList" ref="tableRef">
        <template #btns>
            <el-button type="primary" @click="$router.push({ path: '/business/ad/add' })">新建</el-button>
        </template>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="类型" prop="positionTitle"></el-table-column>
        <el-table-column label="图片" prop="imageUrl">
            <template #default="scope">
                <img :src="scope.row.imageUrl" class="v-table-image">
            </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="状态">
            <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150px;">
            <template #default="scope">
                <el-button @click="$router.push({name:'adInfo',params:{id: scope.row.id}})" type="primary" link>编辑</el-button>
                <el-button @click="onDelete(scope.row.id)" type="primary" link>删除</el-button>
            </template>
        </el-table-column>
    </Table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/components/table/index.vue'
import { getAdList, getAdPositionList, deleteAd } from '@/api/getData'
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
        field: 'positionId',
        type: 'select',
        value: '',
        api: getAdPositionList,
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
    await deleteAd({id})
    tableRef.value.refresh()
}
</script>