<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table border :data="userList">
            <el-table-column prop="userNo" label="用户编号" width="130"></el-table-column>
            <el-table-column prop="userName" label="用户名称"></el-table-column>
            <el-table-column label="用户头像">
                <template slot-scope="scope">
                    <img :src="scope.row.userPhoto" style="max-height: 80px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column prop="userPhone" label="用户手机"></el-table-column>
            <!-- <el-table-column prop="weixinAccount" label="微信号"></el-table-column> -->
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
    </div>
</template>

<script>
import { getUserList } from '../../../api/getData'
import pagination from '../../../components/pagination.vue'
// import status from '@/mixins/status'

export default {
    // mixins: [status],
    data () {
        return {
            search: {
                page: 1,
                size: 20
            },
            status: [
                {value: null, label: '全部'}, {value: 1, label: '会员'}, {value: 0, label: '非会员'}
            ],
            page: {
                total: 1
            },
            userList: []
        }
    },
    mounted () {
        // this.getUserList()
    },
    methods: {
        async getUserList () {
            let res = await getUserList(this.search)
            this.userList = res.data.list
            this.page.total = res.data.count
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getUserList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getUserList()
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
