<template>
    <div class="pagination-components">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 100]"
            :page-size="1"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    props: {
        // 总条数
        total: {
            type: Number,
            required: true
        }
    },
    emits: ['handleSizeChange', 'handleCurrentChange' ],
    setup(props, {emit}) {
        const state = reactive({
            currentPage: 1
        })

        const handleSizeChange = (val) => {
            emit('handleSizeChange', val)
            const box = document.getElementById('mainBody')
            box.scrollTop = 0
        }

        const handleCurrentChange = (val) => {
            emit('handleCurrentChange', val)
            const box = document.getElementById('mainBody')
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
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
}
</style>
