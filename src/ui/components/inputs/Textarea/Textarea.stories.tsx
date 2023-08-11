import React from 'react';
import { ComponentStory } from '@storybook/react';
import Textarea from './index';

export default {
    title: 'Inputs/Textarea',
    component: Textarea,
};

const Template: ComponentStory<typeof Textarea> = (args) => (
    <div className="w-80">
        <Textarea {...args} />
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
