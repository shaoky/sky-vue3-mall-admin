<template>
    <div>
        <vue-ueditor-wrap v-model="content" :config="editorConfig" editor-id="editor-demo-01" class="ue"></vue-ueditor-wrap>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { baseURL } from '../config/env'

export default defineComponent({
    props: {
        config: {
            type: Object
        }
    },
    setup(props) {
        const content = ref(props.config.initialContent)
        const state = reactive({
            editorConfig: {
                initialFrameWidth: 900,
                initialFrameHeight: 240,
                // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
                UEDITOR_HOME_URL: "/ue/",
                // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                // serverUrl: "//ueditor.szcloudplus.com/cos",
                serverUrl: `${baseURL}/common/ueditor/upload`
            }
        })

        return {
            ...toRefs(state),
            content
        }
    }
})
</script>

<style lang="less" scoped>
.ue {
    line-height: 20px;
}
</style>
