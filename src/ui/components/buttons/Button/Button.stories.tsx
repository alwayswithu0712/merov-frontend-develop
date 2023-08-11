import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import Button, { VARIANT } from './index';

export default {
    title: 'Buttons/Default',
    component: Button,
    argTypes: {
        children: {
            defaultValue: '',
            table: {
                defaultValue: { summary: 'Default' },
            },
            description: 'Elements to show inside of the button',
        },
        spinnerSize: {
            table: {
                defaultValue: { summary: '17px' },
            },
            description: 'Size of the loading spinner',
        },
    },
} as ComponentMeta<typeof Button>;

const StyledContainer = styled.div`
    width: 132px;
`;

const Template: ComponentStory<typeof Button> = (args) => (
    <StyledContainer>
        <Button {...args} />
    </StyledContainer>
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'Default',
    disabled: false,
    variant: VARIANT.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Default',
    disabled: false,
    variant: VARIANT.SECONDARY,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    children: 'Default',
    disabled: false,
    variant: VARIANT.TERTIARY,
};

export const Quaternary = Template.bind({});
Quaternary.args = {
    children: 'Default',
    disabled: false,
    variant: VARIANT.QUATERNARY,
};
