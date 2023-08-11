import { ComponentStory } from '@storybook/react';
import InputWithSelect from './index';

export default {
    title: 'Inputs/WithSelect',
    component: InputWithSelect,
};

const Template: ComponentStory<typeof InputWithSelect> = (args) => (
    <div className="w-80">
        <InputWithSelect {...args} />
    </div>
);

export const Simple = Template.bind({});
Simple.args = {
    id: 'dimensionsUnit',
    name: 'dimensionsUnit',
    defaultValue: 'cm',
    onChange: () => {},
    disabled: false,
    placeholder: 'Select option',
    selectValue: 'g',
    hasError: false,
    inputProps: {
        id: 'weight',
        key: 'weight',
        label: 'Weight',
        placeholder: 'Add Weight',
        value: '2',
        onBlur: () => {},
        onKeyPress: () => {},
        onChange: () => {},
    },
    selectOptions: ['g', 'kg', 'lbs', 'oz'],
};
