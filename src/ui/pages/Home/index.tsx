import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Product } from '../../../typings/product';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import PageHead from '../../layouts/PageHead';
import MobileMenu from '../../components/MobileMenu';
import EscrowPropertyCard from '../../components/cards/EscrowPropertyCard';
import EscrowPropertyRowCard from '../../components/cards/EscrowPropertyRowCard';
import ProductCard from '../../components/cards/ProductCard';
import SocialMedia from '../../components/SocialMedia';
import HomeContainer from './hooks/HomeContainer';
import Button, { SIZE } from '../../components/buttons/Button';

interface HomeProps {
    products: Product[];
}

interface IOpen {
    mobileMenu: {
        open: boolean;
    };
}

export default function Home({ products }: HomeProps) {
    const { titleData, escrowPropertiesCardData, escrowPropertiesRowCardData, socialMediaData, partnersData, items } =
        HomeContainer(products);

    const open = useSelector((state: IOpen) => state.mobileMenu.open);

    const redirect = useCallback((url: string) => {
        window.open(url, '_blank');
    }, []);

    return (
        <>
            <PageHead headTitle={'Home'} />
            {open && <MobileMenu />}
            <div id="main-wrapper" className={'dashboard header-home'}>
                <Header />
                <div className=" flex justify-center relative">
                    <div className="bg-center bg-[url('/images/Merov-bg-home.svg')] xl:border-neutral-500 border-solid  2xl:border-t-[2px]  2xl:border-b-[2px] absolute h-[540px] z-10  bg-no-repeat bg-cover w-full animate__animated animate__fadeIn animate__faster"></div>
                </div>

                <div className="flex justify-center w-full">
                    <div className=" bg-[url('/images/Merov-logo-home.svg')] mt-8 sm:mt-12 md:mt-[40px] bg-no-repeat h-[500px] md:h-[450px] w-[350px] md:w-[450px]  z-20 animate__animated animate__fadeIn animate__faster"></div>
                </div>
                <div className="flex justify-center">
                    <div className="pt-[450px] sm:pt-[450px] md:pt-[490px] mb-12 lg:mb-11 top-0 absolute z-10 animate__animated animate__fadeIn animate__faster">
                        <div className="flex text-center">
                            <h3 className="font-medium text-3xl sm:text-4xl lg:text-5xl mb-2.5">{titleData.title}</h3>
                        </div>
                        <div className="flex justify-center text-center">
                            <h5 className="font-light text-lg md:text-[25px]">{titleData.subTitle}</h5>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden  md:mt-20">
                    <div className="row title-img-background"></div>
                    <div className="home-container">
                        <div className="Home">
                            <div className="vision-section" id="vision">
                                <div className="title-data">
                                    <i className="why-merov-substract ri-subtract-fill"></i>
                                    <div className="text-base ">Vision</div>
                                </div>
                                <div className="flex text-center justify-center">
                                    <div className="max-w-prose text">
                                        We envision a future where all currencies, digital and fiat, are widely accepted as a form of
                                        payment and are used in everyday transactions to buy and sell anything with the confidence of escrow
                                        — from laptops to skyscrapers.
                                    </div>
                                </div>
                                <div className="row escrow-properties-card">
                                    {escrowPropertiesCardData.map((property) => (
                                        <div
                                            className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 animate__animated animate__zoomIn animate__faster"
                                            key={property.title}
                                        >
                                            {' '}
                                            <EscrowPropertyCard {...property} />
                                        </div>
                                    ))}
                                </div>

                                <div id="properties" className="row escrow-properties-row-card">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
                                        {escrowPropertiesRowCardData.map((property) => (
                                            <EscrowPropertyRowCard key={property.title} {...property} />
                                        ))}
                                    </div>

                                    <div className="col-12 col-sm-12 col-md-8 col-lg-5 col-xl-5">
                                        <div className="elipse-row">
                                            <div className="elipse-blue"></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="elipse-row elipse-red-row">
                                            <div className="elipse-red"></div>
                                        </div>

                                        <div className="social-media-col col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
                                            <div className="row">
                                                <div className="social-media-title">Join our community</div>
                                                {socialMediaData.map((media) => (
                                                    <div
                                                        className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 animate__animated animate__zoomIn animate__faster"
                                                        key={media.image}
                                                    >
                                                        <SocialMedia {...media} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!!items && items.length > 0 && (
                                <div id="marketplace" className="row marketplace-section">
                                    <div className="title-data">
                                        {' '}
                                        <i className="why-merov-substract ri-subtract-fill"></i>
                                        <div className="text-base">Marketplace</div>
                                        <div className="text">Featured Collections</div>
                                    </div>

                                    <div className="justify-content-center grid grid-cols-1 gap-4 sm:gap-8 md:gap-12 lg:mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                                        {items.map((product) => (
                                            <ProductCard key={product.id} product={product} showCondition showPrice />
                                        ))}
                                    </div>

                                    <div className="button mt-14">
                                        <Link href="/products/create" passHref>
                                            <a>
                                                <Button size={SIZE.MEDIUM}>Sell a product</Button>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <div id="partners" className="row partners-section">
                                <div className="title-data">
                                    {' '}
                                    <i className="why-merov-substract ri-subtract-fill"></i>
                                    <div className="text-base">Partners</div>
                                    <div className="title-title-row">
                                        <h3 className="text">Our Partners</h3>
                                    </div>
                                </div>
                                <div className="col-10 partners-row animate__animated animate__bounceIn animate__faster">
                                    <div className="elipse-row">
                                        {' '}
                                        <div className="elipse-green"></div>
                                    </div>

                                    <div className="row partners-row-card">
                                        {partnersData.map((partner, index) => (
                                            <div
                                                onClick={() => redirect(partner.url)}
                                                key={index}
                                                className="partners-card col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                                            >
                                                <img src={`${partner.image}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
