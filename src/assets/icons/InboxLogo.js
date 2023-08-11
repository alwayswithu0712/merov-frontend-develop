import React from 'react';

export default function InboxLogo({ width, height }) {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3.125 10C3.125 12.2917 3.125 14.0625 3.125 15C3.125 15.9375 4.0625 16.875 5 16.875C5.9375 16.875 14.0625 16.875 15 16.875C15.9375 16.875 16.875 15.9375 16.875 15C16.875 14.0625 16.875 10 16.875 10M3.125 10H6.5625C6.5625 10 7.5 12.1875 10 12.1875C12.5 12.1875 13.4375 10 13.4375 10H16.875M3.125 10L5.625 3.125H14.375L16.875 10M3.125 10V12.1875M16.875 10V12.1875"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
