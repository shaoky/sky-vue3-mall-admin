<template>
    <el-form label-width="120px" style="width: 700px;" class="mt20">
        <el-form-item
            class="mt20"
            :label="item.name+':'" v-for="(item, index) in goodsSpecList"
            :key="index">
            <el-checkbox-group v-model="item.value" @change="onSpec">
                <el-checkbox :label="item1" v-for="(item1, index1) in item.content" :key="index1">{{item1}}</el-checkbox>
                <el-button
                    class="ml20"
                    type="primary" 
                    v-if="item.content.length > 0"
                    @click="deleteGoodsSpecVisible = true, goodsSku.specList = item"
                >删除
                </el-button>
                <el-button
                    class="ml20"
                    size="small"
                    type="primary"
                    @click="addGoodsSpecVisible = true, goodsSku.attrIndex = index, goodsSku.specName = ''"
                >新增{{item.name}}
                </el-button>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin-left: -70px;">
            <el-button type="primary" v-if="goodsSpecList.length > 0" @click="deleteGoodsAttrVisible = true">删除属性</el-button>
            <el-button type="primary" @click="addGoodsAttrVisible = true, goodsSku.specName1 = '', goodsSku.attrName = ''">新增属性</el-button>
            <el-button type="primary" @click="openSkuImage" v-if="goodsSpecList.length > 0">设置图片</el-button>
        </el-form-item>
    </el-form>
    <!-- sku表格 -->
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
                    <el-checkbox :label="item.name" v-for="(item, index) in goodsSpecList" :key="index">{{item.name}}</el-checkbox>
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
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import pullAll from 'lodash/pullAll'
import { imgBaseUrl } from '@/config/env'

export interface GoodsSpec {
    name: string;
    content: string[];
    value: string[];
    images: string[];
}

interface GoodsSku {
    id?: number;
    stock: number;
    price: string;
    imageUrl: string;
    spec: string[] | string;
    // specTable: Array<{
    //     rowspan: number;
    //     value: string;
    // }>
    specTable?: SpecTable[]
}

interface SpecTable {
    rowspan: number;
    value: string;
}

interface Props {
    goodsSpec: GoodsSpec[]
    goodsSku: GoodsSku[]
}

const props = defineProps<Props>()
let goodsSpecList = ref<GoodsSpec[]>([])
let saveGoodsSkuList = ref(props.goodsSku)
let addGoodsSpecVisible = ref(false)
let deleteGoodsSpecVisible = ref(false)
let addGoodsAttrVisible = ref(false)
let deleteGoodsAttrVisible = ref(false)
let addGoodsSkuImageVisible = ref(false)
let goodsSkuList = ref<GoodsSku[]>([])
let goodsSku = ref({
    specName: '',
    specName1: '',
    attrName: '',
    delSpec: [],
    attrIndex: 0,
    specList: [] as any,
    delAttr: [] as string[],
    saveGoodsSpecList: [] as GoodsSpec[], // 临时保存
    saveGoodsSkuList: [] as GoodsSku[], // 临时保存
    addAttrImage: -1,
    attrImageIndex: 0
})

watchEffect(() => {
    goodsSpecList.value = props.goodsSpec
})

const initData = () => {
    if (goodsSkuList.value.length > 0) {
        onSpec()
    }
}

