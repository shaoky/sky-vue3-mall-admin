<template>
    <div class="user-logs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>登录接口日志</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="时间：">
                <!-- 时间选择器 -->
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <!-- <el-form-item label="用户：">
                <el-select v-model="search.region" placeholder="请选择">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table border :data="report">
            <el-table-column label="登陆时间" prop="__time__">
                <template slot-scope="scope">{{ scope.row.time | getTime }}</template>
            </el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="客户端请求ip" prop="ip"></el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
    </div>
</template>

<script>
import datePicker from '@/components/date-picker'
import pagination from '@/components/pagination'
import { getLoginlogs } from '@/api/getData'
export default {
    data () {
        return {
            search: {
                page: 0,
                size: 20
            },
            // 表格
            report: [],
            page: {
                total: 1
            }
        }
    },
    mounted () {
        this.getLoginlogs()
    },
    filters: {
        getSystem (value) {
            let text = ''
            if (value === '/drivers/logins') {
                text = '司机系统'
            } else if (value === '/admin/login') {
                text = '总运营后台系统'
            } else if (value === '/sales/logins') {
                text = '业务员系统'
            } else if (value === '/supplier/logins') {
                text = '供应商系统'
            }
            return text
        }
    },
    methods: {
        async getLoginlogs () {
            let res = await getLoginlogs(this.search)
            this.report = res.data.list
            this.page.total = res.data.count
        },
        onSubmit () {
            this.getLoginlogs()
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getLoginlogs()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getLoginlogs()
        },
        // 选择时间
        getTime (val) {
            this.search.begintime = val[0]
            this.search.endtime = val[1]
        }
    },
    components: {
        datePicker,
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
