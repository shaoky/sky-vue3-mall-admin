import { ref } from 'vue'
import type { GoodsSku, GoodsSpec } from '../interface'

export default function useGoodsSkuImage(goodsSpecList, goodsSkuList, updateGoodsSkuList) {
    let addGoodsSkuImageVisible = ref(false)
    let addAttrImageIndex = ref(-1) // 添加图片到哪个属性上面
    let saveGoodsSpecList = ref<GoodsSpec[]>([]) // 备份用于取消恢复数据
    let saveGoodsSkuList = ref<GoodsSku[]>([]) // 
    let attrImageIndex = ref(0) // 图片添加到哪个值

    const openSkuImage = () => {
        saveGoodsSpecList.value = goodsSpecList
        saveGoodsSkuList.value = goodsSkuList
        addAttrImageIndex.value = goodsSpecList.findIndex(item => item.images.length > 0)
        addGoodsSkuImageVisible.value = true
    }

    const handleSkuImageSuccess = (res, file) => {
        let spec = saveGoodsSpecList.value[Number(addAttrImageIndex.value)]
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

    const addGoodsSkuImage = () => {
        addGoodsSkuImageVisible.value = false
        updateGoodsSkuList(saveGoodsSkuList.value)
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