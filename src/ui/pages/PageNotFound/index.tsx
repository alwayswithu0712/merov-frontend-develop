import React from 'react';
import Link from 'next/link';
import Logo from '../../../assets/images/Logo';
import Button, { SIZE, VARIANT } from '../../components/buttons/Button';

export default function PageNotFound() {
    return (
        <>
            <div className="logo-comingsoon">
                <Logo />
            </div>
            <div className="Portada">
                <img id="Fondo-Portada" src={`/images/comingsoon.png`} />
                <div className="row page-not-found-data">
                    <h1 className="col-10 page-not-found-title">404 Page Not Found</h1>
                    <div className="col-4 page-not-found-button">
                        <Link href={'/'} passHref>
                            <a>
                                <Button variant={VARIANT.PRIMARY} size={SIZE.MEDIUM}>
                                    Go Home
                                </Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
