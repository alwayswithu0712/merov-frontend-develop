import React from 'react';

export default function DefataultPhotoLogo({ width, height, color }) {
    return (
        <svg width={width || '85'} height={height || '84'} viewBox="0 0 85 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="42.5" cy="42" r="42" fill={color ? '#0a0a0a' : '#181A1C'} />
            <path
                d="M26.5 61.9999C26.5 57.7564 28.1857 53.6867 31.1863 50.6862C34.1869 47.6856 38.2565 45.9999 42.5 45.9999C46.7435 45.9999 50.8131 47.6856 53.8137 50.6862C56.8143 53.6867 58.5 57.7564 58.5 61.9999H26.5ZM42.5 43.9999C35.87 43.9999 30.5 38.6299 30.5 31.9999C30.5 25.3699 35.87 19.9999 42.5 19.9999C49.13 19.9999 54.5 25.3699 54.5 31.9999C54.5 38.6299 49.13 43.9999 42.5 43.9999Z"
                fill={color || '#47E6B6'}
            />
        </svg>
    );
}
