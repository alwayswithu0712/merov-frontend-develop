export const SAVE_OFFER_DATA = 'SAVE_OFFER_DATA';
export interface ShareOfferState {
    price?: number;
    currency?: string;
    quantity?: number;
    ExpirationDate?: string;
    shippingCost?: number;
    visibility?: string;
    sharedWith?: string;
}

export interface SAVE_OFFER_DATA_ACTION {
    type: typeof SAVE_OFFER_DATA;
    payload: ShareOfferState;
}

export type ShareOfferAction = SAVE_OFFER_DATA_ACTION | { type: '' };
