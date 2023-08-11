import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spinner from './index';

export default {
    title: 'components/Spinner',
    component: Spinner,
    argTypes: {
        size: {
            defaultValue: '',
            table: {
                defaultValue: { summary: '32px' },
            },
            description: 'Custom size for the spinner, this will modify the height and width',
            control: {
                type: 'text',
            },
        },

        weight: {
            defaultValue: '',
            control: {
                type: 'text',
            },
            table: {
                defaultValue: { summary: '5px' },
            },
            description: 'Custom weight for the spinner, this will modify the border',
        },
    },
} as ComponentMeta<typeof Spinner>;

const StyledContainer = styled.div`
    width: 132px;
`;

const Template: ComponentStory<typeof Spinner> = (args) => (
    <StyledContainer>
        <Spinner {...args} />
    </StyledContainer>
);

export const Default = Template.bind({});
Default.args = {};
