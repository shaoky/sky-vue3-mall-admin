<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品数据</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-button type="primary" @click="onEdit({}, -1)">新增</el-button>

        <el-table class="mt20" border :data="list">
            <el-table-column label="分类名称">
                <template #default="scope">
                    <span v-if="scope.row.parentId === 0">{{scope.row.title}}</span>
                    <span class="sub-type-line" v-else :style="{marginLeft: scope.row.level * 15 + 'px'}">{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort" width="80px;"></el-table-column>
            <el-table-column label="分类图标" width="180px;">
                <template #default="scope">
                    <img :src="scope.row.imageUrl" style="max-height: 60px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80px;">
                <template #default="scope">{{$filters.isOpen(scope.row.isOpen)}}</template>
            </el-table-column>
            <el-table-column label="操作" width="320px">
                <template #default="scope">
                    <el-button type="text" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
                    <el-button type="text" @click="onDelete(scope.row.id, list, scope.$index)">删除</el-button>
                    <el-button type="text" @click="onEdit(scope.row,-1)">添加子类</el-button>
                    <el-button type="text" @click="$router.push({name:'goodsAttr',params:{id:scope.row.id}})">查看属性</el-button>
                    <el-button type="text" @click="$router.push({name:'goodsSpec',params:{id:scope.row.id}})">查看规格</el-button>
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
                            list-type="picture-card"
                            :action="imgBaseUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import { getGoodsTypeList, addGoodsType, updateGoodsType, getArticleTypeList, deleteArticle, deleteGoodsType } from '../../../api/getData'
import { ElMessageBox, ElMessage } from 'element-plus';
import Pagination from '../../../components/pagination.vue';
import { imgBaseUrl } from '../../../config/env'

export default defineComponent({
    components: {Pagination},
    setup() {
        const state: any = reactive({
            imgBaseUrl: imgBaseUrl,
            dialogVisible: false,
            isAdd: false,
            default: {
                page: 1,
                size: 20,
                sort: 10,
                title: '',
                isOpen: false,
                positionId: null
            },
            form: {},
            status: [
                {label: '全部', value: null}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            list: [ ],
            page: {
                total: 20
            },
            categoryList: []
        })

        onMounted(() => {
            let a = 1
            _getGoodsTypeList()
        })

        const _getGoodsTypeList = async () => {
            const data: any = await getGoodsTypeList({type: 1})
            state.list = data.list
        }

        const onDelete = (id: number) => {
            ElMessageBox.confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(async() => {
                try {
                    await deleteGoodsType({id: id})
                    ElMessage({
                        type: 'info',
                        message: '已删除',
                    });
                } catch (err) {
                    console.log(err)
                }

                _getGoodsTypeList()
            })
        };

        const onEdit = (data: any, index: number) => {
            state.form =  {...state.default}
            state.dialogVisible = true
            if (index === -1) {
                state.isAdd = true
                if (data.id) {
                    state.form.classId = data.id
                } else {
                    state.form.classId = null
                }
            } else {
                state.isAdd = false
                state.form = {...data}
                if (state.form.isOpen === 0) {
                    state.form.isOpen = false
                } else if (state.form.isOpen === 1) {
                    state.form.isOpen = true
                }
            }
        }

        const onSubmit = async () => {
            if (state.isAdd) {
                // console.log(this.form)
                try {
                    let res: any = await addGoodsType(state.form)
                    ElMessage({
                        type: 'success',
                        message: '添加成功',
                    });
                    state.dialogVisible = false
                    _getGoodsTypeList()
                } catch (err) {}
            } else {
                // console.log(this.form)
                try {
                    let res: any = await updateGoodsType(state.form)
                    ElMessage({
                        type: 'success',
                        message: '添加成功',
                    });
                    state.dialogVisible = false
                    _getGoodsTypeList()
                } catch (err) {}
            }
        }

        const handleAvatarSuccess = (res: any, file: any) => {
            state.form.imageUrl = res.data.url
            state.imageUrl = URL.createObjectURL(file.raw)
        }

        const handleCurrentChange = () => {
            _getGoodsTypeList()
        }


        return {
            ...toRefs(state),
            _getGoodsTypeList,
            onDelete,
            onEdit,
            onSubmit,
            handleAvatarSuccess
        };
     }
  });
</script>

<style scoped lang="less">
.sub-type-line{
    background: url('./assets/sub_type_line.gif') no-repeat;
    padding-left: 25px;
}
</style>
