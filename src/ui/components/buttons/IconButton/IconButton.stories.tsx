import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IconButton from './index';
import { VARIANT } from '../Button';

export default {
    title: 'Buttons/Icon',
    component: IconButton,
} as ComponentMeta<typeof IconButton>;


const Template: ComponentStory<typeof IconButton> = (args) => (
    <div className="w-80">
        <IconButton {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    disabled: false,
    variant: VARIANT.SECONDARY,
    iconName: 'chatIcon'
};
