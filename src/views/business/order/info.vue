<template>
    <div class="v-title mt20">订单信息</div>
    <el-table class="mt20" :data="options" border>
        <el-table-column label="基础信息">
            <template #default="scope">
                <el-form  label-position="left"  style="color:#999;">
                    <el-form-item label="订单号：" >{{order.no}}</el-form-item>
                    <el-form-item label="下单时间：" >{{order.createTime}}</el-form-item>
                    <el-form-item label="付款时间：" >{{order.paymentTime}}</el-form-item>
                    <el-form-item label="发货时间：" >{{order.deliveryTime}}</el-form-item>
                    <el-form-item label="完成时间：" >{{order.confirmTime}}</el-form-item>
                    <el-form-item label="订单状态：" >{{order.statusName}}</el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="收货信息">
            <template #default="scope">
                <el-form label-position="left" class="form-align">
                    <el-form-item label="收货人：">{{order.userName}}</el-form-item>
                    <el-form-item label="手机号：">{{order.userTel}}</el-form-item>
                    <el-form-item label="收货地址：">{{order.province}}{{order.city}}{{order.county}}{{order.address}}</el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="支付信息">
            <template #default="scope">
                <el-form label-position="left" class="form-align">
                    <el-form-item label="商品金额：">￥{{order.totalMoney}}</el-form-item>
                    <el-form-item label="配送费：">￥{{order.freightMoney}}</el-form-item>
                    <el-form-item label="订单总额：">{{order.payMoney}}</el-form-item>
                    <!-- <el-form-item label="支付方式：">{{order.payTypeName}}</el-form-item> -->
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="备注">
            <template #default="scope">
                <el-form label-position="left" inline  class="form-align">
                    {{order.remark}}
                </el-form>
            </template>
        </el-table-column>
    </el-table>
    <div class="v-title mt20">商品信息</div>
    <el-table border :data="order.goodsList" class="mt20">
        <el-table-column label="商品id" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="title"></el-table-column>
        <el-table-column label="商品规格" prop="skuSpec"></el-table-column>
        <el-table-column label="单价" prop="price"></el-table-column>
        <el-table-column label="数量" prop="number"></el-table-column>
        <el-table-column label="合计">
            <template #default="scope">
                {{scope.row.price * scope.row.number}}
            </template>
        </el-table-column>
    </el-table>

    <div class="mt20" style="text-align: center;">
        <el-button type="primary" @click="delieryVisible = true" v-if="order.status == 2">发货</el-button>
    </div>

    <el-dialog
        title="发货"
        v-model="delieryVisible"
        width="400px"
        center>
        <div class="edit">
            <el-form label-width="120px">
                <el-form-item label="快递名称：">
                    <el-input v-model="courier.courierName"></el-input>
                </el-form-item>
                <el-form-item label="快递单号：" >
                    <el-input v-model="courier.courierNo"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer mt20">
            <el-button @click="delieryVisible = false">取 消</el-button>
            <el-button type="primary" @click="setDelivery">确 定</el-button>
        </span>
    </el-dialog>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getOrderInfo, setOrderDelivery } from '../../../api/getData'
import { useRoute } from 'vue-router'
import type { Models } from '@/rapper'

type OrderModel = Models['GET/admin/order/info']['Res']['data']['info']

let id = ref()
let delieryVisible = ref(false)
let options = ref([{no: 1}])
let order = ref<Partial<OrderModel>>({})
let courier = ref({
    courierName: '',
    courierNo: ''
})

onMounted(() => {
    let params = useRoute().params
    id.value = +params.id
    initData()
})

const initData = async() => {
    const data = await getOrderInfo({id: id.value})
    order.value = data.info
}

const setDelivery = async() => {
    await setOrderDelivery({id: id.value, ...courier.value})
    delieryVisible.value = false
    order.value.status = 3
    initData()
}
</script>

<style scoped lang="less">
.el-form-item {
    margin: 0 0 5px 0;
}
.form-align {
    position: absolute;
    top: 12px;
    width: 100%;
}
</style>
