export interface SearchModel {
    label: string // 名称
    field: string // 字段
    value: string | number // 初始值
    type: 'text' | 'select' // 类型
    items?: any // 数据列表，用于select
    api?: (params?: any) => Promise<any> // 简化获取数据操作
    props?: Props // 修改接口返回的字段
}

interface Props {
    label: string
    value: string
}