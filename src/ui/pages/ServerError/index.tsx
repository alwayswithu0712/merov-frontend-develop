import Link from 'next/link';
import React from 'react';
import Logo from '../../../assets/images/Logo';
import Button, { SIZE, VARIANT } from '../../components/buttons/Button/index';

export default function ServerError() {
    return (
        <>
            <div className="logo-comingsoon">
                <Logo />
            </div>
            <div className="Portada">
                <img id="Fondo-Portada" src={`/images/comingsoon.png`} alt="" />
                <div className="row page-not-found-data">
                    <h1 className="col-10 page-not-found-title">500 Server Error</h1>
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
