import React from 'react';
import styled from 'styled-components';
import COLORS from '../../foundation/colors';

interface Props {
    size?: string;
    weight?: string;
    disabled?: boolean;
    color?: string;
}

export default function Spinner({ size, weight, disabled, color }: Props) {
    return <StyledSpinner size={size} weight={weight} disabled={disabled} color={color} />;
}

const StyledSpinner = styled('span')(
    (props: Props) => `
    width: ${props.size ? props.size : '32px'};
    height: ${props.size ? props.size : '32px'};
    border: ${props.weight ? props.weight : '5px'} solid ${props.disabled ? COLORS.LIGHTGREY : props.color ? props.color : COLORS.WHITE};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    
`,
);
