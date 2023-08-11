import { Blockchain } from './blockchain';
import { Currency } from './currency';

/**
 * Model Transaction
 *
 */
export type Transaction = {
    createdAt: Date;
    hash: string;
    from: string;
    to: string;
    value: number;
    timestamp: number;
    block: number;
    chain: Blockchain;
    currency: Currency;
};
