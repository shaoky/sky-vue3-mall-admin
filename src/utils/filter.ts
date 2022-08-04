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

    booleanToNumber (value: boolean) {
        if (value) {
            return 1
        } else {
            return 0
        }
    }
}

export interface filtersModel  {
    isOpen (value: boolean): string;
    booleanToNumber(value: boolean): number;
}

export default new Filter()