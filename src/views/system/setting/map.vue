<template>
    <div class="admin-add">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div id="container" style="width: 60%; height: 400px;"></div> 
        <el-form label-width="160px" style="margin-top: 50px;">
            <el-form-item label="百度X坐标：">
                <el-input style="width:300px;"  v-model="website.baiduMapX"></el-input>
            </el-form-item>
            <el-form-item label="百度Y坐标：">
                <el-input style="width:300px;"  v-model="website.baiduMapY"></el-input>
            </el-form-item>
        </el-form>
        <div style="text-align: center;">
            <el-button type="primary" @click="onSave">保存</el-button>
        </div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getWebsite, updateWebsite } from '../../../api/getData'
import { ElNotification } from 'element-plus'

export default defineComponent({
    setup() {
        const state = reactive({
            center: {lng: 120.68032, lat: 28.005232},
            zoom: 13,
            id: '',
            website: {
                baiduMapX: '',
                baiduMapY: ''
            },
            x: null,
            y: null
        })

        onMounted(async() => {
            await getData()
            var map = new BMapGL.Map("container");
            // 创建地图实例 
            var point = new BMapGL.Point(state.website.baiduMapX, state.website.baiduMapY);
            map.centerAndZoom(point, 14);  
            map.addControl(new BMapGL.NavigationControl());
            map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
            map.enableScrollWheelZoom();//启用地图滚轮放大缩小
            map.disableDoubleClickZoom(); 
            map.enableKeyboard();//启用键盘上下左右键移动地图
            var marker = new BMapGL.Marker(point); 
            map.addOverlay(marker);
            map.addEventListener("click", function(e){
                state.website.baiduMapX = e.latlng.lng
                state.website.baiduMapY = e.latlng.lat
                map.removeOverlay(marker);
                marker = new BMapGL.Marker(new BMapGL.Point(e.latlng.lng,e.latlng.lat));
                map.addOverlay(marker);
            });
        })

        const getData = async () => {
            const { baiduMapX, baiduMapY } = await getWebsite()
            state.website.baiduMapX = baiduMapX
            state.website.baiduMapY = baiduMapY
        }

        const onSave = async () => {
            const data = await updateWebsite(state.website)
            ElNotification({
                title: '保存成功',
                message: data,
                type: 'success'
            })
        }

        return {
            ...toRefs(state),
            onSave
        }
    },
})
</script>

<style scoped lang="less">
</style>
