import React from 'react';

export default function ListLogo({ width, height, color = '#FFFFFF' }) {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2.66675H14V4.00008H2V2.66675ZM2 7.33342H14V8.66675H2V7.33342ZM2 12.0001H14V13.3334H2V12.0001Z" fill={color} />
        </svg>
    );
}
