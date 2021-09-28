<template>
    <div class="admin-add">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础设置" name="first">
                <el-form label-width="160px">
                    <el-form-item label="站点名称：">
                        <el-input style="width:300px;"  v-model="website.webTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称：">
                        <el-input style="width:300px;"  v-model="website.company"></el-input>
                    </el-form-item>
                    <el-form-item label="网站关键词：">
                        <el-input style="width:300px;" v-model="website.webKeyworkds"></el-input>
                    </el-form-item>
                    <el-form-item label="网站描述：">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入网站描述"
                            v-model="website.webDescription" style="width: 300px;">
                        </el-input>
                        <!-- <el-input style="width:300px;" v-model="website.webDescription"></el-input> -->
                    </el-form-item>
                    <el-form-item label="联系人：">
                        <el-input style="width:300px;" v-model="website.linkman"></el-input>
                    </el-form-item>
                    <el-form-item label="传真：">
                        <el-input style="width:300px;" v-model="website.fax"></el-input>
                    </el-form-item>
                    <el-form-item label="手机：">
                        <el-input style="width:300px;" v-model="website.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input style="width:300px;" v-model="website.email"></el-input>
                    </el-form-item>
                    <el-form-item label="地址：">
                        <el-input style="width:300px;" v-model="website.address"></el-input>
                    </el-form-item>
                    <el-form-item label="ICP备案号：">
                        <el-input style="width:300px;" v-model="website.icp"></el-input>
                    </el-form-item>
                    <el-form-item label="" style="text-align: center;">
                        <el-button type="primary" @click="save">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="地图设置" name="second">
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
                    <el-button type="primary" @click="save">保存</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>

        
    </div>
</template>

<script>
import { getWebsite, updateWebsite } from '../../../api/getData'
// import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
// import { baiduMap } from '../../../lib/baidu-map'

export default {
    components: {
    },
    data () {
        return {
            center: {lng: 120.68032, lat: 28.005232},
            zoom: 13,
            content: '11111111',
            show: false,
            activeName: 'second',
            id: '',
            website: {},
            x: null,
            y: null
        }
    },
    async mounted () {
        await this.getData()
        var map = new BMapGL.Map("container");
        // 创建地图实例 
        // var point = new BMapGL.Point(116.404, 39.915);
        // // 创建点坐标 
        // map.centerAndZoom(point, 15);

        var point = new BMapGL.Point(this.website.baiduMapX, this.website.baiduMapY);
        map.centerAndZoom(point, 14);  
        map.addControl(new BMapGL.NavigationControl());
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.disableDoubleClickZoom(); 
        map.enableKeyboard();//启用键盘上下左右键移动地图
        var marker = new BMapGL.Marker(point); 
        map.addOverlay(marker);
        let _this = this
        map.addEventListener("click", function(e){
            _this.website.baiduMapX = e.latlng.lng
            _this.website.baiduMapY = e.latlng.lat
            map.removeOverlay(marker);
            marker = new BMapGL.Marker(new BMapGL.Point(e.latlng.lng,e.latlng.lat));
            map.addOverlay(marker);
        }); 
        
        
    },
    methods: {
        handleClick() {

        },
        async getData () {
            this.website = await getWebsite()
        },
        async save () {
            let res = await updateWebsite(this.website)
            if (res.code === 200) {
                this.$notify({
                    title: '保存成功',
                    message: res.data,
                    type: 'success'
                })
                this.getOrderInfo()
            }
        }
    }
}
</script>

<style scoped lang="less">
</style>
