import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserButton from './index';
import { VARIANT } from '../Button';

export default {
    title: 'Buttons/User',
    component: UserButton,
} as ComponentMeta<typeof UserButton>;

const Template: ComponentStory<typeof UserButton> = (args) => (
    <div className="w-80">
        <UserButton {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    disabled: false,
    variant: VARIANT.SECONDARY,
    showAvatar: true,
    showName: true,
    showStars: true,
    user: {
        avatarUrl: 'https://develop.merov.io/images/home/Charts.jpg',
        rating: 5,
        username: 'leonelmazzan',
        idVerificationStatus: 'Full',
    },
};
