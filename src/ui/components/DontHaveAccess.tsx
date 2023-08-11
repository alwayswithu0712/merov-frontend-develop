import React from 'react';
import Logo from '../../assets/images/Logo';

export default function DontHaveAccess() {
    return (
        <>
            <div className="relative z-10 float-right right-7 top-7">
                <Logo />
            </div>
            <div className="h-full w-full flex fixed text-center items-center justify-center">
                <img className='h-full w-full absolute z-0 inset-0' src={`/images/comingsoon.png`} />
                <div className="w-10/12 text-4xl md:text-6xl relative z-10">
                    <h1 className='m-auto'>You can&apos;t access!</h1>
                </div>
            </div>
        </>
    );
}
