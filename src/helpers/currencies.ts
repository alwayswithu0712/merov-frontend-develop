import { Blockchain } from '../typings/blockchain';
import CurrenciesData from '../data/currencies';
import { ICurrency } from '../typings/currencies';
import merovService from '../services/merov';

export const getEnabledCurrencies = (): ICurrency[] => {
    const currencies = CurrenciesData;
    return Object.keys(currencies)
        .filter((currency) => currencies[currency].enabled)
        .map((currency) => currencies[currency]);
};

export const getBlockchainCurrencies = (blockchain: Blockchain): ICurrency[] => {
    const currencies: ICurrency[] = getEnabledCurrencies();
    return currencies?.filter((currency) => currency.chains.includes(blockchain));
};

export const isUSDCurrency = (currency: string): boolean => {
    const currenciesEnabled = CurrenciesData;

    return currenciesEnabled[currency as keyof typeof CurrenciesData].isUsd;
};

export const getPrice = async (currency: string) => {
    if (isUSDCurrency(currency)) return 1;

    const rate = await merovService.api.getPrice(currency);
    return rate;
};
