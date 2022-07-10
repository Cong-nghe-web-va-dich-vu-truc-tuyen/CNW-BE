import { IProduct } from "./product";
export interface IOrder {
    _id?: string | undefined;
    products: IProduct[];
    totalPrice: number;
    userId: string | undefined;
    address: string;
    phoneNumber: string;
    status: OrderStatus;
    createdAt?: string;
    updatedAt?: string;
}
export declare enum OrderStatus {
    pending = 0,
    cancelled = 1,
    success = 2,
    delivering = 3
}
export declare class OrderInfo {
    _id?: string | undefined;
    products: IProduct[];
    totalPrice: number;
    userId: string | undefined;
    address: string;
    phoneNumber: string;
    status: OrderStatus;
    createdAt?: string;
    updatedAt?: string;
    constructor(arg?: any);
}
