<template>
    <Table :api="getLogLogin">
        <el-table-column label="登陆时间" prop="time"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
    </Table>
</template>

<script lang="ts" setup>
import Table from '@/components/table/index.vue'
import { getLogLogin } from '@/api/getData'
</script>
