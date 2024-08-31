import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './productModel';

export interface IUser extends Document {
    name: string;
    password: string;
    friends: IUser[];
    products: IProduct[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
