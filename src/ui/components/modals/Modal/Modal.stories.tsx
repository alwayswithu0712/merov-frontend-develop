import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from './index';

export default {
    title: 'Components/Modal',
    component: Modal,
    argTypes: {
        children: {
            defaultValue: '',
            table: {
                defaultValue: { summary: 'Default' },
            },
            description: 'Elements to show inside of the button',
        },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
    <div className='w-80'>
        <Modal {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    shouldModalOpen: true,
    closeModal: () => {},
    children: <h1>Modal</h1>,
    firstButton: {
        loading: false,
        disabled: false,
        onClick: () => {},
        children: 'Cancel',
    },
    secondButton: {
        loading: false,
        disabled: false,
        onClick: () => {},
        children: 'Accept',
    },
};
