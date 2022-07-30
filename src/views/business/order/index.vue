<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="订单号：">
                <el-input v-model="form.no"></el-input>
            </el-form-item>
            <el-form-item label="状态：" >
                <el-select v-model="form.status" @change="_getOrderList" placeholder="请选择状态">
                    <el-option  v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="_getOrderList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$router.push({ path: '/business/goods/add' })">新建产品</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="订单号" prop="no" width="200"></el-table-column>
            <el-table-column label="订单类型" prop="statusName"></el-table-column>
            <el-table-column label="收货人" prop="userName"></el-table-column>
            <el-table-column label="订单金额" prop="totalMoney"></el-table-column>
            <el-table-column label="应付金额" prop="payMoney"></el-table-column>
            <el-table-column label="下单时间" prop="createTime"></el-table-column>
            <el-table-column label="操作" width="150px;">
                <template #default="scope">
                    <el-button @click="$router.push({name:'orderInfo',params:{id: scope.row.id}})" type="text">订单详情</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="count"></pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getOrderList } from '../../../api/getData'
import Pagination from '../../../components/pagination.vue'
import { Models } from '@/rapper'

export default defineComponent({
    components: {Pagination},
    setup() {
        const state = reactive({
            form: {
                page: 1,
                size: 20,
                no: '',
                status: null as number | null
            },
            status: [
                {label: '全部', value: null}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            list: [] as Models['GET/admin/order/list']['Res']['data']['list'],
            count: 0,
            statusList: [
                {value: 0, label: '全部'}, 
                {value: 1, label: '未付款'}, 
                {value: 2, label: '待发货'}, 
                {value: 3, label: '已发货'}, 
                {value: 4, label: '交易完成'}, 
                {value: 7, label: '已取消'}
            ],
        })

        onMounted(() => {
            _getOrderList()
        })

        const _getOrderList = async () => {
            const data = await getOrderList(state.form)
            state.list = data.list
            state.count = data.count
        }

        const handleCurrentChange = (page: number) => {
            state.form.page = page
            _getOrderList()
        }

        const handleSizeChange = (value: number) => {
            state.form.size = value
            _getOrderList()
        }

        return {
            ...toRefs(state),
            _getOrderList,
            handleCurrentChange,
            handleSizeChange
        };
     }
  });
</script>

<style scoped lang="less">
</style>
