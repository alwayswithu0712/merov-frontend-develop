import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputPassword from './index';

export default {
    title: 'Inputs/Password',
    component: InputPassword,
} as ComponentMeta<typeof InputPassword>;

const Template: ComponentStory<typeof InputPassword> = (args) => (
    <div className="w-80">
        <InputPassword {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {};
