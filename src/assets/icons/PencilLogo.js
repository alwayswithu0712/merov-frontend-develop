import React from 'react';

export default function PencilLogo({ color = 'white', opaque = false }) {
    return (
        <svg width={20} height={20} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity={!opaque ? '1' : '0.5'}>
                <path
                    d="M15.3157 2.43016L18.5697 5.68416C19.019 6.13345 19.019 6.86188 18.5697 7.31117L8.47277 17.4081L1.558 19.4418L3.59176 12.5271L13.6887 2.43016C14.138 1.98087 14.8664 1.98088 15.3157 2.43016Z"
                    stroke={color}
                    strokeWidth="2.30093"
                />
            </g>
        </svg>
    );
}
