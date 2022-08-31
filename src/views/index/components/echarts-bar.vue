<template>
    <div id="echarts-bar" style="min-width: 500px; min-height: 500px;"></div>
</template>
<script lang="ts" setup>
import { shallowRef, nextTick, watchEffect } from 'vue'
import { Models } from '@/rapper'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption
type List = Models['GET/admin/index']['Res']['data']['access']

interface Props {
    data: List
}   

const props = defineProps<Props>()
let chartDom = shallowRef()

watchEffect(async() => {
    await nextTick()
    chartDom.value = echarts.init(document.getElementById('echarts-bar')!)
    let options: EChartsOption
    options = {
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            data: props.data.map(item => item.name)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: props.data.map(item => item.value),
                type: 'bar'
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