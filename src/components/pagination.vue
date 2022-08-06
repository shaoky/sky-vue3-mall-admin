<template>
    <div class="pagination-components">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:currentPage="currentPage"
            :page-sizes="[10, 50, 100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
    props: {
        // 总条数
        total: {
            type: Number,
            required: true
        },
        size: {
            type: Number,
            default: 10
        }
    },
    emits: ['handleSizeChange', 'handleCurrentChange'],
    setup(props, {emit}) {
        const state = reactive({
            currentPage: 1
        })

        const handleSizeChange = (val) => {
            emit('handleSizeChange', val)
            const box = document.getElementById('mainBody')!
            box.scrollTop = 0
        }

        const handleCurrentChange = (val) => {
            emit('handleCurrentChange', val)
            const box = document.getElementById('mainBody')!
            box.scrollTop = 0
        }

        return {
            ...toRefs(state),
            handleSizeChange,
            handleCurrentChange
        }
    }
})
</script>

<style scoped lang="less">
.el-pagination {
    // margin: 0 auto;
    margin-top: 20px;
    justify-content: center;
}
</style>
