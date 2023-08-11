import { Blockchain } from './blockchain';
import { Category, Subcategory } from './category';
import { Currency } from './currency';
import { Account } from './account';

/**
 * Model Product
 *
 */
export type Product = {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    price: number;
    currency: Currency;
    chain: Blockchain;
    images: string[];
    shippingCost: number;
    stock: number;
    sellerId: string;
    sellerAddress: string;
    categoryId: string;
    category: Category;
    subcategoryId: string;
    subcategory: Subcategory;
    condition: string;
    seller: Account;
    minTestingTime: number;
    maxTestingTime: number;
    activeOrdersCount: number;
    itemsSoldCount: number;
    isRemovable: boolean;
    approved: boolean;
    published: boolean;
    model?: string;
    brand?: string;
    height: number;
    width: number;
    length: number;
    dimensionsUnit: string;
    weight: number;
    weightUnit: string;
    deliveryAddressId: string;
};

// API interfaces

export interface ICreateProduct {
    title: string;
    description: string;
    price: number;
    currency: Currency | string;
    chain: Blockchain | string;
    stock: number;
    categoryId: string;
    subcategoryId: string;
    sellerAddress: string;
    images: any[];
    condition: string;
    published: boolean;
    maxTestingTime?: number;
    minTestingTime?: number;
    brand?: string;
    model?: string;
    height: number;
    width: number;
    length: number;
    dimensionsUnit: string;
    weight: number;
    weightUnit: string;
    deliveryAddressId: string;
}

export interface IUpdateProduct {
    title?: string;
    description?: string;
    price?: number;
    currency?: Currency | string;
    chain?: Blockchain | string;
    stock?: number;
    categoryId?: string;
    subcategoryId?: string;
    sellerAddress?: string;
    images?: any[];
    condition?: string;
    published?: boolean;
    maxTestingTime?: number;
    minTestingTime?: number;
    brand?: string;
    model?: string;
    height: number;
    width: number;
    length: number;
    dimensionsUnit: string;
    weight: number;
    weightUnit: string;
    deliveryAddressId: string;
}
