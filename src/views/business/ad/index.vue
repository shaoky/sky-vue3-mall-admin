<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>广告管理</el-breadcrumb-item>
            <el-breadcrumb-item>广告列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="标题：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="位置：">
                <el-select v-model="form.positionId" @change="getAdList" placeholder="请选择位置">
                    <el-option  v-for="item in positionList" :key="item.value" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态：" >
                <el-select v-model="form.isOpen" @change="getAdList">
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
                    <img :src="scope.row.imageUrl" style="max-height: 160px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="状态">
                <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template #default="scope">
                    <el-button @click="$router.push({name:'adInfo',params:{id: scope.row.id}})" type="text" >编辑</el-button>
                    <el-button @click="onDelete(scope.row.id)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import { getAdPositionListApi, getAdListApi, delAd } from '../../../api/getData'
import { ElMessageBox, ElMessage } from 'element-plus';

export default defineComponent({
    setup() {
        const state: any = reactive({
            form: {
                page: 1,
                size: 20,
                title: '',
                isOpen: null,
                positionId: null
            },
            status: [
                {label: '全部', value: null}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            list: [ ],
            page: {
                total: 20
            },
            positionList: []
        })

        onMounted(() => {
            getAdList()
            getAdPosition()
        })

        const getAdList = async () => {
            const data: any = await getAdListApi(state.form)
            state.list = data.list
        }

        const getAdPosition = async () => {
            const data: any = await getAdPositionListApi()
            state.positionList = data.list
        }
        

        const onDelete = (id: number) => {
            ElMessageBox.confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(async() => {
                    try {
                    await delAd({id: id})
                    ElMessage({
                        type: 'info',
                        message: '已删除',
                    });
                } catch (err) {
                    console.log(err)
                }

                getAdPosition()
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


        return {
            ...toRefs(state),
            getAdList,
            onDelete,
        };
     }
  });
</script>

<style scoped lang="less">
</style>
