import { getBlockchainCurrencies } from '../helpers/currencies';
import { Blockchain } from '../typings/blockchain';

export const supportedBlockchains = [Blockchain.Ethereum, Blockchain.Polygon];

export const supportedCurrencies = (chain?: string) => {
    switch (chain) {
        case Blockchain.Ethereum:
            return getBlockchainCurrencies(Blockchain.Ethereum);
        case Blockchain.Polygon:
            return getBlockchainCurrencies(Blockchain.Polygon);
        case Blockchain.Bitcoin:
            return getBlockchainCurrencies(Blockchain.Bitcoin);
        case Blockchain.BinanceSmartChain:
            return getBlockchainCurrencies(Blockchain.BinanceSmartChain);
        default:
            return [];
    }
};
