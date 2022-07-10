import { IProduct } from "../models/product";
import { BasicService } from "./basicService";
export declare class ProductService extends BasicService {
    createProduct(args: IProduct): Promise<IProduct>;
    deleteProduct(args: {
        _id: string;
    }): Promise<IProduct>;
    updateProduct(args: {
        _id: string;
        data: any;
    }): Promise<IProduct>;
    findProductById(args: {
        _id: string;
    }): Promise<IProduct>;
    findAllProducts(): Promise<IProduct[]>;
}
