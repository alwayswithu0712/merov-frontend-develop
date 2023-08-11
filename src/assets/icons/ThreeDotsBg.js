import React from 'react';

export default function ThreeBgLogo({ width, height }) {
    return (
        <svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" fill="#2E2E2E" />
            <path
                d="M14 6.5C13.3125 6.5 12.75 7.0625 12.75 7.75C12.75 8.4375 13.3125 9 14 9C14.6875 9 15.25 8.4375 15.25 7.75C15.25 7.0625 14.6875 6.5 14 6.5ZM14 19C13.3125 19 12.75 19.5625 12.75 20.25C12.75 20.9375 13.3125 21.5 14 21.5C14.6875 21.5 15.25 20.9375 15.25 20.25C15.25 19.5625 14.6875 19 14 19ZM14 12.75C13.3125 12.75 12.75 13.3125 12.75 14C12.75 14.6875 13.3125 15.25 14 15.25C14.6875 15.25 15.25 14.6875 15.25 14C15.25 13.3125 14.6875 12.75 14 12.75Z"
                fill="white"
            />
        </svg>
    );
}