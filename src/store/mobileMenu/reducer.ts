import { MobileMenuAction, MobileMenuState, MOBILE_MENU_CLOSE, MOBILE_MENU_OPEN } from './types';

const initialState: MobileMenuState = {
    open: false,
};

export default function mobileMenuReducer(state = initialState, action: MobileMenuAction = { type: '' }) {
    switch (action.type) {
        case MOBILE_MENU_OPEN:
            return {
                ...state,
                open: true,
            };
        case MOBILE_MENU_CLOSE:
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
}
