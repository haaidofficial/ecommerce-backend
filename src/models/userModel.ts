import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}


const userSchema = new Schema<IUser>({
    name: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8, select: false }
});

const UserModel = model<IUser>('User', userSchema);
export default UserModel;