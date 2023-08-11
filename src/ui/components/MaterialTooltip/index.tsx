import React from 'react';
import Tooltip from '@mui/material/Tooltip';

interface Props {
    children: React.ReactElement<any, any>;
    tooltipText: string;
    placement?: VARIANT;
}

export enum VARIANT {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}

const MaterialTooltip = ({ children, tooltipText, placement = VARIANT.TOP }: Props) => (
    <Tooltip title={tooltipText} placement={placement}>
        {children}
    </Tooltip>
);

export default MaterialTooltip;
