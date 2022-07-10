import { ICommentDb } from '../database/interface/comment.interface';
import { IOrderDb } from '../database/interface/order.interface';
import { IProductDb } from '../database/interface/product.interface';
import { IVoucherDb } from '../database/interface/voucher.interface';
import { IUserDb } from './../database/interface/user.interface';
export declare class BasicService {
    protected readonly userDB: IUserDb;
    protected readonly productDB: IProductDb;
    protected readonly orderDB: IOrderDb;
    protected readonly voucherDB: IVoucherDb;
    protected readonly commentDB: ICommentDb;
}
