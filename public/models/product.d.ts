export interface IProduct {
    _id?: string | undefined;
    name: string;
    price: number;
    color?: string;
    size?: IProductSize[];
    linkImg: string[];
}
export interface IProductSize {
    size: number;
    amount: number;
}
export declare class ProductInfor {
    _id?: string | undefined;
    name: string;
    price: number;
    color?: string;
    size?: IProductSize[];
    linkImg: string[];
    constructor(args?: any);
}
