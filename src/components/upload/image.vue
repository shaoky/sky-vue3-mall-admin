<template>
    <el-upload
        class="avatar-uploader"
        :action="imgBaseUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
</template>
<script lang="ts" setup>
import { imgBaseUrl } from '@/config/env'

const emit = defineEmits(['success'])
defineProps(['imageUrl'])

const handleAvatarSuccess = (res) => {
    emit('success', res.data.url)
}

</script>