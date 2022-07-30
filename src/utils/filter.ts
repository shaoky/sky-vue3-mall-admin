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

export interface filtersModel  {
    isOpen (value: boolean): string;
}

export default new Filter()