<template>
    <div class="admin-add">
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

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getWebsite, updateWebsite } from '@/api/getData'

let website = ref({
    baiduMapX: '',
    baiduMapY: ''
})

onMounted(async() => {
    await getData()
    let map = new BMapGL.Map("container");
    // 创建地图实例 
    let point = new BMapGL.Point(website.value.baiduMapX, website.value.baiduMapY)
    map.centerAndZoom(point, 14)
    map.addControl(new BMapGL.NavigationControl())
    map.enableDragging() //启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom() //启用地图滚轮放大缩小
    map.disableDoubleClickZoom();
    map.enableKeyboard();//启用键盘上下左右键移动地图
    let marker = new BMapGL.Marker(point);
    map.addOverlay(marker)
    map.addEventListener("click", function(e){
        website.value.baiduMapX = e.latlng.lng
        website.value.baiduMapY = e.latlng.lat
        map.removeOverlay(marker)
        marker = new BMapGL.Marker(new BMapGL.Point(e.latlng.lng,e.latlng.lat))
        map.addOverlay(marker)
    })
})

const getData = async () => {
    const { baiduMapX, baiduMapY } = await getWebsite()
    website.value.baiduMapX = baiduMapX
    website.value.baiduMapY = baiduMapY
}

const onSave = async () => {
    await updateWebsite(website.value)
}
</script>

<style scoped lang="less">
</style>
