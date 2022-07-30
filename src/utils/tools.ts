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