import { ref }  from 'vue'
import type { Ref }  from 'vue'
import pullAll from 'lodash/pullAll'
import type { GoodsSpec } from '../interface'

export default function useGoodsSkuSpec(goodsSpecList: Ref<GoodsSpec[]>, onSku) {
    let addGoodsSpecVisible = ref(false)
    let deleteGoodsSpecVisible = ref(false)
    let specName = ref('')
    let attrIndex = ref(0)
    let specList = ref<any>([])
    let delSpecList = ref([])

    const addSpec = () => {
        if (specName.value === '') {
            return
        }
        goodsSpecList.value[attrIndex.value].content.push(specName.value)
        addGoodsSpecVisible.value = false
    }

    const deleteSpec = () => {
        for (let item of goodsSpecList.value) {
            if (item.name === specList.value.name) {
                pullAll(item.content, delSpecList.value)
                pullAll(item.value, delSpecList.value)
            }
        }
        onSku()
        deleteGoodsSpecVisible.value = false
    }

    return {
        addGoodsSpecVisible,
        deleteGoodsSpecVisible,
        specName,
        attrIndex,
        specList,
        delSpecList,
        addSpec,
        deleteSpec
    }
}