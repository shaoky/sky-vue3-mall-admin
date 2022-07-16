<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>产品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="标题：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="类型：">
                <!-- <el-select v-model="form.typeId" @change="getGoodsList" placeholder="请选择类型">
                    <el-option  v-for="item in categoryList" :key="item.value" :label="item.title" :value="item.id"></el-option>
                </el-select> -->
                <el-cascader
                    v-model="goodsClassId"
                    :options="categoryList"
                    :props="{ value: 'id', label: 'title', expandTrigger: 'hover' }"
                    placeholder="请选择"
                    @change="goodsClassIdChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="状态：" >
                <el-select v-model="form.isOpen" @change="_getGoodsList" placeholder="请选择状态">
                    <el-option  v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="_getGoodsList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$router.push({ path: '/business/goods/add' })">新建产品</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="类型" prop="goodsClassName"></el-table-column>
            <el-table-column label="图片" prop="imageUrl">
                <template #default="scope">
                    <img :src="scope.row.imageUrl" style="max-height: 80px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="状态">
                <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template #default="scope">
                    <el-button @click="$router.push({name:'goodsInfo',params:{id: scope.row.id}})" type="text" >编辑</el-button>
                    <el-button @click="setIsOpen(scope.row)" type="text">{{scope.row.isOpen ? '下架' : '上架'}}</el-button>
                    <el-button @click="onDelete(scope.row.id)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :size="form.size" :total="count"></pagination>
    </div>
</template>

<script lang="ts">
//@ts-ignore
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import { getGoodsList, getGoodsTypeList, deleteGoods, setGoodsIsOpen } from '../../../api/getData'
import { ElMessageBox, ElMessage } from 'element-plus';
import Pagination from '../../../components/pagination.vue';
import { deleteChildren } from '../../../utils/tools'

export default defineComponent({
    components: {Pagination},
    setup() {
        const state: any = reactive({
            form: {
                page: 1,
                size: 20,
                // title: '',
                // isOpen: null,
                // positionId: null
            },
            status: [
                {label: '全部', value: null}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            list: [ ],
            count: 0,
            categoryList: []
        })

        onMounted(() => {
            _getGoodsList()
            _getGoodsTypeList()
        })

        const _getGoodsList = async () => {
            const data: any = await getGoodsList(state.form)
            state.list = data.list
            state.count = data.count
        }

        const _getGoodsTypeList = async () => {
            const data: any = await getGoodsTypeList({type: 2})
            deleteChildren(data.list)
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
                    await deleteGoods({id: id})
                    ElMessage({
                        type: 'info',
                        message: '已删除',
                    });
                } catch (err) {
                    console.log(err)
                }

                _getGoodsList()
            })
        };

        const onEdit = (index: number) => {
            state.form = {}
            state.dialogVisible = true
            if (index === -1) {
                state.isAdd = true
            } else {
                state.isAdd = false
                state.form = JSON.parse(JSON.stringify(state.list[index]))
                if (state.form.isOpen === 0) {
                    state.form.isOpen = false
                } else if (state.form.isOpen === 1) {
                    state.form.isOpen = true
                }
            }
        }

        const handleCurrentChange = (page: number) => {
            state.form.page = page
            _getGoodsList()
        }

        const goodsClassIdChange = (data: any) => {
            state.form.goodsClassId = data[data.length-1]
            _getGoodsList()
        }

        const setIsOpen = async(data: any) => {
            const res = await setGoodsIsOpen({
                id: data.id,
                isOpen: data.isOpen ? 0 : 1
            })
            data.isOpen = !data.isOpen
            ElMessage({
                type: 'success',
                message: '操作成功',
            });

        }


        return {
            ...toRefs(state),
            _getGoodsList,
            onDelete,
            goodsClassIdChange,
            handleCurrentChange,
            setIsOpen
        };
     }
  });
</script>

<style scoped lang="less">
</style>
