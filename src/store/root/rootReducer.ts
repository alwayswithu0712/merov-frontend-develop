import { combineReducers } from 'redux';
import version from '../version';
import mobileMenu from '../mobileMenu/reducer';
import shareOffer from '../ShareOffer/reducer';
import notifications from '../notifications/reducer';

const rootReducer = combineReducers({
    version: (state: number = version) => state,
    mobileMenu,
    shareOffer,
    notifications,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
