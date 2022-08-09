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
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :size="size" :total="total"></pagination>

    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getLogLogin } from '@/api/getData'
import Pagination from '@/components/pagination.vue'
import { Models } from '@/rapper'

export default defineComponent({
    components: {Pagination},
    setup() {
        const state = reactive({
            show: false,
            id: '',
            list: [] as Models['GET/admin/system/log/login']['Res']['data']['list'],
            page: 1,
            size: 10,
            total: 0
        })

        onMounted(() => {
            getData()
        })

        const getData = async() => {
            const data = await getLogLogin({page: state.page, size: state.size})
            state.list = data.list
            state.total = data.count
        }

        const handleCurrentChange = (page: number) => {
            state.page = page
            getData()
        }

        const handleSizeChange = (size: number) => {
            state.size = size
            getData()
        }

        return {
            ...toRefs(state),
            handleCurrentChange,
            handleSizeChange
        }
    }
})
</script>

<style scoped lang="less">
</style>
