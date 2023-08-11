import React from 'react';

export default function FullStarLogo({ width, height, color = "#47e6b6" }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 18.26L4.94701 22.208L6.52201 14.28L0.587006 8.792L8.61401 7.84L12 0.5L15.386 7.84L23.413 8.792L17.478 14.28L19.053 22.208L12 18.26Z"
                fill={color}
            />
        </svg>
    );
}
