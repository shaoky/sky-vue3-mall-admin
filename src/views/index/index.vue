<template>
    <div class="pending">
        <div class="item">
            <div class="name">待发货订单</div>
            <div class="num">{{pending.deliveryOrder}}</div>
        </div>
        <div class="item">
            <div class="name">待处理退货订单</div>
            <div class="num">{{pending.refundyOrder}}</div>
        </div>
        <div class="item">
            <div class="name">库存紧急</div>
            <div class="num">{{pending.stock}}</div>
        </div>
        <div class="item">
            <div class="name">待处理投诉</div>
            <div class="num">8</div>
        </div>
    </div>
    <div class="tabs">
        <el-card class="goods-sales">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="订单数" name="orderNum"></el-tab-pane>
                <el-tab-pane label="订单金额" name="orderMoney"></el-tab-pane>
                <el-tab-pane label="新增用户" name="userNum"></el-tab-pane>
            </el-tabs>
            <echarts-line :data="list" :name="activeName" v-if="list.length" ref="echartsLineRef"></echarts-line>
        </el-card>
    </div>

    <div class="goods mt20">
        <el-card class="goods-sales">
            <template #header>
            <div class="card-header">
                <span>访问量</span>
            </div>
            </template>
            <echarts-bar :data="access" v-if="list.length" ref="echartsBarRef"></echarts-bar>
        </el-card>
        <el-card class="goods-type">
            <template #header>
            <div class="card-header">
                <span>产品销售类别占比</span>
            </div>
            </template>
            <echarts-pie :data="goodsType" v-if="list.length" ref="echartsPieRef"></echarts-pie>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import EchartsLine from './components/echarts-line.vue'
import EchartsPie from './components/echarts-pie.vue'
import EchartsBar from './components/echarts-bar.vue'
import { getIndex } from '@/api/getData'
import dayjs from 'dayjs'
import { Models } from '@/rapper'
 
type List = Models['GET/admin/index']['Res']['data']['list']

let echartsLineRef = ref()
let echartsBarRef = ref()
let echartsPieRef = ref()
let activeName = ref('orderNum')
let pending = ref({
    deliveryOrder: 0,
    refundyOrder: 0,
    stock: 0
})
let list = ref<List>([])
let goodsType = ref()
let access = ref()

const initData = async() => {
    const data = await getIndex({
        startTime: dayjs().subtract(30, 'day').unix(),
        endTime: dayjs().unix()
    })
    pending.value = data.pending
    list.value = data.list
    goodsType.value = data.goodsType
    access.value = data.access

    window.addEventListener('resize', onResize )
}

const onResize = () => {
    echartsLineRef.value.resize()
    echartsBarRef.value.resize()
    echartsPieRef.value.resize()
}

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize )
})

initData()
</script>
<style lang="less" scoped>
.pending {
    display: flex;
    margin-top: 40px;
    padding-bottom: 50px;
    background: #fff;
    .item {
        flex: 1;
        height: 151px;
        border-radius: 6px;
        .name{padding: 8px 0 0 14px; color: #fff; font-size: 18px;}
        .num{margin-top: 23px; text-align: center; font-size: 28px; color: #fff;}
        &:nth-child(1){background: #8892f1; margin-right: 107px;}
        &:nth-child(2){background: #bc8cf0; margin-right: 107px;}
        &:nth-child(3){background: #ffa799; margin-right: 107px;}
        &:nth-child(4){background: #8ac3fa;}
    }
}
.tabs {
    background: #fff;
}
.el-tabs {
    position: relative;
    background: #fff;
}
.card-header {
    font-size: 16px;
}
.goods {
    display: flex;
    .goods-sales {
        flex: 1;
        margin-right: 20px;
    }
    .goods-type {
        margin-left: 20px;
        flex: 1;
    }
}
</style>
