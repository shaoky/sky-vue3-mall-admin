<template>
    <!-- 搜索 -->
    <Search 
        :data="searchList" 
        :initParams="initParams" 
        @change="onSearchChange"
        @reset="onReset"
        v-if="searchList.length > 0"
    ></Search>
    <!-- 按钮 -->
    <slot name="btns"></slot>
    <el-table :data="tableList" border class="mt20" v-bind="$attrs">
        <slot></slot>
    </el-table>
    <!-- 分页 -->
    <Pagination 
        v-if="pagination"
        @handleCurrentChange="handleCurrentChange" 
        @handleSizeChange="handleSizeChange" 
        :total="paginationData.count"
    ></Pagination>
</template>
<script setup lang="ts" name="Table">
import { ref } from 'vue'
import Search from '@/components/search/index.vue'
import Pagination from '@/components/pagination.vue'
import cloneDeep from 'lodash/cloneDeep'
import type { SearchModel } from '../search/interface'

interface Props {
    api: (data: any) => Promise<any>
    apiParams: any
	pagination?: boolean
    search?: SearchModel[]
}

let tableList = ref()
let params = ref()
let paginationData = ref({
    page: 1,
    size: 10,
    count: 0
})
let searchList = ref<SearchModel[]>([])
let initParams = ref({})

const props = withDefaults(defineProps<Props>(), {
    pagination: true,
    search: () => [],
    apiParams: () => {}
})

const initTableData = async () => {
    searchList.value = cloneDeep(props.search)
    for (let item of searchList.value) {
        // 提取查询初始值
        if (item.value || item.value === 0) {
            initParams.value[item.field] = item.value
        }
        // 如果api里有值，就去调用接口
        if (item.api) {
            const data = await item.api(item.params)
            item.items = data.list
        }
    }
    getTableList()
}

const getTableList = async() => {
    let data = await props.api({
        page: props.pagination ? paginationData.value.page : undefined,
        size: props.pagination ? paginationData.value.size : undefined,
        ...props.apiParams,
        ...initParams.value,
        ...params.value
    })
    tableList.value = data.list
    paginationData.value.count = data.count
}

const onSearchChange = (data) => {
    params.value = data
    getTableList()
}

const onReset = () => {
    params.value = {}
    getTableList()
}

const handleCurrentChange = (value: number) => {
    paginationData.value.page = value
    getTableList()
}

const handleSizeChange = (value: number) => {
    paginationData.value.page = 1
    paginationData.value.size = value
    getTableList()
}

initTableData()
defineExpose({ refresh: getTableList })
</script>