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
                    :label="item1[item.props?.label || 'label']" 
                    :value="item1[item.props?.value || 'value']"
                ></el-option>
            </el-select>
            <!-- 级联选择器 -->
            <el-cascader
                v-model="search[item.field]"
                :options="item.items"
                :props="item.props"
                placeholder="请选择"
                @change="onCascaderSearch"
                clearable
                v-if="item.type === 'cascader'"
            ></el-cascader>
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

/**
 * 级联返回值处理：[1,2,3] => 3
 */
const onCascaderSearch = () => {
    const filters = props.data.filter(item => item.type === 'cascader')
    filters.forEach(item => {
        search.value[item.field] = search.value[item.field].at(-1)
    })
    emit('change', search.value)
}

const onReset = () => {
    search.value = {}
    emit('reset')
}
</script>