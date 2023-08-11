import React from 'react';

export default function AlertLogo({ width, height, error, hasPassword }) {
    const getColor = () => {
        if (!error && hasPassword) {
            return 'red';
        }
        if (error && hasPassword) {
            return '#47E6B6';
        }
        return '#FCB90D';
    };
    return (
        <svg width={width} height={height} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 10.2581C2.2385 10.2581 0 8.01956 0 5.25806C0 2.49656 2.2385 0.258057 5 0.258057C7.7615 0.258057 10 2.49656 10 5.25806C10 8.01956 7.7615 10.2581 5 10.2581ZM4.5 6.75806V7.75806H5.5V6.75806H4.5ZM4.5 2.75806V5.75806H5.5V2.75806H4.5Z"
                fill={getColor()}
            />
        </svg>
    );
}
