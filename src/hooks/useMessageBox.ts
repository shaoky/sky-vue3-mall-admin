import { ElMessageBox } from 'element-plus'

export default async function useMessageBox(message: string = '确认删除吗?', tip: string = '提示') {
    const data = await ElMessageBox.confirm(message, tip, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
    if (data === 'confirm') {
        return true
    }
}