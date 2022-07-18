import mongoose from "mongoose";
import { IOrder, OrderStatus } from "../../models/order";
import { IOrderDb } from "../interface/order.interface";
export interface IOrderDocument extends IOrder, Document {
    _id: any;
}
export declare const orderModel: mongoose.Model<IOrderDocument, {}, {}, {}>;
export declare class OrderDb implements IOrderDb {
    getAllOrders(): Promise<IOrder[]>;
    getOrderById(args: {
        id: string;
    }): Promise<IOrder>;
    getOrderByIdUser(args: {
        id: string;
    }): Promise<IOrder[]>;
    getOrderByStatus(args: {
        status: OrderStatus;
    }): Promise<IOrder[]>;
    updateOrder(args: {
        id: string;
        data: any;
    }): Promise<IOrder>;
    createOrder(args: {
        data: IOrder;
    }): Promise<IOrder>;
}
