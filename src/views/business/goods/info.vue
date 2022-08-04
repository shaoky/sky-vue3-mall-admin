<template>
    <div class="articleInfo">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id ? '产品详情': '新增产品' }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form label-width="120px" style="width: 700px;" v-if="isLoading">
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
            <el-tag class="mt20">商品规格</el-tag>
            <el-form label-width="120px" style="width: 700px;">
                <el-form-item
                    class="mt20"
                    :label="item.name+':'" v-for="(item, index) in goodsSpecList"
                    :key="index">
                    <el-checkbox-group v-model="item.value" @change="onSpec">
                        <el-checkbox :label="item1" v-for="(item1, index1) in item.content" :key="index1">{{item1}}</el-checkbox>
                        <el-button type="primary" style="margin-left: 20px;" v-if="item.content.length > 0" @click="deleteGoodsSpecVisible = true, goodsSku.specList = item">删除</el-button>
                        <el-button type="primary" style="margin-left: 20px;" @click="addGoodsSpecVisible = true, goodsSku.attrIndex = index, goodsSku.specName = ''">新增{{item.name}}</el-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item style="margin-left: -70px;">
                    <el-button type="primary" style="margin-left: 20px;" v-if="goodsSpecList.length > 0" @click="deleteGoodsAttrVisible = true">删除属性</el-button>
                    <el-button type="primary" style="margin-left: 20px;" @click="addGoodsAttrVisible = true, goodsSku.specName1 = '', goodsSku.attrName = ''">新增属性</el-button>
                    <el-button type="primary" style="margin-left: 20px" @click="openSkuImage" v-if="goodsSpecList.length > 0">设置图片</el-button>
                </el-form-item>
            </el-form>
            <table class="v-table" style="margin-left: 70px;">
                <tr>
                    <th v-for="(item, index) in goodsSpecList" :key="index" width="80">{{item.name}}</th>
                    <th>销售价格</th>
                    <th style="width: 180px;">商品库存</th>
                    <th>图片</th>
                    <!-- <th>库存预警值</th> -->
                </tr>
                <tr v-for="(item, index) in goodsSkuList" :key="index">
                    <td v-for="(item1, index1) in item.specTable" :key="index1" :rowspan="item1.rowspan">{{item1.value}}</td>
                    <td><el-input v-model.number="item.price"></el-input></td>
                    <td style="width: 180px;"><el-input v-model.number="item.stock"></el-input></td>
                    <td><img :src="item.imageUrl" width="50" height="50" v-if="item.imageUrl"></td>
                    <!-- <td><el-input v-model.number="item.goodsStockWarn"></el-input></td> -->
                </tr>
            </table>


            <el-tag class="mt20">商品属性</el-tag><br/>
            <div v-for="item of attrList" :key="item.id" class="mt20">
                <el-form-item :label="item.name + ':'">
                    <el-input v-model="item.value" v-if="item.type === 1" style="width: 250px;"></el-input>
                    <el-radio-group v-model="item.value" v-if="item.type === 2">
                        <el-radio :label="item1" v-for="(item1, index1) in item.content" :key="index1">{{item1}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>

            <el-tag class="mt20 mb20">商品图片</el-tag>
            <el-form-item label="产品主图：">
                <el-upload
                    class="avatar-uploader"
                    :action="imgBaseUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
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
                <ueditor ref="ue" :config="{initialContent: form.content}" v-if="isLoading"></ueditor>
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

        <el-dialog title="新增规格" v-model="addGoodsSpecVisible" width="500px" center>
            <el-form label-width="120px">
                <el-form-item label="规格名称：">
                    <el-input v-model="goodsSku.specName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addGoodsSpecVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSpec()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="删除规格" v-model="deleteGoodsSpecVisible" width="500px" center>
            <el-form label-width="120px">
                <el-form-item label="规格名称：">
                    <el-checkbox-group v-model="goodsSku.delSpec">
                        <el-checkbox :label="item" v-for="(item, index) in goodsSku.specList.content" :key="index">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteGoodsSpecVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteSpec">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="删除属性" v-model="deleteGoodsAttrVisible" width="500px" center>
            <el-form label-width="120px">
                <el-form-item label="属性名称：">
                    <el-checkbox-group v-model="goodsSku.delAttr">
                        <el-checkbox :label="item" v-for="(item, index) in goodsSpecList" :key="index">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteGoodsAttrVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteAttr">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="新增属性" v-model="addGoodsAttrVisible" width="500px" center>
            <el-form label-width="120px">
                <el-form-item label="属性名称：">
                    <el-input v-model="goodsSku.attrName"></el-input>
                </el-form-item>
                <el-form-item label="第一个规格：">
                    <el-input v-model="goodsSku.specName1"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addGoodsAttrVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAttr()">确 定</el-button>
            </span>
        </el-dialog>
        
        <el-dialog title="设置图片" v-model="addGoodsSkuImageVisible" width="500px" center>
            <el-form label-width="120px">
                <el-form-item label="属性名称：">
                    <el-radio-group v-model="goodsSku.addAttrImage">
                        <el-radio v-for="(item, index) in goodsSpecList" :label="index" :key="index">{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <table class="v-table" style="margin-left: 70px;" v-if="goodsSku.addAttrImage >= 0">
                <tr v-for="(item, index) in goodsSpecList[goodsSku.addAttrImage].value" :key="index">
                   <td>{{item}}</td>
                   <td>
                        <el-upload
                            :action="imgBaseUrl"
                            :show-file-list="false"
                            class="upload-demo"
                            :on-success="handleSkuImageSuccess"
                        >
                        <img
                            width="150"
                            height="150"
                            :src="goodsSpecList[goodsSku.addAttrImage].images[index]" 
                            @click="goodsSku.attrImageIndex = index" 
                            v-if="goodsSpecList[goodsSku.addAttrImage].images[index]">
                        <el-button @click="goodsSku.attrImageIndex = index" v-else>上传图片</el-button>
                        </el-upload>
                    </td>
                </tr>
            </table>
            <div class="mt20">注意：只能选择其中一个属性上传</div>
            <span slot="footer" class="dialog-footer mt20">
                <el-button @click="goodsSpecList = goodsSku.saveGoodsSpecList, addGoodsSkuImageVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGoodsSkuImage()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import { defineComponent, reactive, onMounted, toRefs, ref, watch } from 'vue';
import { imgBaseUrl } from '../../../config/env'
import { getGoodsTypeListApi, goodsGoodsInfo, addGoods, updateGoods, getGoodsTypeInfo } from '../../../api/getData'
import ueditor from '../../../components/ueditor.vue'
// import region from '@/components/common/region'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { deleteChildren } from '../../../utils/tools'
import useGoodsSpec from './composables/useGoodsSpec'
import { Models } from '@/rapper'

interface bannerModel {
    id?: number;
    url: string;
}

export default defineComponent({
    components: {
        ueditor
    },
    setup() {
        const ue = ref(null)
        const state = reactive({
            isLoading: false,
            imgBaseUrl: imgBaseUrl,
            classList: [] as Models['GET/admin/goods/type/list']['Res']['data']['list'],
            id: null as number | null,
            form: {
                imageUrl: '',
                isOpen: 0,
                content: ' ',
                saleCount: 0,
                sort: 100,
                goodsClassId: undefined as number | undefined
            } as Models['POST/admin/goods/update']['Req'],
            typeList: [],
            bannerList: [] as bannerModel[],
            attrList: [] as Models['GET/admin/goods/type/info']['Res']['data']['goodsAttr'],
            // goodsSpecList: [],
            dialogImageUrl: '',
            dialogVisible: false,
        })

        const { onSpec, addSpec, deleteSpec, addAttr, deleteAttr, handleSkuImageSuccess, openSkuImage, goodsSpecState, addGoodsSkuImage } = useGoodsSpec()
        
        onMounted(async() => {

            let params = useRoute().params
            await getGoodsTypeList()
            if (params.id) {
                state.id = Number(params.id) 
                await _getGoodsInfo(state.id)
            }
            state.isLoading = true
        })
        
        const _getGoodsInfo = async (id: number) => {
            const data = await goodsGoodsInfo({id: id})
            state.form = {...data.info} as any
            state.bannerList = data.info.bannerList.map(item => ({
                id: item.id,
                url: item.imageUrl
            }))
            await goodsClassIdChange([data.info.goodsClassId])
            let goodsAttr = data.info.attr
            for (let item of goodsAttr) {
                for (let item1 of state.attrList) {
                    if (item1.name === item.name) {
                        item1.value = item.value
                    }
                }
            }
            let goodsSpec = JSON.parse(data.info.spec) || []
            goodsSpecState.goodsSpecList = goodsSpec
            goodsSpecState.saveGoodsSkuList = data.info.goodsSkuList
            if (data.info.goodsSkuList.length > 0) {
                onSpec()
            }
            
        }

        // @ts-ignore
        const getGoodsClassIdArr = (data: any, id: number, ids: any) => {
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

        const getGoodsTypeList = async () => {
            const data = await getGoodsTypeListApi({type: 2, isOpen: 1})
            deleteChildren(data.list)
            state.classList = data.list
        }
        const handleAvatarSuccess = (res, file) => {
            state.form.imageUrl = res.data.url
        }

        // 图片预览
        const handlePictureCardPreview = (file) => {
            state.dialogImageUrl = file.url
            state.dialogVisible = true
        }

        const goodsClassIdChange = async(data) => {
            state.form.goodsClassId = data[data.length - 1]
            // let ids = data.toString()
            let res = await getGoodsTypeInfo({id: state.form.goodsClassId})
            state.attrList = res.goodsAttr
            // @ts-ignore
            goodsSpecState.goodsSpecList = res.goodsSpec
            goodsSpecState.goodsSpecList.forEach(item => {
                if (!item.images) {
                    item.images = []
                }
            })

            // const { specList }  = useGoodsSpec(res.goodsSpec)
        }



        const onSubmit = async () => {
            let form = {...state.form}
            // @ts-ignore
            form.content = ue.value.content
            form.bannerList = state.bannerList.map(item => {
                return {
                    id: item.id || undefined,
                    // @ts-ignore
                    imageUrl: !item.id ? item?.response?.data?.url : item.url
                }
            })
            form.attr = JSON.stringify(
                state.attrList
                .filter(item => item.value)
                .map(item => {
                    return {
                        name: item.name,
                        value: item.value
                    }
                })
            )
            
            // 规格
            let spec = goodsSpecState.goodsSpecList.map(item => {
                return {
                    name: item.name,
                    content: item.content,
                    value: item.value,
                    images: item.images
                }
            })
            form.spec = JSON.stringify(spec)

            // form.sku = goodsSpecState.goodsSkuList.map(item => {
            //     return {
            //         id: item.id || undefined,
            //         imageUrl: item.imageUrl,
            //         stock: item.stock,
            //         price: item.price,
            //         // @ts-ignore
            //         spec: item.spec.join()
            //     }
            // })

            if (state.id) {
                try {
                    let res = await updateGoods(form)
                    ElMessage({
                        type: 'info',
                        message: '修改成功',
                    });
                    window.history.back()
                } catch (err) {}
                
            } else {
                try {
                    await addGoods(form)
                    ElMessage({
                        type: 'info',
                        message: '添加成功',
                    });
                    window.history.back()
                } catch (err: any) {
                    ElMessage({
                        type: 'error',
                        message: err.data,
                    });
                }
            }
        }

        return {
            ...toRefs(state),
            ...toRefs(goodsSpecState),
            onSubmit,
            handleAvatarSuccess,
            handleSkuImageSuccess,
            ue,
            handlePictureCardPreview,
            goodsClassIdChange,
            onSpec,
            addSpec,
            deleteSpec,
            addAttr,
            deleteAttr,
            addGoodsSkuImage,
            openSkuImage
        }
    }
})

</script>


<style scoped lang="less">
.btn{text-align: center}
.v-table{
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    th {
        padding: 10px 15px;
        background-color: #eef1f6;
        color: #909399;
        font-weight: normal;
    }
    td {
        vertical-align: middle;
        padding: 10px 15px;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
    }
}
.avatar {
    width: 150px;
    height: 150px;
}
</style>
