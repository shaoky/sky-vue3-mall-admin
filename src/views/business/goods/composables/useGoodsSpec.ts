import { reactive } from 'vue'
import _ from 'lodash'

interface GoodsSpec {
    name: string;
    content: string[];
    value: string[];
    images: string[];
}

interface GoodsSku {
    stock: number;
    price: string;
    imageUrl: string;
    spec: string[] | string;
    // specTable: Array<{
    //     rowspan: number;
    //     value: string;
    // }>
    specTable: SpecTable[]
}

interface SpecTable {
    rowspan: number;
    value: string;
}

export default function useGoodsSpec() {
    let state = reactive({
        goodsSpecList: [] as GoodsSpec[],
        addGoodsSpecVisible: false,
        deleteGoodsSpecVisible: false,
        addGoodsAttrVisible: false,
        deleteGoodsAttrVisible: false,
        addGoodsSkuImageVisible: false,
        goodsSkuList: [] as GoodsSku[],
        saveGoodsSkuList: [] as GoodsSku[],
        goodsSku: {
            specName: '',
            specName1: '',
            attrName: '',
            delSpec: [],
            attrIndex: 0,
            specList: [] as any,
            delAttr: [] as GoodsSpec[],
            saveGoodsSpecList: [] as GoodsSpec[], // 临时保存
            setGoodsSkuList: [] as GoodsSku[], // 临时保存
            addAttrImage: -1,
            attrImageIndex: 0
        },
    })
    
    const onSpec = () => {
        state.goodsSkuList = []
        let numsArr: number[] = []
        let idxArr: number[] = []
        let goodsSpecList = state.goodsSpecList
        goodsSpecList.forEach((item: GoodsSpec, index) => {
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
            for (let j = 0; j < goodsSpecList.length; j++) {
                // @ts-ignore
                let n = parseInt(i / rowsArr[j])
                if (j === 0) {
                } else if (j === goodsSpecList.length - 1) {
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
                    value: goodsSpecList[j].value[n]
                }
                if (i % rowsArr[j] === 0) {
                    obj.rowspan = rowsArr[j]
                    specTable.push(obj)
                }
                spec.push(goodsSpecList[j].value[n])
            }

            // 添加时候，查下是否有图片
            let goodsSpecListImage = goodsSpecList.find(item => item.images.length > 0)
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
            state.goodsSkuList.push(sku)
        }
        state.saveGoodsSkuList.forEach(item => {
            state.goodsSkuList.forEach(item1 => {
                // @ts-ignore
                let spec: string = item1.spec.join()
                if (item.spec === spec) {
                    item1.price = item.price
                    item1.stock = item.stock
                    item1.imageUrl = item.imageUrl
                }
            })
        })
    }

    const addSpec = () => {
        if (state.goodsSku.specName === '') {
            return
        }
        state.goodsSpecList[state.goodsSku.attrIndex].content.push(state.goodsSku.specName)
        state.addGoodsSpecVisible = false
    }

    const deleteSpec = () => {
        for (let item of state.goodsSpecList) {
            if (item.name === state.goodsSku.specList.name) {
                _.pullAll(item.content, state.goodsSku.delSpec)
            }
        }

        state.deleteGoodsSpecVisible = false
    }

    const addAttr = () => {
        if (state.goodsSku.attrName === '') {
            return
        }
        state.goodsSpecList.push({
            name: state.goodsSku.attrName,
            content: [state.goodsSku.specName1],
            value: [],
            images: []
        })
        state.addGoodsAttrVisible = false
    }

    const deleteAttr = () => {
        let arr: any = []
        for (let item of state.goodsSpecList) {
            for (let item1 of state.goodsSku.delAttr) {
                if (item1.name === item.name) {
                    arr.push(item)
                }
            }
        }
        _.pullAll(state.goodsSpecList, arr)
        onSpec()
        state.deleteGoodsAttrVisible = false
    }

    const openSkuImage = () => {
        state.goodsSku.saveGoodsSpecList = _.cloneDeep(state.goodsSpecList)
        state.goodsSku.setGoodsSkuList = _.cloneDeep(state.goodsSkuList)
        state.goodsSku.addAttrImage = state.goodsSpecList.findIndex(item => item.images.length > 0)
        state.addGoodsSkuImageVisible = true
    }
    // sku上传图片
    const handleSkuImageSuccess = (res: any, file: any) => {
        let spec = state.goodsSpecList[Number(state.goodsSku.addAttrImage)]
        if (!spec.images) {
            spec.images = []
            for(let item of spec.value) {
                spec.images.push('')
            }
        }
        spec.images[state.goodsSku.attrImageIndex] = res.data.url
        for(let item of state.goodsSku.setGoodsSkuList) {
            if (item.spec.includes(spec.value[state.goodsSku.attrImageIndex])) {
                item.imageUrl = res.data.url
            }
        }
        // state.form.imageUrl = res.data.url
        // state.imageUrl = URL.createObjectURL(file.raw)
    }

    const addGoodsSkuImage = () => {
        state.goodsSkuList = _.cloneDeep(state.goodsSku.setGoodsSkuList)
        state.addGoodsSkuImageVisible = false
    }



    return {
        goodsSpecState: state,
        onSpec,
        addSpec,
        deleteSpec,
        addAttr,
        deleteAttr,
        openSkuImage,
        handleSkuImageSuccess,
        addGoodsSkuImage
    }
}