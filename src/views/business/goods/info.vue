<template>
    <div class="goodsInfo">
        <el-form 
            label-width="120px" 
            ref="ruleFormRef" 
            :model="goods"
            :rules="rules" 
            style="width: 700px;"
            v-if="isLoading"
        >
            <el-form-item label="产品类型：" prop="goodsClassId">
                <el-cascader
                    v-model="goods.goodsClassId"
                    :options="classList"
                    :props="{ value: 'id', label: 'title' }"
                    placeholder="请选择"
                    @change="goodsClassIdChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="产品名称：" prop="title">
                <el-input v-model="goods.title"></el-input>
            </el-form-item>
            <el-form-item label="产品副标题：">
                <el-input v-model="goods.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="产品价格：" prop="price">
                <el-input style="width:200px;" v-model="goods.price"></el-input>
            </el-form-item>
            <el-form-item label="会员价格：">
                <el-input style="width:200px;" v-model="goods.memberPrice"></el-input>
            </el-form-item>
            <el-form-item label="产品销量：">
                <el-input style="width:200px;" v-model.number="goods.saleCount"></el-input>
            </el-form-item>
            <el-form-item label="产品库存：" prop="stock">
                <el-input style="width:200px;" v-model.number="goods.stock"></el-input>
            </el-form-item>
            <el-tag class="mt20">商品规格</el-tag>
            <goods-sku ref="goodsSkuRef" :goodsSpec="goodsSpecList" :goodsSku="goods.goodsSkuList" v-if="goods.goodsClassId && isLoadingGoodsSku"></goods-sku>
            <br/>
            <el-tag class="mt20">商品属性</el-tag>
            <br/>
            <div v-for="item of attrList" :key="item.id" class="mt20">
                <el-form-item :label="item.name + ':'">
                    <el-input v-model="item.value" v-if="item.type === 1" style="width: 250px;"></el-input>
                    <el-radio-group v-model="item.value" v-if="item.type === 2">
                        <el-radio :label="item1" v-for="(item1, index1) in item.content" :key="index1">{{item1}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>

            <el-tag class="mt20 mb20">商品图片</el-tag>
            <el-form-item label="产品主图：" prop="imageUrl">
                <upload-image :imageUrl="goods.imageUrl" @success="handleAvatarSuccess"></upload-image>
            </el-form-item>
            <el-form-item label="轮播图：" style="width: 800px">
                <el-upload
                    :action="imgBaseUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :file-list="bannerList"
                    :on-preview="handlePictureCardPreview"
                    style="width: 800px">
                    <el-icon><Plus /></el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="内容：" class="ueditor-box">
                <ueditor ref="ue" :config="{initialContent: goods.content}" v-if="isLoading"></ueditor>
            </el-form-item>
            <el-form-item label="产品排序：">
                <el-input style="width:200px;" v-model.number="goods.sort"></el-input>
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

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import GoodsSku from './components/goods-sku.vue'
import { imgBaseUrl } from '@/config/env'
import { getGoodsTypeList, goodsGoodsInfo, addGoods, updateGoods, getGoodsTypeInfo } from '../../../api/getData'
import ueditor from '@/components/ueditor.vue'
import { useRoute } from 'vue-router'
import { deleteChildren } from '@/utils/tools'
import { Models } from '@/rapper'
import UploadImage from '@/components/upload/image.vue'
import type { GoodsSpec } from './interface'

type ClassModel = Models['GET/admin/goods/type/list']['Res']['data']['list'][0]
type GoodsModel = Models['GET/admin/goods/info']['Res']['data']['info']
type GoodsAttr = Models['GET/admin/goods/type/info']['Res']['data']['goodsAttr'][0]

interface BannerModel {
    id?: number;
    url?: string;
    imageUrl: string;
    name: string; // el-upload 要求必传
}

const route = useRoute()
const ruleFormRef = ref<FormInstance>()
const goodsSkuRef = ref()
const ue = ref()
let isLoading = ref(false)
let classList = ref<ClassModel[]>([])
let id = ref()
let goods = ref<GoodsModel>({
    id: 0,
    title: '',
    subtitle: '', 
    price: '',
    memberPrice: '',
    stock: 0,
    imageUrl: '',
    isOpen: false,
    content: ' ',
    saleCount: 0,
    sort: 100,
    goodsClassId: 0,
    bannerList: [],
    goodsSkuList: [],
    attr: [],
    spec: ''
})
let rules = ref<FormRules>({
    goodsClassId: [{ required: true, message: '请输入类型', trigger: 'change' }],
    title: [{ required: true, message: '请输入标题', trigger: 'change' }],
    price: [{ required: true, message: '请输入价格', trigger: 'change' }],
    stock: [{ required: true, message: '请输入库存', trigger: 'change' }],
    imageUrl: [{ required: true, message: '请上传主图', trigger: 'change' }],
})
let bannerList = ref<BannerModel[]>([])
let attrList = ref<GoodsAttr[]>([])
let dialogImageUrl = ref('')
let dialogVisible = ref(false)
let goodsSpecList = ref<GoodsSpec[]>([])
let isLoadingGoodsSku = ref(false)

// const goods = toRefs(goods)

const initData = async() => {
    await _getGoodsTypeList()
    if (route.params.id) {
        id.value = Number(route.params.id) 
        await _getGoodsInfo(id.value)
    }
    isLoading.value = true
}

const _getGoodsInfo = async (id: number) => {
    const data = await goodsGoodsInfo({id: id})
    goods.value = data.info
    bannerList.value = data.info.bannerList.map(item => ({
        id: item.id,
        url: item.imageUrl,
        imageUrl: '',
        name: ''
    }))
    await goodsClassIdChange([data.info.goodsClassId])
    let goodsAttr = data.info.attr
    for (let item of goodsAttr) {
        for (let item1 of attrList.value) {
            if (item1.name === item.name) {
                item1.value = item.value
            }
        }
    }
    let goodsSpec = JSON.parse(data.info.spec) || []
    goodsSpecList.value = goodsSpec
}

const _getGoodsTypeList = async () => {
    const data = await getGoodsTypeList({type: 2, isOpen: 1})
    deleteChildren(data.list)
    classList.value = data.list
}

// 修改分类，初始化产品属性，sku属性
const goodsClassIdChange = async(ids: number[]) => {
    // 编辑产品，修改分类，不用重置sku
    if (isLoadingGoodsSku.value && id.value) {
        return
    }
    isLoadingGoodsSku.value = false
    let res = await getGoodsTypeInfo({id: ids.at(-1)!})
    attrList.value = res.goodsAttr
    // @ts-ignore
    goodsSpecList.value = res.goodsSpec
    goodsSpecList.value.forEach(item => {
        if (!item.images) {
            item.images = []
        }
    })
    isLoadingGoodsSku.value = true
}

// 商品主图
const handleAvatarSuccess = (url: string) => {
    goods.value.imageUrl = url
}

// 轮播图
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

const onSubmit = async () => {
    let params = {
        id: goods.value.id,
        goodsClassId: goods.value.goodsClassId,
        title: goods.value.title,
        subtitle: goods.value.subtitle,
        imageUrl: goods.value.imageUrl,
        price: goods.value.price,
        memberPrice: goods.value.memberPrice,
        stock: goods.value.stock,
        saleCount: goods.value.saleCount,
        content: '',
        bannerList: [] as BannerModel[],
        spec: '',
        sku: [],
        attr: '',
        isOpen: false,
        sort: goods.value.sort
    }
    if (typeof goods.value.goodsClassId === 'number') {
        params.goodsClassId = goods.value.goodsClassId
    } else {
        // @ts-ignore
        params.goodsClassId = goods.value.goodsClassId.at(-1)
    }
    await ruleFormRef.value!.validate()
    
    params.content = ue.value.content
    params.bannerList = bannerList.value.map(item => {
        return {
            id: item.id || undefined,
            name: '',
            // @ts-ignore
            imageUrl: !item.id ? item?.response?.data?.url : item.url
        }
    })

    // 属性
    params.attr = JSON.stringify(
        attrList.value
        .filter(item => item.value)
        .map(item => {
            return {
                name: item.name,
                value: item.value
            }
        })
    )
    // 规格
    let spec = goodsSkuRef.value?.goodsSpecList.map(item => {
        return {
            name: item.name,
            content: item.content,
            value: item.value,
            images: item.images
        }
    })
    params.spec = JSON.stringify(spec)

    params.sku = goodsSkuRef.value?.goodsSkuList.map(item => {
        return {
            id: item.id || undefined,
            imageUrl: item.imageUrl,
            stock: item.stock,
            price: item.price,
            spec: item.spec.join()
        }
    })
    
    if (id.value) {
        await updateGoods(params)
    } else {
        await addGoods(params)
    }
    window.history.back()
}

initData()

</script>
<style scoped lang="less">
.btn{text-align: center}
.avatar {
    width: 150px;
    height: 150px;
}
</style>
