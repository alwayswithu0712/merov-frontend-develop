import { Visibility } from '../../typings/visibility';
import { SAVE_OFFER_DATA, ShareOfferAction, ShareOfferState } from './types';

const initialState: ShareOfferState = {
    currency: '',
    price: 0,
    shippingCost: 0,
    quantity: 0,
    visibility: Visibility.Public,
    sharedWith: '',
};

export default function shareOfferReducer(state = initialState, action: ShareOfferAction = { type: '' }) {
    switch (action.type) {
        case SAVE_OFFER_DATA:
            return {
                ...action.payload,
            };

        default:
            return state;
    }
}
