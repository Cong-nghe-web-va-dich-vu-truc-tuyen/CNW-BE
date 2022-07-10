import { IOrder, OrderStatus } from '../models/order';
import { BasicService } from './basicService';
export declare class OrderService extends BasicService {
    getAllOrders(): Promise<IOrder[]>;
    getOrderById(args: {
        id: string;
    }): Promise<IOrder>;
    getOrderByStatus(args: {
        status: OrderStatus;
    }): Promise<IOrder[]>;
    updateOrder(args: {
        id: string;
        data: any;
    }): Promise<IOrder>;
    createOrder(args: {
        data: any;
    }): Promise<IOrder>;
}
