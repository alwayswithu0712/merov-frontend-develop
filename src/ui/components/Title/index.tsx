import React from 'react';
import styled from 'styled-components';
import COLORS from '../../foundation/colors';

interface Props {
    text: string;
    dontShowUnderline?: boolean;
    showLeftLine?: boolean;
    customStyle?: string;
    className?: string;
}

export default function Title({ text, dontShowUnderline = false, showLeftLine = false, customStyle = '', className = '' }: Props) {
    return (
        <StyledTitle
            className={`${showLeftLine ? 'text-left pl-3' : 'text-center'} not-italic font-medium leading-10 ${className}`}
            customStyle={customStyle}
            showLeftLine={showLeftLine}
            dontShowUnderline={dontShowUnderline}
        >
            {text}
        </StyledTitle>
    );
}

const StyledTitle = styled('h1')(
    (props: Pick<Props, 'className' | 'customStyle' | 'dontShowUnderline' | 'showLeftLine'>) => `
    ${
        props.dontShowUnderline
            ? ''
            : `
            ${
                props.showLeftLine
                    ? `
            border-left: 4px solid #47e6b6;
            `
                    : `
            text-decoration-line: underline;
            text-decoration-color: ${COLORS.GREEN};
            text-underline-offset: 12px;
            `
            }

    `
    }
    font-family: Poppins;
    ${props.customStyle}
    `,
);
