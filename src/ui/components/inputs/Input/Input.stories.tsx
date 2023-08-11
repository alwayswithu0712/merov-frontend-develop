import React from 'react';
import { ComponentStory } from '@storybook/react';
import Input from './index';

export default {
    title: 'Inputs/Input',
    component: Input,
};

const Template: ComponentStory<typeof Input> = (args) => (
    <div className="w-80">
        <Input {...args} />
    </div>
);

export const Simple = Template.bind({});
Simple.args = {
    label: 'Shared with',
    id: 'title',
    hasError: false,
    disabled: false,
    key: 'test',
    placeholder: 'Placeholder test',
    value: '10',
    step: '1',
    min: '0',
};
