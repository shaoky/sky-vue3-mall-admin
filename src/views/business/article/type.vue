<template>
    <Table :api="getArticleTypeList" :pagination="false" ref="tableRef">
        <template #btns>
            <el-button type="primary" @click="onEdit(initForm)">新建类型</el-button>
        </template>
        <el-table-column label="分类名称" prop="title"></el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="操作" width="150px;">
            <template #default="scope">
                <el-button type="primary" link @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="primary" link @click="onDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </Table>

    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="dialogVisible" width="500px" center>
        <el-form label-width="120px">
            <el-form-item label="分类名称：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="分类排序：">
                <el-input v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="分类图片：">
                <upload-image :imageUrl="form.imageUrl" @success="handleAvatarSuccess"></upload-image>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/components/table/index.vue'
import { getArticleTypeList, deleteArticleType, addArticleType, updateArticleType } from '@/api/getData'
import useMessageBox from '@/hooks/useMessageBox'
import UploadImage from '@/components/upload/image.vue'

let tableRef = ref()
let initForm = ref({
    sort: 10
})
let form = ref({
    id: 0,
    title: '',
    sort: 0,
    imageUrl: ''
})
let dialogVisible = ref(false)

const onEdit = (row) => {
    form.value = { ...row }
    dialogVisible.value = true
}

const onDelete = async(id: number) => {
    await useMessageBox()
    await deleteArticleType({id})
    tableRef.value.refresh()
}

const handleAvatarSuccess = (url: string) => {
    form.value.imageUrl = url
}

 const onSubmit = async () => {
    if (form.value.id) {
        await updateArticleType(form.value)
    } else {
        await addArticleType(form.value)
    }
    dialogVisible.value = false
    tableRef.value.refresh()
}


// export default defineComponent({
//     setup() {
//         const state = reactive({
//             imgBaseUrl,
//             isAdd: true,
//             form: {} as Models['POST/admin/article/type/update']['Req'],
//             list: [] as ActiveModel[],
//             dialogVisible: false,
//             position: [
//                 {label: '系统公告', value: 1}, {label: '使用指南', value: 2}, {label: '常见问题', value: 3}
//             ]
//         })

//         onMounted(() => {
//             _getArticleTypeList()
//         })

//         const _getArticleTypeList = async () => {
//             const data = await getArticleTypeList()
//             state.list = data.list
//         }
        

//         const onDelete = (id: number) => {
//             ElMessageBox.confirm('确认删除此分类吗?', '提示', {
//                 confirmButtonText: '确定',
//                 cancelButtonText: '取消',
//                 type: 'warning',
//             })
//             .then(async() => {
//                 await deleteArticleType({id: id})
//                 _getArticleTypeList()
//             })
//         }

//         const onEdit = (row) => {
//             state.form = { ...row }
//             state.dialogVisible = true
//         }

//         const onSubmit = async () => {
//             if (!state.form.id) {
//                 await addArticleType(state.form)
//             } else {
//                 await updateArticleType(state.form)
//             }
//             state.dialogVisible = false
//             _getArticleTypeList()
//         }

//         const handleAvatarSuccess = (res) => {
//             state.form.imageUrl = res.data.url
//         }

//         return {
//             ...toRefs(state),
//             onDelete,
//             onEdit,
//             onSubmit,
//             handleAvatarSuccess
//         }
//      }
//   })
</script>
