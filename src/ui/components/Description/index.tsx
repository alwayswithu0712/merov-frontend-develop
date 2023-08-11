import React from 'react';
import styled from 'styled-components';

export interface DescriptionProps {
    title: string;
    text: string;
    customStyle?: string;
    className?: string;
    height?: string;
}

export default function Description({ title, text, height, customStyle, className = '' }: DescriptionProps) {
    return (
        <Container height={height} customStyle={customStyle} className={className}>
            <h4 className={`text-xl font-semibold text-white`}>{title}</h4>
            <p className={`text-base text-white`}>{text}</p>
        </Container>
    );
}

const Container = styled('div')(
    (props: Pick<DescriptionProps, 'height' | 'customStyle'>) => `
    overflow: hidden;
    height: ${props.height ? props.height : '100%'};
    ${props.customStyle ? props.customStyle : ''}
    `,
);
