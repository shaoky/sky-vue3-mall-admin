<template>
    <div class="articleInfo">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>广告管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{adId ? '广告详情': '新增广告' }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form label-width="120px">
            <el-form-item label="广告标题：">
                <el-input style="width:300px;" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="广告位置：" >
                <el-select v-model="form.positionId" placeholder="请选择">
                    <el-option v-for="(item,index) in positionList" :key="index" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告类型：">
                <el-select v-model="form.type" placeholder="请选择">
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="安卓页面：">
                <el-input style="width:300px;" v-model="form.androidPage"></el-input>
            </el-form-item>
            <el-form-item label="苹果页面：">
                <el-input style="width:300px;" v-model="form.iosPage"></el-input>
            </el-form-item> -->
            <el-form-item label="操作：">
                <el-input style="width:300px;" v-model="form.operation"></el-input>
            </el-form-item>
            <el-form-item label="广告排序：">
                <el-input style="width:300px;" v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="广告图片：">
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
            <el-form-item label="是否启用：">
                <el-checkbox v-model="form.isOpen"></el-checkbox>
            </el-form-item>

            <div class="btn">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button type="primary">删除</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import { imgBaseUrl } from '../../../config/env'
import { getAdPositionListApi, addAd, updateAd, getAdInfoApi } from '../../../api/getData'
// import ueditor from '@/components/ueditor'
// import region from '@/components/common/region'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';

export default defineComponent({
    setup(props, a) {
        const state: any = reactive({
            imgBaseUrl: imgBaseUrl,
            id: null,
            form: {
                imageUrl: '',
                isOpen: false,
                operation: '',
                valueMap: '',
                type: '',
                sort: 10
            },
            positionList: [],
            typeList: [
                {label: '网页链接', value: 1},
                {label: '商品详情', value: 2},
                // {label: '店铺分享', value: 3},
                // {label: '抢购详情', value: 4},
                // {label: '跳转活动页', value: 5},
                // {label: '待开发中', value: 100},
                {label: '不跳转', value: -1}
            ],
            dialogImageUrl: '',
            dialogVisible: false
        })

        onMounted(() => {
            let params = useRoute().params
            if (params.id) {
                state.id = Number(params.id) 
                getAdInfo(state.id)
            }
            getAdPosition()
        })

        const getAdInfo = async (id: number) => {
            const data: any = await getAdInfoApi({id: id})
            state.form = data.info
        }

        const getAdPosition = async () => {
            const data: any = await getAdPositionListApi()
            state.positionList = data.list
        }
        const handleAvatarSuccess = (res: any, file: any) => {
            state.form.imageUrl = res.data.url
            state.imageUrl = URL.createObjectURL(file.raw)
        }

        const onSubmit = async () => {
            if (state.id) {
                try {
                    let res = await updateAd(state.form)
                    ElMessage({
                        type: 'info',
                        message: '修改成功',
                    });
                    window.history.back()
                } catch (err) {
                    ElMessage({
                        type: 'error',
                        message: err.data,
                    });
                }
                
            } else {
                try {
                    let res = await addAd(state.form)
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
            // this.form = {}
        }


        return {
            ...toRefs(state),
            onSubmit,
            handleAvatarSuccess
        }
    }
})

</script>


<style scoped lang="less">

.btn{padding-left:120px;}
</style>
