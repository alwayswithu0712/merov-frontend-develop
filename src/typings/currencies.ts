import { Blockchain } from './blockchain';
import { Currency } from './currency';

export interface ICurrency {
    name: Currency;
    enabled: boolean;
    isUsd: boolean;
    chains: Blockchain[];
    getImg: Function;
}
