// third-party
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// application
import { RootState } from './root/rootReducer';

export type AppDispatch<A extends Action = Action> = ThunkDispatch<RootState, unknown, A>;

export type AppAction<A extends Action, T = any> = ThunkAction<T, RootState, unknown, A>;

export type AppReducer<T extends object, A extends Action = Action> = (state: T, action: A) => T;

export type Fn<R = any> = (...args: any[]) => R;

export type ThunkActionFn = Fn<ThunkAction<any, any, any, any>>;

export type ThunkReturnType<T extends (...args: any[]) => ThunkAction<any, any, any, any>> = T extends (
    ...args: any[]
) => ThunkAction<infer R, any, any, any>
    ? R
    : any;

export type AppReducerStateType<T extends AppReducer<any, any>> = T extends AppReducer<infer R, any> ? R : any;
