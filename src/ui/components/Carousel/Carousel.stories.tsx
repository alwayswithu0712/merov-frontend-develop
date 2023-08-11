import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Carousel from './index';

export default {
    title: 'components/Carousel',
    component: Carousel,
    argTypes: {
        images: {
            defaultValue: [
                'https://develop.merov.io/images/home/Charts.jpg',
                'https://develop.merov.io/images/home/shield.jpg',
                'https://develop.merov.io/images/home/Bitcoin.jpg',
            ],
            description: 'Images to show inside the carusel',
        },
    },
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
    <div className="w-80">
        <Carousel {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    images: [
        'https://develop.merov.io/images/home/Charts.jpg',
        'https://develop.merov.io/images/home/shield.jpg',
        'https://develop.merov.io/images/home/Bitcoin.jpg',
    ],
    imageLayout: 'responsive',
    width: 350,
    height: 350,
};
