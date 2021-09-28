class Filter {
    isOpen (value: boolean) {
        let text = ''
        if (value) {
            text = '开启'
        } else {
            text = '未开启'
        }
        return text
    }
}

export default new Filter()