import { Blockchain } from './blockchain';

export type ICreateWallet = {
    address: string;
    chain: Blockchain;
    name: string;
};

export type Wallet = {
    id: string;
    name: string;
    address: string;
    chain: Blockchain;
};
