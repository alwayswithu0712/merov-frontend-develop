import moment from 'moment';
import { Currency } from './currency';
import { Order } from './order';
import { Product } from './product';
import { Account } from './account';

export type Offer = {
    chain: string;
    createdAt: string;
    currency: Currency;
    expirationDate: string;
    id: string;
    orders: Order[];
    price: number;
    product: Product;
    productId: string;
    quantity: number;
    seller: Account;
    sellerId: string;
    sharedWith: string;
    shippingCost: number;
    status: string;
    visibility: string;
    url: string;
};

export interface ICreateOffer {
    productId: string;
    visibility: string;
    price: number;
    currency: string;
    quantity: number;
    expirationDate?: moment.Moment;
    sellerAddress: string;
    maxTestingTime: number;
    shippingCost: number;
    sharedWith?: string;
    chain: string;
}
