<template>
    <div class="articleInfo">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id ? '产品详情': '新增产品' }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form label-width="120px" style="width: 700px;">
            <el-form-item label="产品类型：" >
                <el-cascader
                    v-model="form.goodsClassId"
                    :options="classList"
                    :props="{ value: 'id', label: 'title', expandTrigger: 'hover' }"
                    placeholder="请选择"
                    @change="goodsClassIdChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="产品名称：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="产品副标题：">
                <el-input v-model="form.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="产品价格：">
                <el-input style="width:200px;" v-model.number="form.price"></el-input>
            </el-form-item>
            <el-form-item label="会员价格：">
                <el-input style="width:200px;" v-model.number="form.memberPrice"></el-input>
            </el-form-item>
            <el-form-item label="产品销量：">
                <el-input style="width:200px;" v-model.number="form.saleCount"></el-input>
            </el-form-item>
            <el-form-item label="产品库存：">
                <el-input style="width:200px;" v-model.number="form.stock"></el-input>
            </el-form-item>
            <el-form-item label="产品主图：">
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
            <el-form-item label="轮播图" style="width: 800px">
                <el-upload
                    :action="imgBaseUrl"
                    list-type="picture-card"
                    :file-list="bannerList"
                    :on-success="handleBannerSuccess"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    style="width: 800px">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="内容：" class="ueditor-box">
                <ueditor ref="ue"  :config="{initialContent: form.content}" v-if="form.content"></ueditor>
            </el-form-item>
            <el-form-item label="产品排序：">
                <el-input style="width:200px;" v-model.number="form.sort"></el-input>
            </el-form-item>
            <!-- <el-form-item label="是否启用：">
                <el-checkbox v-model="form.isOpen"></el-checkbox>
            </el-form-item> -->
            <div class="btn">
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs, ref } from 'vue';
import { imgBaseUrl } from '../../../config/env'
import { getGoodsTypeList, goodsGoodsInfo, addGoods, updateGoods } from '../../../api/getData'
import ueditor from '../../../components/ueditor.vue'
// import region from '@/components/common/region'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { deleteChildren } from '../../../utils/tools'

export default defineComponent({
    components: {
        ueditor
    },
    setup(props, a) {
        const ue = ref(null)
        const state: any = reactive({
            imgBaseUrl: imgBaseUrl,
            classList: [],
            id: null,
            form: {
                imageUrl: '',
                isOpen: false,
                content: '',
                saleCount: 0,
                sort: 100,
                goodsClassId: null
            },
            typeList: [],
            bannerList: [],
            dialogImageUrl: '',
            dialogVisible: false
        })

        onMounted(async() => {

            let params = useRoute().params
            await _getGoodsTypeList()
            if (params.id) {
                state.id = Number(params.id) 
                _getGoodsInfo(state.id)
            }
        })

        const _getGoodsInfo = async (id: number) => {
            const data: any = await goodsGoodsInfo({id: id})
            state.form = data.info
            state.form.goodsClassId = data.info.goodsClassIds
            state.bannerList = data.info.bannerList.map((item: any) => ({
                id: item.id,
                url: item.imageUrl
            }))
        }

        // @ts-ignore
        const getGoodsClassIdArr = (data: any, id: number, ids: any) => {
            console.log(data)
            for(let item of data) {
                if (item.id === id) {
                    ids.push(item.id)
                    return ids
                }
                if (item.children && item.children.length > 0) {
                    ids.push(item.id)
                    return getGoodsClassIdArr(item.children, id, ids)
                }
            }
        }

        const _getGoodsTypeList = async () => {
            const data: any = await getGoodsTypeList({type: 2, isOpen: 1})
            deleteChildren(data.list)
            state.classList = data.list
        }
        const handleAvatarSuccess = (res: any, file: any) => {
            state.form.imageUrl = res.data.url
            state.imageUrl = URL.createObjectURL(file.raw)
        }

        // 上传图片
        const handleBannerSuccess = (res: any, file: any) => {
            state.bannerList.push({
                url: res.data.url
            })
        }
        
        // 图片删除
        const handleRemove = (res) => {
            console.log(res)
        }

        // 图片预览
        const handlePictureCardPreview = (file: any) => {
            state.dialogImageUrl = file.url
            state.dialogVisible = true
        }

        const goodsClassIdChange = (data: any) => {
            state.form.goodsClassId = data[data.length-1]

        }



        const onSubmit = async () => {
            // @ts-ignore
            state.form.content = ue.value.content
            state.form.bannerList = state.bannerList
            // state.form.bannerList = state.bannerList.map((item: any) => ({
            //     id: item.id || undefined,
            //     url: item.
            // }))
            if (state.id) {
                try {
                    let res = await updateGoods(state.form)
                    ElMessage({
                        type: 'info',
                        message: '修改成功',
                    });
                    window.history.back()
                } catch (err) {}
                
            } else {
                try {
                    let res = await addGoods(state.form)
                    ElMessage({
                        type: 'info',
                        message: '添加成功',
                    });
                    window.history.back()
                } catch (err) {
                    ElMessage({
                        type: 'error',
                        message: err.data,
                    });
                }
            }
        }


        return {
            ...toRefs(state),
            onSubmit,
            handleAvatarSuccess,
            handleBannerSuccess,
            ue,
            handlePictureCardPreview,
            goodsClassIdChange,
            handleRemove
        }
    }
})

</script>


<style scoped lang="less">
.btn{text-align: center}
</style>
