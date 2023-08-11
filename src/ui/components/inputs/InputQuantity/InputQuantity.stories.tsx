import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import InputQuantity from './index';

export default {
    title: 'Inputs/Quantity',
    component: InputQuantity,
    argTypes: {
        onChange: { action: 'onChange' },
        onblur: { action: 'onBlur' },
        onKeyPress: { action: 'onKeyPress' },
    },
};

const Template: ComponentStory<typeof InputQuantity> = (args) => {
    const [value, setValue] = useState(1);
    return (
        <div className="w-80">
            <InputQuantity
                {...args}
                value={value}
                onChange={(value) => {
                    setValue(value);
                    console.log(value);
                }}
            />
        </div>
    );
};

export const simple = Template.bind({});
simple.args = {
    label: 'Default',
    id: 'title',
    disabled: false,
    key: 'test',
    placeholder: 'Placeholder test',
    value: '10',
    min: 0,
    max: 30,
    avaliable: 30,
};
