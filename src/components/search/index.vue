<template>
    <el-form :inline="true">
        <el-form-item :label="item.label + '：'" v-for="item of data">
            <!-- 输出框 -->
            <el-input 
                v-model="search[item.field]" 
                v-if="item.type === 'text'"
            ></el-input>
            <!-- 下拉列表 -->
            <el-select
                v-model="search[item.field]"
                @change="onSearch"
                placeholder="请选择" 
                clearable
                v-if="item.type === 'select'"
            >
                <el-option 
                    v-for="item1 in item.items" 
                    :key="item1.value" 
                    :label="item1.label" 
                    :value="item1.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts" name="search">
import { ref, watchEffect } from 'vue'
import { SearchModel } from './interface'

interface Props {
    data: SearchModel[]
    initParams: any // 初始化搜索参数
}
const emit = defineEmits(['change', 'reset'])

let search = ref({})

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    initParams: {}
})

watchEffect(() => {
    search.value = {...props.initParams}
})

const onSearch = () => {
    emit('change', search.value)
}

const onReset = () => {
    search.value = {}
    emit('reset')
}
</script>