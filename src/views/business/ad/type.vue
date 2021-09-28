<template>
    <div class="article-classify">
        <el-breadcrumb separator-class="el-icon-arrow-right" @click="open">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>广告管理</el-breadcrumb-item>
            <el-breadcrumb-item>广告位置管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true">
            <el-button type="primary" @click="onEdit(-1)">新建位置</el-button>
        </el-form>

        <el-table border :data="list" class="mt20">
            <el-table-column label="广告位名称" prop="title"></el-table-column>
            <el-table-column label="广告位描述" prop="description"></el-table-column>
            <el-table-column label="广告位宽度" prop="width"></el-table-column>
            <el-table-column label="广告位高度" prop="height"></el-table-column>
            <el-table-column label="广告位标识码" prop="mark"></el-table-column>
            <el-table-column label="状态">
                <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
            <!-- <el-table-column label="分类位置" prop="">
                <template slot-scope="scope">{{ list[scope.$index].position | getPosition }}</template>
            </el-table-column> -->
            <el-table-column label="操作" width="150px;">
                <template #default="scope">
                    <el-button type="text" @click="onEdit(scope.$index)">编辑</el-button>
                    <el-button type="text" @click="onDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <pagination @handleCurrentChange='handleCurrentChange' :total="page.total"></pagination> -->
        <el-dialog title="新增/编辑" v-model="dialogVisible" width="30%" center>
            <el-form label-width="120px">
                <el-form-item label="广告位名称：">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="广告位描述：">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="广告位宽度：">
                    <el-input v-model.number="form.width"></el-input>
                </el-form-item>
                <el-form-item label="广告位高度：">
                    <el-input v-model.number="form.height"></el-input>
                </el-form-item>
                <el-form-item label="广告位标识码：">
                    <el-input v-model="form.mark"></el-input>
                </el-form-item>
                <el-form-item label="启用状态：">
                    <el-checkbox v-model="form.isOpen"></el-checkbox>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import { getAdPositionListApi, delAdPosition, addAdPosition, updateAdPosition } from '../../../api/getData'
import { ElMessageBox, ElMessage } from 'element-plus';

export default defineComponent({
    setup() {
        const state: any = reactive({
            isAdd: true,
            fatherId: '',
            form: {},
            list: [],
            dialogVisible: false,
            position: [
                {label: '系统公告', value: 1}, {label: '使用指南', value: 2}, {label: '常见问题', value: 3}
            ]
        })

        onMounted(() => {
            getAdPosition()
        })

        const getAdPosition = async () => {
            const data: any = await getAdPositionListApi()
            console.log(data)
            state.list = data.list
        }
        

        const onDelete = (id: number) => {
            ElMessageBox.confirm('确认删除此分类吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(async() => {
                    try {
                    await delAdPosition({id: id})
                    ElMessage({
                        type: 'info',
                        message: '已取消删除',
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

        const onSubmit = async () => {
            if (state.form.isOpen) {
                state.form.isOpen = 1
            } else {
                state.form.isOpen = 0
            }
            if (state.isAdd) {
                // console.log(this.form)
                try {
                    let res: any = await addAdPosition(state.form)
                    ElMessage({
                        type: 'success',
                        message: '添加成功',
                    });
                    state.dialogVisible = false
                    getAdPosition()
                } catch (err) {
                    ElMessage({
                        type: 'error',
                        message: err.data,
                    })
                }
            } else {
                // console.log(this.form)
                try {
                    let res: any = await updateAdPosition(state.form)
                    ElMessage({
                        type: 'success',
                        message: '更新成功',
                    });
                    state.dialogVisible = false
                    getAdPosition()
                } catch (err) {
                    ElMessage({
                        type: 'error',
                        message: err.data,
                    })
                }
            }
        }

        return {
            ...toRefs(state),
            onDelete,
            onEdit,
            onSubmit
        };
     }
  });
</script>

<style scoped lang="less">
</style>
