import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Detail from './index';
import { STATUS, User } from '../../../typings/user';
import { Currency } from '../../../typings/currency';
import { DetailProps } from './type';

export default {
    title: 'components/Detail',
    component: Detail,
} as ComponentMeta<typeof Detail>;

const Template: ComponentStory<typeof Detail> = (args) => <Detail {...args} />;

const properties: DetailProps = {
    imagesCarousel: [
        'https://develop.merov.io/images/home/Charts.jpg',
        'https://develop.merov.io/images/home/shield.jpg',
        'https://develop.merov.io/images/home/Bitcoin.jpg',
    ],
    textLeft:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor tempus odio eu scelerisque. Vivamus sollicitudin quis mi sed congue. In hac habitasse platea dictumst. Donec ultricies massa ut',
    leftFirstButton: { children: 'View product', onClick: () => {} },
    leftSecondButton: { children: 'Re Order', onClick: () => {} },
    textTitle: 'leo in tortor semper convallis.',
    textSubTitle: 't ultricies. Vivamus elementum libero vel ur',
    user: {
        avatarUrl: 'https://develop.merov.io/images/home/Charts.jpg',
        rating: 4,
        username: 'tortor semper',
        idVerificationStatus: STATUS.Full,
    } as User,
    chatProductId: '2',
    tableData: [
        {
            title: 'Order',
            text: '#64CS210',
        },
        {
            title: 'Order Fee',
            text: '2%',
        },
        {
            title: 'Quantity',
            text: '1',
        },
        {
            title: 'Ships to',
            text: 'Address Rivera Montevideo, uruguay 12345 rivera 23451',
        },
    ],
    descriptionData: {
        title: 'Suspendisse ultricies consequa',
        text: 'Morbi rhoncus tristique faucibus. In hac habitasse platea dictumst. Cras vel lorem non risus suscipit fermentum a vel neque. Nulla eget rhoncus eros, volutpat placerat elit. Fusce vulputate sapien et orci cursus tempus. In sagittis auctor lacinia. Aliquam diam ante, interdum sed cursus at, pellentesque nec libero. Morbi purus ex, porttitor at magna ultrices, dictum ullamcorper ex. Donec interdum dolor eu dolor auctor pretium.',
    },
    inputData: {
        label:'Please provide shipment tracking',
        value: 'awdawdawd2223123fafdawdfwda',
    },
    inputPriceData: {
        value: 10,
        currencyData: {
            externalPrice: 1400,
            currency: Currency.ETH,
        },
    },
    inputShippingData: {
        value: 1,
        currencyData: {
            externalPrice: 1400,
            currency: Currency.ETH,
        },
    },
    inputServiceFeeData: {
        value: 2,
        currencyData: {
            externalPrice: 1400,
            currency: Currency.ETH,
        },
    },
    inputTotalData: {
        value: 3,
        currencyData: {
            externalPrice: 1400,
            currency: Currency.ETH,
        },
    },
    inputAmountData: {
        value: 1,
        min: 1,
        max: 20,
        avaliable: 20,
        onChange: () => {},
    },
    inputShippingDurationData: {
        options: [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
        ],
    },
    inputWallet: {
        defaultValue: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    },
    rightFirstButton: { children: 'Accept', onClick: () => {} },
    rightSecondButton: { children: 'Decline', onClick: () => {} },
    showContactUs: true,
};

export const Default = Template.bind({});
Default.args = properties;
