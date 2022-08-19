<template>
    <div class="article-classify">
        <el-form :inline="true">
            <el-button type="primary" @click="onEdit({})">新建类型</el-button>
        </el-form>

        <el-table border :data="list" class="mt20">
            <el-table-column label="分类名称" prop="title"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="操作" width="150px;">
                <template #default="scope">
                    <el-button type="primary" link @click="onEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" link @click="onDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-dialog title="新增/编辑" v-model="dialogVisible" width="30%" center>
            <el-form label-width="120px">
                <el-form-item label="分类名称：">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="分类排序：">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="分类图片：">
                    <el-upload
                        class="avatar-uploader"
                        :action="imgBaseUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                        <el-icon v-else class="avatar-uploader-icon" :size="24" color="#8c939d"><Plus /></el-icon>
                    </el-upload>
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
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getArticleTypeList, deleteArticleType, addArticleType, updateArticleType } from '../../../api/getData'
import { ElMessageBox, ElMessage } from 'element-plus'
import { imgBaseUrl } from '../../../config/env'
import { Models } from '@/rapper'

type ActiveModel = Models['GET/admin/article/type/list']['Res']['data']['list'][0]

export default defineComponent({
    setup() {
        const state = reactive({
            imgBaseUrl,
            isAdd: true,
            form: {} as Models['POST/admin/article/type/update']['Req'],
            list: [] as ActiveModel[],
            dialogVisible: false,
            position: [
                {label: '系统公告', value: 1}, {label: '使用指南', value: 2}, {label: '常见问题', value: 3}
            ]
        })

        onMounted(() => {
            _getArticleTypeList()
        })

        const _getArticleTypeList = async () => {
            const data = await getArticleTypeList()
            state.list = data.list
        }
        

        const onDelete = (id: number) => {
            ElMessageBox.confirm('确认删除此分类吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(async() => {
                await deleteArticleType({id: id})
                _getArticleTypeList()
            })
        }

        const onEdit = (row) => {
            state.form = { ...row }
            state.dialogVisible = true
        }

        const onSubmit = async () => {
            if (!state.form.id) {
                await addArticleType(state.form)
            } else {
                await updateArticleType(state.form)
            }
            state.dialogVisible = false
            _getArticleTypeList()
        }

        const handleAvatarSuccess = (res) => {
            state.form.imageUrl = res.data.url
        }

        return {
            ...toRefs(state),
            onDelete,
            onEdit,
            onSubmit,
            handleAvatarSuccess
        }
     }
  })
</script>

<style scoped lang="less">
</style>
