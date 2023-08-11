import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Description from './index';

export default {
    title: 'components/Description',
    component: Description
} as ComponentMeta<typeof Description>;

const Template: ComponentStory<typeof Description> = (args) => <Description {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Lorem ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget dui vitae ante blandit tempus a in risus. Etiam blandit lacus lorem, vitae consectetur tortor fermentum non. Nam vehicula, enim sed consectetur placerat, augue mauris feugiat mauris, nec dapibus nisl leo non nulla. Sed venenatis ex quis velit porta, sit amet ornare orci accumsan. Quisque convallis eu quam sollicitudin aliquam. Curabitur mollis sem eu pharetra condimentum. Mauris ac erat nunc',
    height: '300px'
};
