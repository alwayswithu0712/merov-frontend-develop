import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import MaterialTooltip, { VARIANT } from './index';

export default {
    title: 'components/MaterialTooltip',
    component: MaterialTooltip,
} as ComponentMeta<typeof MaterialTooltip>;

const StyledContainer = styled.div`
    width: 132px;
`;

const Template: ComponentStory<typeof MaterialTooltip> = (args) => (
    <StyledContainer>
        <MaterialTooltip {...args}>
            <button className="bg-gray-900 text-white p-3 rounded">Show Me Tooltip</button>
        </MaterialTooltip>
    </StyledContainer>
);

export const Default = Template.bind({});
Default.args = {
    children: 'Default',
    tooltipText: 'Default tooltip text',
    placement: VARIANT.LEFT,
};
