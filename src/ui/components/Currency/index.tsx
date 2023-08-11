import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import CurrenciesData from '../../../data/currencies';
import { getPrice } from '../../../helpers/currencies';
import { Currency as CURRENCY } from '../../../typings/currency';
import MaterialTooltip from '../MaterialTooltip/index';

export interface Props {
    currency: CURRENCY;
    price?: number;
    externalPrice?: number;
    showImage?: boolean;
    showConversion?: boolean;
    showPrice?: boolean;
}

export default function Currency({ price, externalPrice, currency, showImage, showConversion, showPrice }: Props) {
    const { data: exchangeRate } = useSWR(currency, (currency: CURRENCY) => getPrice(currency));
    const priceUsd = price && !externalPrice && +price > 0 && exchangeRate && exchangeRate !== 1 ? +price * exchangeRate : externalPrice;

    return (
        <>
            <div className="flex items-center m-0">
                {showImage && (
                    <MaterialTooltip tooltipText={currency}>
                        <ImgCurrencyContainer currency={currency}>{CurrenciesData[currency].getImg()}</ImgCurrencyContainer>
                    </MaterialTooltip>
                )}
                <div className="flex items-baseline ">
                    {showPrice && price && <div className="font-semibold text-base leading-8 ml-2 mr-2 my-0">{price}</div>}
                    {showConversion && priceUsd && priceUsd > 0 && (
                        <p className="font-normal text-sm whitespace-nowrap tracking-[0.2px] text-gray-100 m-0">
                            ≈ ${priceUsd.toLocaleString('en-US')}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

const ImgCurrencyContainer = styled.div(
    (props: Pick<Props, 'currency'>) => `
    ${
        props.currency !== CURRENCY.ETH
            ? `
            margin-right: 0.2rem;
            `
            : `
            align-items: center;
            grid-gap: 5px;
            display: flex;
            `
    };
    `,
);
