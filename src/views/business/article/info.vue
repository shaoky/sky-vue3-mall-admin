<template>
    <div class="articleInfo">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{adId ? '文章详情': '文章广告' }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form label-width="120px">
            <el-form-item label="标题：">
                <el-input style="width:300px;" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="类型：" >
                <el-select v-model="form.typeId" placeholder="请选择">
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告排序：">
                <el-input style="width:300px;" v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="文章主图：">
                <el-upload
                    class="avatar-uploader"
                    :action="imgBaseUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="内容：" class="ueditor-box">
                <ueditor ref="ue"  :config="{initialContent: form.content}" v-if="form.content || !id"></ueditor>
            </el-form-item>
            <el-form-item label="是否启用：">
                <el-checkbox v-model="form.isOpen"></el-checkbox>
            </el-form-item>
            <div class="btn">
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import { defineComponent, reactive, onMounted, toRefs, ref } from 'vue';
import { imgBaseUrl } from '../../../config/env'
import { getArticleTypeList, addArticle, updateArticle, getArticleInfoApi } from '../../../api/getData'
import ueditor from '../../../components/ueditor.vue'
// import region from '@/components/common/region'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';

export default defineComponent({
    components: {
        ueditor
    },
    setup(props, a) {
        const ue = ref(null)
        const state = reactive({
            imgBaseUrl: imgBaseUrl,
            id: null,
            form: {
                imageUrl: '',
                isOpen: false,
                typeId: '',
                content: ''
            },
            positionList: [],
            typeList: [],
            dialogImageUrl: '',
            dialogVisible: false
        })

        onMounted(() => {
            let params = useRoute().params
            if (params.id) {
                state.id = Number(params.id) 
                getArticleInfo(state.id)
            }
            _getArticleTypeList()
        })

        const getArticleInfo = async (id: number) => {
            const data = await getArticleInfoApi({id: id})
            state.form = data.info
        }

        const _getArticleTypeList = async () => {
            const data = await getArticleTypeList()
            state.typeList = data.list
        }
        const handleAvatarSuccess = (res, file) => {
            state.form.imageUrl = res.data.url
            state.imageUrl = URL.createObjectURL(file.raw)
        }

        const onSubmit = async () => {
            // @ts-ignore
            state.form.content = ue.value.content
            if (state.id) {
                try {
                    let res = await updateArticle(state.form)
                    ElMessage({
                        type: 'info',
                        message: '修改成功',
                    });
                    window.history.back()
                } catch (err) {}
                
            } else {
                try {
                    let res = await addArticle(state.form)
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
            handleAvatarSuccess,
            ue
        }
    }
})

</script>


<style scoped lang="less">

.btn{text-align: center}
</style>
