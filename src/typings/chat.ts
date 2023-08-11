import { Offer } from './offer';
import { Order } from './order';
import { Product } from './product';
import { Account } from './account';

export type Chat = {
    id: string;
    createdAt: Date;
    url: string;
    buyerId: string;
    buyer: Account;
    sellerId: string;
    seller: Account;
    productId: string;
    product: Product;
    orderId?: number;
    order?: Order;
    offerId?: number;
    offer?: Offer;
    lastMessage?: {
        message: string;
        createdAt: Date;
    };
    unreadMessageCount?: number;
};
