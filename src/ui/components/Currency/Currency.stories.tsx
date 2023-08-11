import React from 'react';
import { ComponentStory } from '@storybook/react';
import CurrencyComponent, { Props as CurrencyComponentProps } from './index';
import { Currency } from '../../../typings/currency';

export default {
    title: 'components/Currency',
    component: CurrencyComponent,
    argTypes: {
        currency: {
            description: 'Currency to show in the component',
        },
        price: {
            description: 'Price you want to put',
        },
        externalPrice: {
            description: "This is if you don't want to use the external api to get the price",
        },
        showImage: {
            description: 'To show the image of the currency',
        },
        showConversion: {
            description: 'To show the conversion of the currency',
        },
        showPrice: {
            description: 'To show the price of the currency',
        },
    }
};

const Template: ComponentStory<typeof CurrencyComponent> = (args: CurrencyComponentProps) => (
    <div className="w-full">
        <CurrencyComponent {...args} />
    </div>
);

export const Img = Template.bind({});
Img.args = {
    currency: Currency.ETH,
    showImage: true
};

export const Conversion = Template.bind({});
Conversion.args = {
    currency: Currency.USDT,
    price: 10,
    showConversion: true,
    showImage: true
};

export const Complete = Template.bind({});
Complete.args = {
    currency: Currency.ETH,
    price: 1,
    externalPrice: 1400,
    showImage: true,
    showConversion: true,
    showPrice: true,
};
