import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputCopy from './index';

export default {
    title: 'Inputs/Copy',
    component: InputCopy,
} as ComponentMeta<typeof InputCopy>;

const Template: ComponentStory<typeof InputCopy> = (args) => (
    <div className="w-80">
        <InputCopy {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {};
