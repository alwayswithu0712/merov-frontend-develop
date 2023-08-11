import { Blockchain } from './blockchain';
import { Currency } from './currency';
import { Product } from './product';
import { Account } from './account';

export enum OrderStatus {
    Created = 'Created',
    Accepted = 'Accepted',
    Paid = 'Paid',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Disputed = 'Disputed',
    Refunded = 'Refunded',
    Closed = 'Closed',
    Completed = 'Completed',
    EscrowPaymentFailed = 'EscrowPaymentFailed'
}

/**
 * Model Order
 *
 */

export interface Review {
    rating: number;
    review: string;
    reviewerId?: string;
    revieweeId?: string;
}

export type Order = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    escrowAddress: string;
    escrowId: number;
    productId: string;

    shippingToCity: string;
    shippingToCountry: string;
    shippingToPostcode: string;
    shippingToState: string;
    shippingToStreet: string;
    shippingToAddressName: string;

    buyerPhone: string;
    sellerPhone: string;

    price: number;
    priceUSD?: number;
    quantity: number;
    total: number;
    totalUSD?: number;
    chain: Blockchain;
    currency: Currency;
    trackingNumber?: string;
    shippingCost: number;
    shippingCostUSD?: number;
    maxTimeToPayInDays: number;
    maxShippingDurationInDays: number;
    maxTimeToDisputeInDays: number;
    acceptedAt?: Date;
    paidAt?: Date;
    shippedAt?: Date;
    refundedAt?: Date;
    disputeReason?: string;
    sellerNotes?: string;
    disputedAt?: Date;
    closedAt?: Date;
    deliveredAt?: Date;
    payinTxHash?: string;
    payoutTxHash?: string;
    buyerId: string;
    sellerId: string;
    sellerAddress: string;
    status: OrderStatus;

    chatId: string;

    seller: Account;
    buyer: Account;
    product: Product;

    isDisputable: boolean;
    isCloseable: boolean;
    isActive: boolean;
    reviews: Review[];
};

export interface ICreateOrder {
    quantity: number;
    productId: string;
    deliveryAddressId: string;
}

export interface ICreateOrderOffer {
    quantity: number;
    productId: string;
    deliveryAddressId: string;
    offerId: string;
}

export interface IUpdateOrder {
    status: OrderStatus;
    trackingNumber?: string;
    maxTimeToPayInDays?: number;
    maxShippingDurationInDays?: number;
    maxTimeToDisputeInDays?: number;
    shippingCost?: number;
    disputeReason?: string;
    sellerNotes?: string;
}
