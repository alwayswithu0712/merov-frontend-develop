import React from 'react';
import { ComponentStory } from '@storybook/react';
import AccountAvatar, { VARIANT } from './index';

export default {
    title: 'components/AccountAvatar',
    component: AccountAvatar,
};

const Template: ComponentStory<typeof AccountAvatar> = (args) => (
    <div className="w-full">
        <AccountAvatar {...args} />
    </div>
);

export const VERTICAL = Template.bind({});
VERTICAL.args = {
    name: 'VERTICAL',
    rating: 4,
    deliveryAddresses: 'Montevideo Uruguay',
    reviewCount: 3,
    createdAt: '2022-11-01T03:11:44.127Z',
    href: '',
    imageSize: 45,
    variant: VARIANT.VERTICAL,
    showName: true,
    showStars: true,
    showReviews: true,
    showAddress: true,
    showJoined: true,
};

export const HORIZONTAL = Template.bind({});
HORIZONTAL.args = {
    name: 'HORIZONTAL',
    rating: 4,
    deliveryAddresses: 'Montevideo Uruguay',
    reviewCount: 3,
    createdAt: '2022-11-01T03:11:44.127Z',
    href: '',
    imageSize: 45,
    variant: VARIANT.HORIZONTAL,
    showName: true,
    showStars: true,
    showReviews: true,
    showAddress: true,
    showJoined: true,
};
