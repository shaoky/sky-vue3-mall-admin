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
export const getParent = (list, value: string, filed: string) => {
    for(let item of list) {
        if (item[filed] === value) {
            // delete item.children
            return [item]
        }
        let arr = getParent(item.children, value, filed)
        if (arr) {
            // delete item.children
            return [...arr, item]
        }
    }
}