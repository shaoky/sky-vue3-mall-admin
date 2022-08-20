<template>
    <div class="articleIndex">
        <el-button type="primary" @click="onEdit(bakForm)">新增</el-button>

        <el-table class="mt20" border row-key="id" default-expand-all :data="list">
            <el-table-column label="分类名称" prop="title"></el-table-column>
            <el-table-column label="排序" prop="sort" width="80px;"></el-table-column>
            <el-table-column label="分类图标" width="180px;">
                <template #default="scope">
                    <img :src="scope.row.imageUrl" style="max-height: 60px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80px;">
                <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
            <el-table-column label="操作" width="340px">
                <template #default="scope">
                    <el-button type="primary" link @click="onEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" link @click="onEdit({parentId: scope.row.id})">添加子类</el-button>
                    <el-button type="primary" link @click="$router.push({name:'goodsAttr',params:{id:scope.row.id}})">查看属性</el-button>
                    <el-button type="primary" link @click="$router.push({name:'goodsSpec',params:{id:scope.row.id}})">查看规格</el-button>
                    <el-button type="primary" link @click="onDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="isAdd ? '新增分类' : '编辑分类'" v-model="dialogVisible" width="500px" center>
                <el-form label-width="120px">
                    <el-form-item label="分类名称：">
                        <el-input style="max-width:300px;" v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="分类排序：">
                        <el-input style="width:300px;" v-model.number="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="分类图片：">
                        <el-upload
                            class="avatar-uploader"
                            :action="imgBaseUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                    <!-- <el-form-item label="商品类型：">
                        <span style="margin-right: 20px;">{{form.gbName || goodsBasisInfo.gbName}}</span>
                        <el-button type="primary" size="small" @click="goodsTypedialogVisible = true">选择</el-button>
                    </el-form-item> -->
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
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getGoodsTypeListApi, addGoodsType, updateGoodsType, deleteGoodsType } from '@/api/getData'
import { ElMessageBox, ElMessage } from 'element-plus'
import Pagination from '@/components/pagination.vue'
import { imgBaseUrl } from '@/config/env'
import { Models } from '@/rapper'

type GoodsTypeModel = Models['GET/admin/goods/type/list']['Res']['data']['list'][0]

export default defineComponent({
    components: {Pagination},
    setup() {
        const state = reactive({
            imgBaseUrl,
            dialogVisible: false,
            isAdd: false,
            bakForm: {},
            form: {
                id: undefined,
                parentId: undefined,
                sort: 10,
                title: '',
                isOpen: true,
                imageUrl: ''
            },
            status: [
                {label: '全部', value: null}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            list: [] as GoodsTypeModel[],
            page: {
                total: 20
            },
            categoryList: []
        })

        onMounted(() => {
            state.bakForm = {...state.form}
            getGoodsTypeList()
        })

        const getGoodsTypeList = async () => {
            const data = await getGoodsTypeListApi({type: 2})
            state.list = data.list
        }

        const onDelete = (id: number) => {
            ElMessageBox.confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(async() => {
                await deleteGoodsType({id: id})
                getGoodsTypeList()
            })
        };

        const onEdit = (row) => {
            state.dialogVisible = true
            state.form = {...row}
        }

        const onSubmit = async () => {
            if (!state.form.id) {
                await addGoodsType({
                    title: state.form.title,
                    imageUrl: state.form.imageUrl,
                    sort: state.form.sort,
                    isOpen: state.form.isOpen,
                    parentId: state.form.parentId
                })
            } else {
                await updateGoodsType({
                    id: state.form.id!,
                    title: state.form.title,
                    imageUrl: state.form.imageUrl,
                    sort: state.form.sort,
                    isOpen: state.form.isOpen
                })
            }
            state.dialogVisible = false
            getGoodsTypeList()
        }

        const handleAvatarSuccess = (res) => {
            state.form.imageUrl = res.data.url
        }

        return {
            ...toRefs(state),
            getGoodsTypeList,
            onDelete,
            onEdit,
            onSubmit,
            handleAvatarSuccess
        }
     }
  })
</script>

<style scoped lang="less">
.sub-type-line{
    background: url('./assets/sub_type_line.gif') no-repeat;
    padding-left: 25px;
}
</style>
