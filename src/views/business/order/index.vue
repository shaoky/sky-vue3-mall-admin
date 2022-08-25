<template>
    <Table :api="getOrderList" :search="searchList">
        <el-table-column label="订单号" prop="no" width="200"></el-table-column>
        <el-table-column label="订单类型" prop="statusName"></el-table-column>
        <el-table-column label="收货人" prop="userName"></el-table-column>
        <el-table-column label="订单金额" prop="totalMoney"></el-table-column>
        <el-table-column label="应付金额" prop="payMoney"></el-table-column>
        <el-table-column label="下单时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="150px;">
            <template #default="scope">
                <el-button @click="$router.push({name: 'orderInfo', params: {id: scope.row.id}})" type="primary" link>订单详情</el-button>
            </template>
        </el-table-column>
    </Table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/components/table/index.vue'
import { getOrderList } from '@/api/getData'
import { SearchModel } from '@/components/search/interface'

let searchList = ref<SearchModel[]>([
    {
        label: '订单号',
        field: 'no',
        type: 'text',
        value: '',
    },
    {
        label: '状态',
        field: 'status',
        type: 'select',
        value: '',
        items: [
            {value: 0, label: '全部'}, 
            {value: 1, label: '未付款'}, 
            {value: 2, label: '待发货'}, 
            {value: 3, label: '已发货'}, 
            {value: 4, label: '交易完成'}, 
            {value: 7, label: '已取消'}
        ]
    }
])

</script>