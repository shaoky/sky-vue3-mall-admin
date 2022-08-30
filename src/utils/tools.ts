export const deleteChildren = (data) => {
    for (let item of data) {
        if (item.children) {
            if (item.children.length === 0) {
                delete item.children
            } else {
                deleteChildren(item.children)
            }
        }
    }
}

/**
 * 递归查询该节点的所有父级阶段
 * @param list 
 * @param value 要查询的值 
 * @param filed 要查询的字段
 * @returns 
 */
export const getParent = (list, value: string, filed: string, level = 1) => {
    for(let item of list) {
        if (item[filed] === value && level > 1) {
            // delete item.children
            return [item]
        }
        let arr = getParent(item.children, value, filed, level+1)
        if (arr) {
            // delete item.children
            return [...arr, item]
        }
    }
}

/**
 * 树结构扁平化
 * @param list 列表
 * @param filed 子节点字段
 */
export const treeToArray = (list: object[], filed: string = 'children') => {
    let result: any = []
    for (const item of list) {
        if (item[filed] && item[filed].length) {
            result = [...result, ...treeToArray(item[filed])]
        } 
        result.push(item)
    }
    return result
}
