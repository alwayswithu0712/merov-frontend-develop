import React from 'react';

export default function CardLogo({ width, height, color = '#FFFFFF' }) {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2 2.00006H7.33333V7.3334H2V2.00006ZM2 8.66673H7.33333V14.0001H2V8.66673ZM8.66667 2.00006H14V7.3334H8.66667V2.00006ZM8.66667 8.66673H14V14.0001H8.66667V8.66673Z"
                fill={color}
            />
        </svg>
    );
}
