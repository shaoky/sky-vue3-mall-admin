<template>
    <el-button type="primary" @click="onEdit(bakForm)">新增</el-button>

    <el-table class="mt20" border :data="list">
        <el-table-column label="属性名称" prop="name"></el-table-column>
        <el-table-column label="属性类型" prop="typeName"></el-table-column>
        <el-table-column label="可选列表" prop="content"></el-table-column>
        <el-table-column label="排序" prop="sort" width="80px;"></el-table-column>
        <el-table-column label="状态" width="80px;">
            <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" link @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="primary" link @click="onDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog :title="form.id ? '编辑属性' : '新增属性'" v-model="dialogVisible" width="500px" center>
        <el-form label-width="120px">
            <el-form-item label="属性名称：">
                <el-input style="max-width:300px;" v-model="form.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="字段名称：">
                <el-input style="width:300px;" v-model.number="form.fieldName"></el-input>
            </el-form-item> -->
            <el-form-item label="属性类型：">
                <el-radio v-model="form.type" :label="1">手工录入</el-radio>
                <el-radio v-model="form.type" :label="2">单选属性</el-radio>
                <el-radio v-model="form.type" :label="3">多选属性</el-radio>
            </el-form-item>
            <el-form-item label="可选值：" v-if="form.type !== 1">
                <el-input style="width:300px;" v-model="form.content"></el-input>
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
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
import { getGoodsAttrList, addGoodsAttr, updateGoodsAttr, deleteGoodsAttr } from '@/api/getData'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Models } from '@/rapper'

type GoodsAttr = Models['GET/admin/goods/attr/list']['Res']['data']['list'][0]

export default defineComponent({
    setup() {

        const state = reactive({
            dialogVisible: false,
            list: [] as GoodsAttr[],
            form: {
                id: undefined,
                goodsClassId: 0,
                name: '',
                type: 1,
                content: '',
                sort: 20,
                isOpen: false
            },
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
            let res = await getGoodsAttrList({goodsClassId: state.form.goodsClassId})
            state.list = res.list
        }

        const onEdit = (item) => {
            state.form = {...item}
            state.dialogVisible = true
        }

        const onSubmit = async() => {
            if (!state.form.id) {
                if (state.form.type === 1) {
                    state.form.content = ''
                }
                await updateGoodsAttr({
                    id: state.form.id!,
                    content: state.form.content,
                    isOpen: state.form.isOpen,
                    name: state.form.name,
                    sort: state.form.sort,
                    type: state.form.type
                })
                ElMessage({
                    type: 'success',
                    message: '更新成功',
                })
            } else {
                await addGoodsAttr(state.form)
                ElMessage({
                    type: 'success',
                    message: '添加成功',
                })
               
            }
            state.dialogVisible = false
            _getGoodsAttrList()
        }

        const onDelete = async(id: number) => {
            await deleteGoodsAttr({id})
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