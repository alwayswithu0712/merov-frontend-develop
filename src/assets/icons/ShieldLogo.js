import React from 'react';

export default function ShieldLogo({ width, height }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 1L20.217 2.826C20.674 2.928 21 3.333 21 3.802V13.789C21 15.795 19.997 17.669 18.328 18.781L12 23L5.672 18.781C4.002 17.668 3 15.795 3 13.79V3.802C3 3.333 3.326 2.928 3.783 2.826L12 1ZM16.452 8.222L11.502 13.171L8.674 10.343L7.26 11.757L11.503 16L17.867 9.636L16.452 8.222Z"
                fill="#47E6B6"
            />
        </svg>
    );
}