const onSpec = () => {
    if (goodsSpecList.value.length === 0) {
        return
    }
    goodsSkuList.value = []
    let numsArr: number[] = []
    let idxArr: number[] = []
    goodsSpecList.value.forEach((item: GoodsSpec, index) => {
        numsArr.push(item.value.length)
        idxArr[index] = 0
    })
    let len = 1
    let rowsArr: number[] = []
    for (let i = 0; i < numsArr.length; i++) {
        len = len * numsArr[i]

        let tmpnum = 1
        for (let j = numsArr.length - 1; j > i; j--) {
            tmpnum = tmpnum * numsArr[j]
        }
        rowsArr.push(tmpnum)
    }

    for (var i = 0; i < len; i++) {
        let specTable: SpecTable[] = []
        let spec: string[] = []
        // let rowspan = 0
        for (let j = 0; j < goodsSpecList.value.length; j++) {
            // @ts-ignore
            let n = parseInt(i / rowsArr[j])
            if (j === 0) {
            } else if (j === goodsSpecList.value.length - 1) {
                n = idxArr[j]
                if (idxArr[j] + 1 >= numsArr[j]) {
                    idxArr[j] = 0
                } else {
                    idxArr[j]++
                }
            } else {
                // @ts-ignore
                let m = parseInt(i / rowsArr[j])
                n = m % numsArr[j]
            }
            let obj: any = {
                value: goodsSpecList.value[j].value[n]
            }
            if (i % rowsArr[j] === 0) {
                obj.rowspan = rowsArr[j]
                specTable.push(obj)
            }
            spec.push(goodsSpecList.value[j].value[n])
        }

        // 添加时候，查下是否有图片
        let goodsSpecListImage = goodsSpecList.value.find(item => item.images.length > 0)
        let imageUrl = ''
        if (goodsSpecListImage) {
            goodsSpecListImage.value.forEach((item, index) => {
                if (spec.includes(item)) {
                    // @ts-ignore
                    imageUrl = goodsSpecListImage.images[index]
                }
            })
        }


        let sku = {
            specTable,
            spec,
            price: '0',
            stock: 0,
            imageUrl
        }
        goodsSkuList.value.push(sku)
    }
    saveGoodsSkuList.value.forEach(item => {
        goodsSkuList.value.forEach(item1 => {
            // @ts-ignore
            let spec: string = item1.spec.join()
            if (item.spec === spec) {
                item1.id = item.id
                item1.price = item.price
                item1.stock = item.stock
                // item1.imageUrl = item.imageUrl
            }
        })
    })
}

const addSpec = () => {
    if (goodsSku.value.specName === '') {
        return
    }
    goodsSpecList.value[goodsSku.value.attrIndex].content.push(goodsSku.value.specName)
    addGoodsSpecVisible.value = false
}
const deleteSpec = () => {
    for (let item of goodsSpecList.value) {
        if (item.name === goodsSku.value.specList.name) {
            pullAll(item.content, goodsSku.value.delSpec)
            pullAll(item.value, goodsSku.value.delSpec)
        }
    }
    onSpec()
    deleteGoodsSpecVisible.value = false
}

const addAttr = () => {
    if (goodsSku.value.attrName === '') {
        return
    }
    goodsSpecList.value.push({
        name: goodsSku.value.attrName,
        content: [goodsSku.value.specName1],
        value: [],
        images: []
    })
    addGoodsAttrVisible.value = false
}

const deleteAttr = () => {
    let deleteList: GoodsSpec[] = []
    for (let item of goodsSpecList.value) {
        for (let item1 of goodsSku.value.delAttr) {
            if (item1 === item.name) {
                deleteList.push(item)
            }
        }
    }
    pullAll(goodsSpecList.value, deleteList)
    onSpec()
    deleteGoodsAttrVisible.value = false
}

const openSkuImage = () => {
    goodsSku.value.saveGoodsSpecList = cloneDeep(goodsSpecList.value)
    goodsSku.value.saveGoodsSkuList = cloneDeep(goodsSkuList.value)
    goodsSku.value.addAttrImage = goodsSpecList.value.findIndex(item => item.images.length > 0)
    addGoodsSkuImageVisible.value = true
}

const handleSkuImageSuccess = (res, file) => {
    let spec = goodsSpecList.value[Number(goodsSku.value.addAttrImage)]
    if (!spec.images) {
        spec.images = []
        for(let item of spec.value) {
            spec.images.push('')
        }
    }
    spec.images[goodsSku.value.attrImageIndex] = res.data.url
    for(let item of goodsSku.value.saveGoodsSkuList) {
        if (item.spec.includes(spec.value[goodsSku.value.attrImageIndex])) {
            item.imageUrl = res.data.url
        }
    }
    // state.form.imageUrl = res.data.url
    // state.imageUrl = URL.createObjectURL(file.raw)
}

const addGoodsSkuImage = () => {
    goodsSkuList.value = cloneDeep(goodsSku.value.saveGoodsSkuList)
    addGoodsSkuImageVisible.value = false
}

initData()
defineExpose({goodsSkuList, goodsSpecList})
</script>
<style lang="less" scoped>
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
.el-checkbox-group {
    display: flex;
}
</style>