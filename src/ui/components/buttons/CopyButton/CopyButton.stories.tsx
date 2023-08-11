import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CopyButton from './index';

export default {
    title: 'Buttons/Unstyled',
    component: CopyButton,
    argTypes: {
        children: {
            defaultValue: '',
            table: {
                defaultValue: { summary: 'Default' },
            },
            description: 'Elements to show inside of the button',
        },
    },
} as ComponentMeta<typeof CopyButton>;

const StyledContainer = styled.div`
    width: 132px;
`;

const Template: ComponentStory<typeof CopyButton> = (args) => (
    <StyledContainer>
        <CopyButton {...args} />
    </StyledContainer>
);

export const Default = Template.bind({});
Default.args = {
    children: 'Default',
    disabled: false,
};
