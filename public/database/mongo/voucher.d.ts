import { Model } from 'mongoose';
import { IVoucher } from "../../models/voucher";
import { IVoucherDb } from '../interface/voucher.interface';
export interface IVoucherDocument extends IVoucher, Document {
    _id: any;
}
export declare const voucherTable = "Voucher";
export declare const voucherModel: Model<IVoucherDocument, {}, {}, {}>;
export declare class VoucherDb implements IVoucherDb {
    getAllVouchers(): Promise<IVoucher[]>;
    getVoucherById(args: {
        id: string;
    }): Promise<IVoucher>;
    updateVoucherById(args: {
        id: string;
        data: any;
    }): Promise<IVoucher>;
    deleteVoucherById(args: {
        id: string;
    }): Promise<IVoucher>;
    createVoucher(args: {
        data: IVoucher;
    }): Promise<IVoucher>;
}
