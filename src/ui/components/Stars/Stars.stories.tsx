import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stars from './index';

export default {
    title: 'components/Stars',
    component: Stars,
} as ComponentMeta<typeof Stars>;

const Template: ComponentStory<typeof Stars> = (args) => (
    <div className="w-80">
        <Stars {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    rating: 4,
};
