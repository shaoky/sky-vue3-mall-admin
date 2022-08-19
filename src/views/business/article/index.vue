<template>
    <div class="articleIndex">
        <el-form :inline="true">
            <el-form-item label="标题：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="类型：">
                <el-select v-model="form.typeId" @change="getArticleList" placeholder="请选择类型" clearable>
                    <el-option  v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态：" >
                <el-select v-model="form.isOpen" @change="getArticleList" placeholder="请选择状态" clearable>
                    <el-option  v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getArticleList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$router.push({ path: '/business/article/add' })">新建文章</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="类型" prop="articleTypeName"></el-table-column>
            <el-table-column label="图片" prop="imageUrl">
                <template #default="scope">
                    <img :src="scope.row.imageUrl" style="max-height: 160px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="状态">
                <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template #default="scope">
                    <el-button @click="$router.push({name:'articleInfo',params:{id: scope.row.id}})" type="primary" link>编辑</el-button>
                    <el-button @click="onDelete(scope.row.id)" type="primary" link>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="count"></pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import { getArticleListApi, getArticleTypeList, deleteArticle } from '../../../api/getData'
import { ElMessageBox, ElMessage } from 'element-plus';
import Pagination from '../../../components/pagination.vue';
import { Models } from '@/rapper'

export default defineComponent({
    components: {Pagination},
    setup() {
        const state = reactive({
            form: {
                page: 1,
                size: 20,
                title: '',
                isOpen: '',
                typeId: undefined
            },
            status: [
                {label: '全部', value: ''}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            list: [] as Models['GET/admin/article/list']['Res']['data']['list'],
            count: 0,
            categoryList: [] as Models['GET/admin/article/type/list']['Res']['data']['list']
        })

        onMounted(() => {
            getArticleList()
            _getArticleTypeList()
        })

        const getArticleList = async () => {
            const data = await getArticleListApi(state.form)
            state.list = data.list
            state.count = data.count
        }

        const _getArticleTypeList = async () => {
            const data = await getArticleTypeList()
            state.categoryList = data.list
        }

        const onDelete = (id: number) => {
            ElMessageBox.confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(async() => {
                try {
                    await deleteArticle({id: id})
                    ElMessage({
                        type: 'info',
                        message: '已删除',
                    });
                } catch (err) {
                    console.log(err)
                }

                getArticleList()
            })
        };

        const handleCurrentChange = (value: number) => {
            state.form.page = value
            getArticleList()
        
        }

        const handleSizeChange = (value: number) => {
            state.form.size = value
            getArticleList()
        }


        return {
            ...toRefs(state),
            getArticleList,
            onDelete,
            handleCurrentChange,
            handleSizeChange
        };
     }
  });
</script>

<style scoped lang="less">
</style>
