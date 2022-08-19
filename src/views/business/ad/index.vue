<template>
    <div class="articleIndex">
        <el-form :inline="true">
            <el-form-item label="标题：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="位置：">
                <el-select v-model="form.positionId" @change="getAdList" placeholder="请选择位置" clearable>
                    <el-option  v-for="item in positionList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态：" >
                <el-select v-model="form.isOpen" @change="getAdList" placeholder="请选择状态" clearable>
                    <el-option  v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getAdList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$router.push({ path: '/business/ad/add' })">新建</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="广告标题" prop="title"></el-table-column>
            <el-table-column label="广告位置" prop="positionTitle"></el-table-column>
            <el-table-column label="广告图片" prop="imageUrl">
                <template #default="scope">
                    <img :src="scope.row.imageUrl" style="max-height: 70px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="状态">
                <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template #default="scope">
                    <el-button @click="$router.push({name:'adInfo',params:{id: scope.row.id}})" type="primary" link >编辑</el-button>
                    <el-button @click="onDelete(scope.row.id)" type="primary" link>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="count"></pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getAdPositionListApi, getAdListApi, delAd } from '@/api/getData'
import { ElMessageBox } from 'element-plus'
import Pagination from '@/components/pagination.vue'
import { Models } from '@/rapper'

export default defineComponent({
    components: {
        Pagination
    },
    setup() {
        const state = reactive({
            form: {
                page: 1,
                size: 20,
                title: '',
                isOpen: '',
                positionId: null
            },
            status: [
                {label: '全部', value: ''}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            list: [] as Models['GET/admin/ad/list']['Res']['data']['list'],
            count: 0,
            positionList: [] as Models['GET/admin/ad/position/list']['Res']['data']['list']
        })

        onMounted(() => {
            getAdList()
            getAdPosition()
        })

        const getAdList = async () => {
            const data = await getAdListApi(state.form)
            state.list = data.list
            state.count = data.count
        }

        const getAdPosition = async () => {
            const data = await getAdPositionListApi()
            state.positionList = data.list
        }
        

        const onDelete = (id: number) => {
            ElMessageBox.confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(async() => {
                await delAd({id: id})
                getAdPosition()
            })
        }

        const handleCurrentChange = (value: number) => {
            state.form.page = value
            getAdList()
        }

        const handleSizeChange = (value: number) => {
            state.form.size = value
            getAdList()
        
        }


        return {
            ...toRefs(state),
            getAdList,
            onDelete,
            handleCurrentChange,
            handleSizeChange
        }
     }
  })
</script>

<style scoped lang="less">
</style>
