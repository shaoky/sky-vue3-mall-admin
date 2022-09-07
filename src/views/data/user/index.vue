<template>
    <Table :api="getUserList" :search="searchList">
        <el-table-column label="用户手机" prop="tel"></el-table-column>
        <el-table-column label="用户头像" prop="photo">
            <template #default="scope">
                <img :src="scope.row.photo" class="v-table-image">
            </template>
        </el-table-column>
        <el-table-column label="用户注册时间" prop="createTime"></el-table-column>
        <el-table-column label="用户最后一次登录时间" prop="lastLoginTime"></el-table-column>
    </Table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/components/table/index.vue'
import { getUserList } from '@/api/getData'
import { SearchModel } from '@/components/search/interface'

let searchList = ref<SearchModel[]>([
    {
        label: '手机',
        field: 'tel',
        type: 'text',
        value: '',
    },
])

</script>