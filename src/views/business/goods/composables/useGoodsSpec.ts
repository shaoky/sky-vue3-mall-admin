import { reactive } from 'vue'
import _ from 'lodash'

interface GoodsSpec {
    name: string;
    content: string[];
    value: string[];
}

interface GoodsSku {
    stock: number;
    price: string;
    imageUrl: string;
    spec: string[];
    specTable: Array<{
        rowspan: number;
        value: string;
    }>
}

export default function useGoodsSpec() {
    let state = reactive({
        goodsSpecList: [] as GoodsSpec[],
        addGoodsSpecVisible: false,
        deleteGoodsSpecVisible: false,
        addGoodsAttrVisible: false,
        deleteGoodsAttrVisible: false,
        goodsSkuList: [] as GoodsSku[],
        saveGoodsSkuList: [] as GoodsSpec[],
        goodsSku: {
            specName: '',
            specName1: '',
            attrName: '',
            delSpec: [],
            attrIndex: 0,
            specList: [] as any,
            delAttr: [] as GoodsSpec[]
        }
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
            let specTable = []
            let spec = []
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

            let sku = {
                specTable,
                spec,
                price: '0',
                stock: 0,
                imageUrl: ''
            }
            state.goodsSkuList.push(sku)
        }
        // @ts-ignore
        state.saveGoodsSkuList.forEach((item: GoodsSku) => {
            state.goodsSkuList.forEach((item1: GoodsSku) => {
                let spec = item1.spec.join()
                // @ts-ignore
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
        console.log(state.goodsSku.specList)
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
            value: []
        })
        state.addGoodsAttrVisible = false
    }

    const deleteAttr = () => {
        let arr = []
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

    return {
        goodsSpecState: state,
        onSpec,
        addSpec,
        deleteSpec,
        addAttr,
        deleteAttr
    }
}