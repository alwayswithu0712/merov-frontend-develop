import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductCard from './index';

export default {
    title: 'components/ProductCard',
    component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const StyledContainer = styled.div`
    width: 350px;
`;

const Template: ComponentStory<typeof ProductCard> = (args) => (
    <StyledContainer>
        <ProductCard {...args} />
    </StyledContainer>
);

export const Default = Template.bind({});
Default.args = {
    // product:{}
    product: {
        id: 'DVDO1P5AKZ',
        createdAt: '2022-10-28T17:30:10.987Z',
        title: 'Test test test ',
        description: 'test test test',
        price: 2,
        priceInUsd: 2,
        images: [
            'https://develop.merov.io/images/home/Charts.jpg',
            'https://develop.merov.io/images/home/shield.jpg',
            'https://develop.merov.io/images/home/Bitcoin.jpg',
        ],
        condition: 'Used',
        stock: 432,
        sellerId: 'auth0|6351b1ca449a201e28d150bd',
        sellerAddress: '0xfF2346664603595b07902aCA856F428a32666Bb1',
        brand: null,
        model: 'test dos',
        currency: 'USDT',
        chain: 'Ethereum',
        categoryId: 'FBBYQO1Q53',
        subcategoryId: 'GM2I11J114',
        requiresShipping: true,
        shippingCost: 0,
        maxTestingTime: 3,
        minTestingTime: 0,
        published: false,
        featured: false,
        category: {
            id: 'FBBYQO1Q53',
            wallapopId: 15000,
            createdAt: '2022-10-12T14:53:52.718Z',
            name: 'Computers & Electronic',
            fields: {},
            levels: 3,
        },
        subcategory: {
            id: 'GM2I11J114',
            wallapopId: 10134,
            createdAt: '2022-10-12T14:53:52.719Z',
            fields: null,
            name: 'Computers & accessories',
            categoryId: 'FBBYQO1Q53',
            hasChildren: true,
        },
        seller: {
            id: 'auth0|6351b1ca449a201e28d150bd',
            count: 54,
            createdAt: '2022-10-20T20:38:35.464Z',
            updatedAt: '2022-10-28T11:52:57.533Z',
            firstName: 'leonel',
            lastName: 'mazzan',
            username: 'leonelmazzan',
            email: 'leonelmazzan@gmail.com',
            phone: '26155566633',
            avatarUrl: 'https://merov-develop--s3-bucket.s3.us-east-2.amazonaws.com/vikingito1.jpg1666957976945',
            isSeller: false,
            referralId: null,
            reviewCount: 0,
            rating: 0,
            verified: false,
            blocked: false,
            dateOfBirth: '1999-06-29T20:44:04.078Z',
            sendBirdAccessToken: 'bae494d3833ba2c696755ddef1aebaf3f56499ff',
        },
        orders: [],
        activeOrdersCount: 0,
        itemsSoldCount: 0,
        isRemovable: true,
    },
};
