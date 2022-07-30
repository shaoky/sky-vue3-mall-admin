<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-button type="primary" @click="onEdit(bakForm)">新增</el-button>

        <el-table class="mt20" border :data="list">
            <el-table-column label="规格名称" prop="name"></el-table-column>
            <el-table-column label="可选列表" prop="content"></el-table-column>
            <el-table-column label="排序" prop="sort" width="80px;"></el-table-column>
            <el-table-column label="状态" width="80px;">
                <template #default="scope">{{filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="onDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="form.id ? '编辑规格' : '新增规格'" v-model="dialogVisible" width="500px" center>
            <el-form label-width="120px">
                <el-form-item label="规格名称：">
                    <el-input style="max-width:300px;" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="可选值：">
                    <el-input style="width:300px;" v-model="form.content"></el-input><br/>
                    多个值用,隔开
                </el-form-item>
                <el-form-item label="排序：">
                    <el-input style="width:300px;" v-model.number="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox v-model="form.isOpen"></el-checkbox>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts">
// @ts-ignore
import { defineComponent, ref, reactive, onMounted, toRefs, getCurrentInstance } from 'vue'
import { getGoodsSpecList, addGoodsSpec, updateGoodsSpec, deleteGoodsSpec } from '../../../api/getData'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';
import { Models } from '@/rapper'
import { filtersModel } from '@/utils/filter'

export default defineComponent({
    setup() {
         const internalInstance = getCurrentInstance()
        const state = reactive({
            filters: internalInstance?.appContext.config.globalProperties.$filters as filtersModel,
            dialogVisible: false,
            list: [] as Models['GET/admin/goods/spec/list']['Res']['data']['list'],
            form: {
                id: undefined,
                goodsClassId: undefined,
                name: '',
                content: '',
                sort: 20,
                isOpen: false
            }as Models['POST/admin/goods/spec/update']['Req'],
            bakForm: {}
        })

        onMounted (() => {
            let params = useRoute().params
            if (params.id) {
                state.form.goodsClassId = Number(params.id) 
            }
            state.bakForm = {...state.form}
            _getGoodsAttrList()
        })

        const _getGoodsAttrList = async() => {
            let res = await getGoodsSpecList({goodsClassId: state.form.goodsClassId})
            // @ts-ignore
            state.list = res.list
        }

        const onEdit = (item) => {
            state.form = {...item}
            state.dialogVisible = true
        }

        const onSubmit = async() => {
            if (state.form.id) {
                await updateGoodsSpec({
                    id: state.form.id,
                    content: state.form.content,
                    isOpen: state.form.isOpen,
                    name: state.form.name,
                    sort: state.form.sort
                })
                ElMessage({
                    type: 'success',
                    message: '更新成功',
                })
            } else {
                await addGoodsSpec(state.form)
                ElMessage({
                    type: 'success',
                    message: '添加成功',
                })
               
            }
            state.dialogVisible = false
            // @ts-ignore
            state.form = {...state.bakForm}
            _getGoodsAttrList()
        }

        const onDelete = async(id: number) => {
            await deleteGoodsSpec({id})
            _getGoodsAttrList()
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        }

        return {
            ...toRefs(state),
            onEdit,
            onSubmit,
            onDelete
        }
    }
})

</script>
<style lang="less" scoped>
</style>