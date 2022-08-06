class Filter {
    /**
     * @description 阿萨德阿萨德撒旦
     * @param value 
     * @returns 
     */
    isOpen (value: boolean) {
        let text = ''
        if (value) {
            text = '开启'
        } else {
            text = '未开启'
        }
        return text
    }

    booleanToNumber (value: boolean) {
        if (value) {
            return 1
        } else {
            return 0
        }
    }
}

export interface filtersModel  {
    /**
     * @description 显示开启或者未开启
     */
    isOpen(value: boolean): string;
    booleanToNumber(value: boolean): number;
}

export default new Filter()