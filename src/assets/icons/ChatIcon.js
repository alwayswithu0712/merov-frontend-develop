import React from 'react';

export default function ChatIcon({ width, height, color = '#47E6B6' }) {
    return (
        <svg width={width} height={height} viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.741699 7.97876C0.741699 3.57221 5.33455 0 11.0001 0C16.6657 0 21.2585 3.03447 21.2585 7.97876C21.2585 12.5381 17.2691 15.3876 11.57 15.3876L4.94577 19.9736C4.61416 20.2032 4.16117 19.9659 4.16117 19.5625V13.6779C3.21132 13.2979 0.741699 11.3982 0.741699 7.97876Z"
                fill={color}
            />
        </svg>
    );
}
