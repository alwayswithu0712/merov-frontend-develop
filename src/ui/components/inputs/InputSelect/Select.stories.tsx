import React from 'react';
import { ComponentStory } from '@storybook/react';
import InputSelect from './index';

export default {
    title: 'Inputs/Select',
    component: InputSelect,
};

const Template: ComponentStory<typeof InputSelect> = (args) => (
    <div className="w-80">
        <InputSelect {...args} />
    </div>
);

export const Simple = Template.bind({});
Simple.args = {
    id: 'title',
    name: 'title',
    label: 'Ingredients',
    placeholder: 'Select a Ingredient',
    onChange: ()=>{},
    disabled: false,
    defaultValue: null,
    hasError: false,
    options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ],
};
