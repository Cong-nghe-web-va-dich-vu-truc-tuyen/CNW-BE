import { IProductDb } from './../interface/product.interface';
import { Model } from 'mongoose';
import { IProduct } from './../../models/product';
export interface IProductDocument extends IProduct, Document {
    _id: any;
}
export declare const productTable = "Product";
declare const ProductModel: Model<IProductDocument, {}, {}, {}>;
export { ProductModel };
export declare class ProductDb implements IProductDb {
    getAllProducts(): Promise<IProduct[]>;
    findProductById(agrs: {
        _id: string;
    }): Promise<IProduct>;
    createProduct(agrs: IProduct): Promise<IProduct>;
    updateProduct(agrs: {
        _id: string;
        data: any;
    }): Promise<IProduct>;
    deleteProduct(agrs: {
        _id: string;
    }): Promise<IProduct>;
}
