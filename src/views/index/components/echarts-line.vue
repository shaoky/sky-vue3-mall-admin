<template>
    <div id="echarts-main" style="min-width: 500px; min-height: 500px;"></div>
</template>
<script lang="ts" setup>
import { nextTick, watchEffect, shallowRef } from 'vue'
import { Models } from '@/rapper'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption
type List = Models['GET/admin/index']['Res']['data']['list']
const TITLE = {
    orderNum: '订单数量',
    orderMoney: '订单金额',
    userNum: '新增用户'
}
interface Props {
    data: List
    name: string
}   

const props = defineProps<Props>()
let chartDom = shallowRef()

watchEffect(async() => {
    const name = props.name
    await nextTick()
    const dateList = props.data.map(item => item.date)
    const dataList = props.data.map(item => item[name])
    chartDom.value = echarts.init(document.getElementById('echarts-main')!)
    // 绘制图表
    let options: EChartsOption
    options = {
        xAxis: {
            type: 'category',
            data: dateList
        },
        yAxis: [
            {
                type: 'value',
                position: 'left',
            },
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        series: [
            {
                label: {
                    show: true,
                    position: 'top'
                },
                name: TITLE[name],
                data: dataList,
                type: 'line'
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