import React from 'react';
import styled from 'styled-components';
import COLORS from '../../../foundation/colors';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    customStyle?: string;
}

export default function UnstyledButton({ children, onClick, disabled, className, customStyle, type = 'button' }: Props) {
    return (
        <StyledButtton type={type} className={className} disabled={disabled} onClick={onClick} customStyle={customStyle}>
            {children}
        </StyledButtton>
    );
}

const StyledButtton = styled('button')(
    (props: Props) => `
    background: none;
	color: ${COLORS.WHITE};
	border: none;
	border-radius: 0px;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    ${!!props.customStyle && props.customStyle}
    `,
);
