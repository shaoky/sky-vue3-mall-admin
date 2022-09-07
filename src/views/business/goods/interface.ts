export interface GoodsSku {
    id?: number;
    stock: number;
    price: string;
    imageUrl: string;
    spec: string[] | string;
    // specTable: Array<{
    //     rowspan: number;
    //     value: string;
    // }>
    specTable?: SpecTable[]
}

export interface SpecTable {
    rowspan: number;
    value: string;
}

export interface GoodsSpec {
    name: string;
    content: string[];
    value: string[];
    images: string[];
}