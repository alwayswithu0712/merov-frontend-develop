import React from 'react';
import Link from 'next/link';
import AboutCards from './AboutCards';
import MainLayout from '../../layouts/MainLayout';
import PageTitle from '../../layouts/PageTitle';

export default function About() {
    return (
        <MainLayout headTitle="About" pageClass={'dashboard '}>
            <PageTitle />
            <div className="row row-promotion">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 about-promotion-row">
                    <img src={'./images/about.jpg'} className="img-fluid rounded col" style={{ height: '300px' }}></img>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 about-padding-right-items">
                    <div className="promotion-text-first-inside">
                        <h3 className="text-white mb-3 promotion-detail">
                            Discover, Collect, Sell <br /> and Create your Own NFT
                        </h3>
                        <p>Digital marketplace for crypto collectibles and non fungable tokens</p>
                        <Link href="/">
                            <button className="btn btn-custom btn-primary ">Begin Journey</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <AboutCards />
                <AboutCards />
                <AboutCards />
            </div>

            <div className="row padding-bottom row-promotion">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="promotion-text-second-inside ">
                        <h3 className="text-white mb-3">
                            Discover, Collect, Sell <br /> and Create your Own NFT
                        </h3>
                        <p>Digital marketplace for crypto collectibles and non fungable tokens</p>
                        <Link href="/" passHref>
                            <a>
                                <button className="btn btn-custom btn-secondary-transparent">View FAQs</button>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 about-promotion-row about-padding-right-items">
                    <img src={'./images/about-insights.jpg'} className="img-fluid rounded col" style={{ height: '300px' }}></img>
                </div>
            </div>
        </MainLayout>
    );
}
