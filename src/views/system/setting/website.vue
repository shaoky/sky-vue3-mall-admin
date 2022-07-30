<template>
    <div class="admin-add">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
        </el-breadcrumb>

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
                <el-button type="primary" @click="onSave">保存</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getWebsite, updateWebsite } from '@/api/getData'
import { ElNotification } from 'element-plus'
import type { Models } from '@/rapper'

let website = ref<Models['POST/admin/system/web/config/update']['Req']>({
    webTitle: '',
    webDescription: '',
    webKeyworkds: '',
    linkman: '',
    tel: '',
    email: '',
    icp: '',
    fax: '',
    address: '',
    company: ''
})

const initData = () => {
    getData()
}

const getData = async() => {
    website.value = await getWebsite()
}

const onSave = async() => {
    const data = await updateWebsite(website.value)
    ElNotification({
        title: '保存成功',
        message: data,
        type: 'success'
    })
}

initData()
</script>

<style scoped lang="less">
</style>
