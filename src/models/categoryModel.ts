import { Schema, model } from 'mongoose';
import { IProductCategory } from '../types/product.types';

const categorySchema = new Schema<IProductCategory>({
    name: { type: String, required: true },
    slug: { type: String, require: true },
    parent: { type: Schema.Types.ObjectId, default: null }
}, { timestamps: true });

const CategoryModel = model<IProductCategory>('Category', categorySchema);

export default CategoryModel;