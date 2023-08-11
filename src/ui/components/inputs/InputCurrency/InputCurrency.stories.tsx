import React from 'react';
import { ComponentStory } from '@storybook/react';
import InputCurrency from './index';
import { Currency as CURRENCY } from '../../../../typings/currency';

export default {
    title: 'Inputs/Currency',
    component: InputCurrency,
    argTypes: {
        onChange: { action: 'onChange' },
        onblur: { action: 'onBlur' },
        onKeyPress: { action: 'onKeyPress' },
    },
};

const Template: ComponentStory<typeof InputCurrency> = (args) => (
    <div className="w-80">
        <InputCurrency {...args} />
    </div>
);

export const simple = Template.bind({});
simple.args = {
    label: 'Default',
    id: 'title',
    error: '',
    disabled: false,
    key: 'test',
    placeholder: 'Placeholder test',
    value: '10',
    step: '1',
    min: '0',
    max: '30',
    type: 'number',
    currencyData: { currency: CURRENCY.USDT, price: 10, account: true },
};

export const withConversion = Template.bind({});
withConversion.args = {
    label: 'Default',
    id: 'title',
    error: '',
    disabled: false,
    key: 'test',
    placeholder: 'Placeholder test',
    value: '10',
    step: '1',
    min: '0',
    max: '30',
    type: 'number',
    currencyData: { currency: CURRENCY.ETH, price: 1, externalPrice: 1400,  account: true },
};
