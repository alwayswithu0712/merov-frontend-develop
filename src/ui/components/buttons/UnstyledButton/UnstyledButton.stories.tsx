import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UnstyledButton from './index';

export default {
    title: 'Buttons/Unstyled',
    component: UnstyledButton,
    argTypes: {
        children: {
            defaultValue: '',
            table: {
                defaultValue: { summary: 'Default' },
            },
            description: 'Elements to show inside of the button',
        },
    },
} as ComponentMeta<typeof UnstyledButton>;

const StyledContainer = styled.div`
    width: 132px;
`;

const Template: ComponentStory<typeof UnstyledButton> = (args) => (
    <StyledContainer>
        <UnstyledButton {...args} />
    </StyledContainer>
);

export const Default = Template.bind({});
Default.args = {
    children: 'Default',
    disabled: false,
};
