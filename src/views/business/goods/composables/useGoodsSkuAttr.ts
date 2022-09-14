import { ref } from 'vue'
import type { Ref } from 'vue'
import pullAll from 'lodash/pullAll'
import type { GoodsSpec } from '../interface'

export default function useGoodsSkuAttr(goodsSpecList: Ref<GoodsSpec[]>, onSku) {
    let deleteGoodsAttrVisible = ref(false)
    let addGoodsAttrVisible = ref(false)
    let attrName = ref('')
    let firstSpecName = ref('')
    let delAttrList = ref<string[]>([])

    const addAttr = () => {
        if (attrName.value === '') {
            return
        }
        goodsSpecList.value.push({
            name: attrName.value,
            content: [firstSpecName.value],
            value: [],
            images: []
        })
        addGoodsAttrVisible.value = false
    }
    
    const deleteAttr = () => {
        let deleteList: GoodsSpec[] = []
        for (let item of goodsSpecList.value) {
            for (let item1 of delAttrList.value) {
                if (item1 === item.name) {
                    deleteList.push(item)
                }
            }
        }
        pullAll(goodsSpecList.value, deleteList)
        onSku()
        deleteGoodsAttrVisible.value = false
    }

    return {
        addGoodsAttrVisible,
        deleteGoodsAttrVisible,
        attrName,
        firstSpecName,
        delAttrList,
        addAttr,
        deleteAttr,
    }
}