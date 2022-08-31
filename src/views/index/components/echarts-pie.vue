<template>
    <div id="echarts-pie" style="min-width: 500px; min-height: 500px;"></div>
</template>
<script lang="ts" setup>
import { shallowRef, nextTick, watchEffect } from 'vue'
import { Models } from '@/rapper'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption
type List = Models['GET/admin/index']['Res']['data']['goodsType']

interface Props {
    data: List
}   

const props = defineProps<Props>()
let chartDom = shallowRef()

watchEffect(async() => {
    await nextTick()
    chartDom.value = echarts.init(document.getElementById('echarts-pie')!)
    let options: EChartsOption
    options = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '销量',
                type: 'pie',
                radius: '50%',
                data: props.data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    chartDom.value.setOption(options)
})

const resize = () => {
    chartDom.value.resize()
}

defineExpose({resize})
</script>