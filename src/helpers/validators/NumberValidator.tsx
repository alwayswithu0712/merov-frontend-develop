import { Currency } from '../../typings/currency';
import { Product } from '../../typings/product';
import { getPrice } from '../currencies';
import { minPrice, testingDays as maxTestingDays } from '../../config/product';

const NumberValidator = () => {
    async function checkPrice(price: number, currency?: Currency) {
        if (!price) {
            return Promise.reject(new Error(`Price is required and must be more than $${minPrice}!`));
        }
        if (currency) {
            if (currency === Currency.USDC || currency === Currency.USDT) {
                if (price < minPrice) {
                    return Promise.reject(new Error(`Price has to be more than $${minPrice} ${currency}!`));
                }
            }
            const currencyPrice = await getPrice(currency);
            if (currencyPrice * price < minPrice) {
                return Promise.reject(new Error(`Conversion of the price has to be more than $${minPrice} USD!`));
            }
        }

        if (!currency) {
            if (price < minPrice) {
                return Promise.reject(new Error(`Price has to be more than $${minPrice}!`));
            }
        }

        return Promise.resolve();
    }

    function checkShippingPrice(price?: number) {
        if (typeof price === 'undefined' || price === null) {
            return Promise.reject(new Error(`Shipping price is required!`));
        }

        if (price >= 0) {
            return Promise.resolve();
        }

        return Promise.reject(new Error(`Shipping price must be greater than 0!`));
    }

    function checkText(text: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        if (text.length) {
            if (handleSetError && fieldName) handleSetError(fieldName, false);
            return Promise.resolve();
        }
        if (handleSetError && fieldName) handleSetError(fieldName, true);
        return Promise.reject(new Error(`Username shouldn't be empty`));
    }

    function checkTestingDays(
        testingDays: number,
        type: string,
        otherValue: number | undefined,
        handleSetError?: (name: string, value: boolean) => void,
    ) {
        const pattern = /^(([1-9]\d*))$/;
        if (testingDays != null && pattern.test(testingDays.toString())) {
            if (type === 'min') {
                if (otherValue && testingDays > otherValue) {
                    if (handleSetError) handleSetError('maxTestingTime', true);
                    return Promise.reject(new Error(`Testing Days min can't be greater than max`));
                }
            }
            if (type === 'max') {
                if (otherValue && testingDays < otherValue) {
                    if (handleSetError) handleSetError('maxTestingTime', true);
                    return Promise.reject(new Error(`Testing Days max can't be lower than min`));
                }
            }
            if (testingDays >= 1 && testingDays <= maxTestingDays) {
                if (handleSetError) handleSetError('maxTestingTime', false);
                return Promise.resolve();
            }
            if (handleSetError) handleSetError('maxTestingTime', true);
            return Promise.reject(new Error(`Testing Days must be between ${1} and ${30} days!`));
        }
        if (handleSetError) handleSetError('maxTestingTime', true);
        return Promise.reject(new Error(`Testing Days must be greater than 0!`));
    }

    function checkStock(stock: number, product?: Product, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        const pattern = /^(([1-9]\d*))$/;
        if (product && stock > product.stock) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`Quantity can't be grater than stock`));
        }
        if (stock != null && pattern.test(stock.toString())) {
            if (handleSetError && fieldName) handleSetError(fieldName, false);
            return Promise.resolve();
        }
        if (product) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`Quantity is required!`));
        }
        if (handleSetError && fieldName) handleSetError(fieldName, true);
        return Promise.reject(new Error(`Stock must be greater than 0!`));
    }

    function checkProductMeasures(measure: any, field, handleSetError?: (name: string, value: boolean) => void) {
        if (typeof measure === 'undefined' || measure === null) {
            if (handleSetError) handleSetError(`${field}`, true);
            return Promise.reject(new Error(`${field} is requiered!`));
        }

        if (measure > 0) {
            if (handleSetError) handleSetError(`${field}`, false);
            return Promise.resolve();
        }

        if (handleSetError) handleSetError(`${field}`, true);
        return Promise.reject(new Error(`${field} must be greater than 0!`));
    }

    return { checkPrice, checkStock, checkText, checkTestingDays, checkShippingPrice, checkProductMeasures };
};

export default NumberValidator;
