<template>
    <div class="admin-add">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table border :data="list">
            <el-table-column label="登陆时间" prop="time"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="客户端请求ip" prop="ip"></el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="total"></pagination>

    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getLogLogin } from '../../../api/getData'
import Pagination from '../../../components/pagination.vue'

export default defineComponent({
    components: {Pagination},
    setup() {
        const state: any = reactive({
            show: false,
            id: '',
            list: [],
            page: 1,
            size: 10,
            total: 0
        })

        onMounted(() => {
            getData()
        })

        const getData = async() => {
            const data: any = await getLogLogin({page: state.page, size: state.size})
            state.list = data.list
            state.total = data.count
        }

        const handleCurrentChange = (page: number) => {
            state.page = page
        }


        return {
            ...toRefs(state),
            handleCurrentChange
        }
    }
})
</script>

<style scoped lang="less">
</style>
