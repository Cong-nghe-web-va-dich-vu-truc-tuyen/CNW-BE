import { IProductDb } from './../interface/product.interface';
import { model, Model, Schema } from 'mongoose';
import { IProduct, ProductInfor } from './../../models/product';
export interface IProductDocument extends IProduct, Document {
    _id: any;
}
interface IProductSchema extends Model<IProductDocument> {

}
export const productTable = "Product";

const ProductSchema = new Schema<IProductDocument, IProductSchema>({
    name: {
        type: "string",
        required: true,
        trim: true,
    },
    color: {
        type: "string",
        trim: true,
    },
    size: {
        type: "number",
        required: true,
    },
    price: {
        type: "number",
        required: true,
    },
    amount: {
        type: "number",
        required: true,
        default: 0
    },
    linkImg: {
        type: ["string"],
        required: true,
        trim: true,
    }
});

const ProductModel = model(productTable, ProductSchema);
export { ProductModel }

export class ProductDb implements IProductDb{
    async getAllProducts(): Promise<IProduct[]> {
        return ProductModel.find();
    }
    async findProductById(agrs: { _id: string; }): Promise<IProduct> {
        const product = await ProductModel.findById(agrs._id);
        return new ProductInfor(product);
    }
    async createProduct(agrs: IProduct): Promise<IProduct> {
        const product = new ProductModel(agrs);
        await product.save();
        return new ProductInfor(product);
    }
    async updateProduct(agrs: { _id: string; data: any; }): Promise<IProduct> {
        const product = await ProductModel.findByIdAndUpdate(agrs._id, agrs.data);
        return new ProductInfor(product);
    }
    async deleteProduct(agrs: { _id: string; }): Promise<IProduct> {
        return new ProductInfor(ProductModel.findOneAndDelete({ _id: agrs._id}));
    }

}
