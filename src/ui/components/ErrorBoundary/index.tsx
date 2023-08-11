import React from 'react';
import router from 'next/router';
import Logo from '../../../assets/images/Logo';
import Button, { SIZE, VARIANT } from '../buttons/Button';

interface ErrorBoundaryProps {
    resetError: () => void;
}

export default function SomethingWentWrong({ resetError }: ErrorBoundaryProps) {
    const handleGoHome = async () => {
        await router.push('/');
        resetError();
    };
    return (
        <>
            <div className="logo-comingsoon">
                <Logo />
            </div>
            <div className="Portada">
                <img id="Fondo-Portada" src={`/images/comingsoon.png`} />
                <div className="row page-not-found-data">
                    <h1 className="col-10 page-not-found-title">Something went wrong!</h1>
                    <div className="col-4 page-not-found-button">
                        <Button onClick={handleGoHome} variant={VARIANT.PRIMARY} size={SIZE.MEDIUM}>
                            Go Home
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
