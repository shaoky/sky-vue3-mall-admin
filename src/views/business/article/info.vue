<template>
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
            <el-input style="width:300px;" v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="文章主图：">
            <upload-image :imageUrl="form.imageUrl" @success="handleAvatarSuccess"></upload-image>
        </el-form-item>
        <el-form-item label="内容：" class="ueditor-box">
            <Ueditor ref="ue"  :config="{initialContent: form.content}" v-if="loading"></Ueditor>
        </el-form-item>
        <el-form-item label="是否启用：">
            <el-checkbox v-model="form.isOpen"></el-checkbox>
        </el-form-item>
        <div class="btn-submit">
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getArticleTypeList, addArticle, updateArticle, getArticleInfoApi } from '@/api/getData'
import Ueditor from '@/components/ueditor.vue'
import { useRoute } from 'vue-router'
import type { Models } from '@/rapper'
import UploadImage from '@/components/upload/image.vue'

type TypeModel = Models['GET/admin/article/type/list']['Res']['data']['list'][0]

const route = useRoute()
const ue = ref()
let loading = ref(false)
let form = ref({
    id: 0,
    title: '',
    imageUrl: '',
    isOpen: true,
    sort: 10,
    typeId: '' as string | number,
    content: ''
})
let typeList = ref<TypeModel[]>([])

const initData = async() => {
    await _getArticleTypeList()
    if (route.params.id) {
        await getArticleInfo(+route.params.id)
    }
    loading.value = true
}

const getArticleInfo = async (id: number) => {
    const data = await getArticleInfoApi({id})
    form.value = data.info
}

const _getArticleTypeList = async () => {
    const data = await getArticleTypeList()
    typeList.value = data.list
}

const handleAvatarSuccess = (url: string) => {
    form.value.imageUrl = url
}

const onSubmit = async () => {
    form.value.content = ue.value.content
    if (form.value.id) {
        await updateArticle({
            ...form.value,
            typeId: +form.value.typeId
        })
    } else {
        await addArticle({
            ...form.value,
            typeId: +form.value.typeId
        })
    }
    window.history.back()
}

initData()
</script>