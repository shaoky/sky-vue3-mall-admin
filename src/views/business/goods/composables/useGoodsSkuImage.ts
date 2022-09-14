import { ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'

import type { Ref } from 'vue'
import type { GoodsSku, GoodsSpec } from '../interface'

export default function useGoodsSkuImage(goodsSpecList: Ref<GoodsSpec[]>, goodsSkuList: Ref<GoodsSku[]>) {
    let addGoodsSkuImageVisible = ref(false)
    let addAttrImageIndex = ref(-1) // 添加图片到哪个属性上面
    let saveGoodsSpecList = ref<GoodsSpec[]>([]) // 备份用于取消恢复数据
    let saveGoodsSkuList = ref<GoodsSku[]>([]) // 
    let attrImageIndex = ref(0) // 图片添加到哪个值

    const openSkuImage = () => {
        saveGoodsSpecList.value = cloneDeep(goodsSpecList.value)
        saveGoodsSkuList.value = cloneDeep(goodsSkuList.value)
        addAttrImageIndex.value = goodsSpecList.value.findIndex(item => item.images.length > 0)
        addGoodsSkuImageVisible.value = true
    }

    /**
     * 图片上传
     */
    const handleSkuImageSuccess = (res, file) => {
        let spec = goodsSpecList.value[Number(addAttrImageIndex.value)]
        if (!spec.images || spec.images.length === 0) {
            spec.images = []
            for(let item of spec.value) {
                spec.images.push('')
            }
        }
        spec.images[attrImageIndex.value] = res.data.url
        for(let item of saveGoodsSkuList.value) {
            if (item.spec.includes(spec.value[attrImageIndex.value])) {
                item.imageUrl = res.data.url
            }
        }
    }

    /**
     * 保存添加的图片
     */
    const addGoodsSkuImage = () => {
        addGoodsSkuImageVisible.value = false
        goodsSkuList.value = saveGoodsSkuList.value
    }

    return {
        addGoodsSkuImageVisible,
        addAttrImageIndex,
        attrImageIndex,
        saveGoodsSpecList,
        openSkuImage,
        addGoodsSkuImage,
        handleSkuImageSuccess
    }
}