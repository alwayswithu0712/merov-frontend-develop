/**
 * Model CartLine
 *
 */
export type CartLine = {
    productId: string;
    quantity: number;
};

export type Cart = {
    cartLines: CartLine[];
};

// API Interfaces
export interface IUpdateCart {
    productId: string;
    quantity: number;
}
