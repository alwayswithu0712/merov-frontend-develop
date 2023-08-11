import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import PageHead from './PageHead';
import MobileMenu from '../components/MobileMenu/index';
import Header from './Header';
import TitleHome from '../components/TitleHome';
import Footer from './Footer';
import Logo from '../../assets/images/Logo';
import COLORS from '../foundation/colors';
import { isProduction } from '../../helpers/enviroments';

interface IOpen {
    mobileMenu: {
        open: boolean;
    };
}

interface IProps {
    headTitle: string;
    titleData: {
        header: string;
        title: string;
        subTitle: string;
    };
    children: JSX.Element;
}

const footerText = `We envision a future where all currencies, digital and fiat, 
are widely accepted as a form of payment and are used in everyday transactions to buy and 
sell anything with the confidence of transaction protection — from laptops to skyscrapers.`;

export default function InfoLayout({ headTitle, titleData, children }: IProps): JSX.Element {
    const open = useSelector((state: IOpen) => state.mobileMenu.open);

    return (
        <>
            <PageHead headTitle={headTitle} />

            {open && <MobileMenu />}
            <div id="main-wrapper" className="dashboard header-home">
                {isProduction() ? (
                    <header className="z-10 py-4 flex relative justify-center bg-transparent ">
                        <div className="flex ">
                            <Logo width={'60'} height={'60'} />
                        </div>
                    </header>
                ) : (
                    <Header />
                )}

                <div className="content-body">
                    <div className="row title-img-background title-img-background-without-arrow-down"></div>
                    <div className="container">
                        <TitleHome showArrowDown={false} {...titleData}></TitleHome>
                        <div className="text text-content">{children}</div>
                    </div>
                </div>
                {isProduction() ? (
                    <div className={`w-full bg-[${COLORS.LIGHTDARK}] px-2 md:px-10`}>
                        <div className="flex justify-center">
                            <div className="xl:max-w-screen-xl sm:max-w-screen-xl max-w-max text-sm mt-10">
                                <div className=" justify-start text-left mb-5">
                                    <div className="flex ">
                                        <Logo width={'80'} height={'80'} />
                                    </div>
                                    <div className="text w-full md:w-6/12">{footerText}</div>
                                </div>
                                <div className="w-full ">
                                    <div className="w-full border-t border-white py-8">
                                        <div className="w-full flex space-between">
                                            <div className="w-full  text-left">Copyright © Merov Inc. All rights reserved.</div>
                                            <div className="w-full  text-end">
                                                <Link href={'/privacy'} passHref>
                                                    <a>Privacy Policy</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Footer />
                )}
            </div>
        </>
    );
}
