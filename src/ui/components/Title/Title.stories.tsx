import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from './index';

export default {
    title: 'components/Title',
    component: Title,
    argTypes: {
        text: {
            defaultValue: 'Title',
            description: 'Text to show in the title',
        },
    },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
    text: 'Title text',
};
