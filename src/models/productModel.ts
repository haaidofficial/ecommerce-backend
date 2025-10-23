import { Schema, model } from 'mongoose';
import { IProduct, IProductVariant } from '../types/product.types';

const variantSchema = new Schema<IProductVariant>({
    name: { type: String, required: true },
    option: { type: String, required: true },
    price: { type: Number },
    stock: { type: Number },
    sku: { type: Number },
    images: [{ type: String }],
    isActive: { type: Boolean }
});

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    dscntPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    variants: { type: [variantSchema], default: [] },
    images: { type: [String], default: [] },
    ratingsAvg: { type: Number, default: 0, min: 0, max: 5 },
    ratingsQty: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const ProductModel = model<IProduct>('Procuts', productSchema);
export default ProductModel;