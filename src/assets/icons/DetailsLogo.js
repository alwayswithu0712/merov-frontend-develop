import React from 'react';

export default function DetailsLogo({ width, height, color }) {
    return (
        <svg width={width} height={height} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.00033 12.1831C2.77858 12.1831 0.166992 9.5715 0.166992 6.34975C0.166992 3.128 2.77858 0.516418 6.00033 0.516418C9.22208 0.516418 11.8337 3.128 11.8337 6.34975C11.8337 9.5715 9.22208 12.1831 6.00033 12.1831ZM5.41699 5.76642V9.26642H6.58366V5.76642H5.41699ZM5.41699 3.43308V4.59975H6.58366V3.43308H5.41699Z"
                fill={color || 'white'}
            />
        </svg>
    );
}
