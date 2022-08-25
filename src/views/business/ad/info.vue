<template>
    <el-form label-width="120px">
        <el-form-item label="标题：">
            <el-input class="info-input-width" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="位置：" >
            <el-select v-model="form.positionId" placeholder="请选择">
                <el-option 
                    v-for="item in positionList" 
                    :key="item.id" 
                    :label="item.title" 
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="类型：">
            <el-select v-model="form.type" placeholder="请选择">
                <el-option 
                    v-for="(item,index) in typeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="操作：">
            <el-input class="info-input-width" v-model="form.operation"></el-input>
        </el-form-item>
        <el-form-item label="广告排序：">
            <el-input class="info-input-width" v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="图片：">
            <upload-image :imageUrl="form.imageUrl" @success="handleAvatarSuccess"></upload-image>
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
import { getAdPositionList, addAd, updateAd, getAdInfo } from '@/api/getData'
import { useRoute } from 'vue-router'
import type { Models } from '@/rapper'
import UploadImage from '@/components/upload/image.vue'

type TypeModel = Models['GET/admin/ad/position/list']['Res']['data']['list'][0]

const route = useRoute()
const ue = ref()
let loading = ref(false)
let form = ref({
    id: 0,
    title: '',
    imageUrl: '',
    operation: '',
    isOpen: true,
    sort: 10,
    type: '' as string | number,
    positionId: '' as string | number
})
let positionList = ref<TypeModel[]>([])
let typeList = ref([
    {label: '网页链接', value: 1},
    {label: '商品详情', value: 2},
    {label: '不跳转', value: -1}
])

const initData = async() => {
    await _getAdPositionList()
    if (route.params.id) {
        await _getAdInfo(+route.params.id)
    }
    loading.value = true
}

const _getAdInfo = async (id: number) => {
    const data = await getAdInfo({id})
    form.value = data.info
}

const _getAdPositionList = async () => {
    const data = await getAdPositionList()
    positionList.value = data.list
}

const handleAvatarSuccess = (url: string) => {
    form.value.imageUrl = url
}

const onSubmit = async () => {
    const params = {
        ...form.value,
        type: +form.value.type,
        positionId: +form.value.positionId
    }
    if (form.value.id) {
        await updateAd(params)
    } else {
        await addAd(params)
    }
    window.history.back()
}

initData()
</script>