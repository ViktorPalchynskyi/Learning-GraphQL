import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';

export interface IProduct extends Document {
    title: string;
    creator: IUser;
}

const ProductSchema: Schema = new Schema({
    title: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
