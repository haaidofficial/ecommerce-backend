import { Types } from "mongoose";

export interface IProductCategory {
    name: string;
    slug: string;
    parent?: Types.ObjectId
}

export interface IProductVariant {
    name: string;
    option: string;
    price?: number;
    stock?: number;
    sku?: number;
    images?: string[];
    isActive?: boolean;
}

export interface IProduct {
    name: string;
    desc: string;
    price: number;
    dscntPrice?: number;
    stock: number;
    categories: Types.ObjectId[];
    variants?: IProductVariant[];
    images: string[];
    ratingsAvg?: number;
    ratingsQty?: number;
    isActive: boolean;
    createdBy: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}