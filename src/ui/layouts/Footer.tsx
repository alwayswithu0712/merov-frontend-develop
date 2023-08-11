import { notification } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Input from '../components/inputs/Input';
import Logo from '../../assets/images/Logo';
import ContactModal from './modals/ContactModal';
import merovService from '../../services/merov';
import Button, { SIZE, VARIANT as BTN_VARIANT } from '../components/buttons/Button';
import UnstyledButton from '../components/buttons/UnstyledButton';
import MaterialTooltip from '../components/MaterialTooltip/index';
import StringValidator from '../../helpers/validators/StringValidator';

const text = `Merov Marketplace’s advancements are industry-
leading transaction monitoring technologies, modern currencies, and  escrow 
services to create peace of mind for buyers and sellers. We hope you enjoy the 
service!`;

export default function Footer() {
    const [showFirstLinks, setShowFirstLinks] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contactModal, setContactModal] = useState<boolean>(false);
    const { EmailValidator } = StringValidator();

    useEffect(() => {
        function handleResize() {
            setShowFirstLinks(window.innerWidth >= 992);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function handleSubscribe() {
        setIsLoading(true);
        try {
            await EmailValidator(email, 'email');
            try {
                await merovService.api.postEmail({ email, updates: true, betaTester: false });
                notification.open({
                    message: 'Successful Subscription!',
                    description: `Successful subscription with ${email}!`,
                    className: 'success',
                });
            } catch (error) {
                notification.open({
                    message: 'Error!',
                    description: 'Email already in use',
                    className: 'error',
                });
            }
        } catch (error) {
            notification.open({
                message: 'Error!',
                description: `${error.message}`,
                className: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleOpenModal = () => {
        setContactModal(true);
    };

    const footerLinks = [
        { name: 'Home', route: '/', customCol: 'col-5', link: true },
        { name: 'Terms of Use', route: '/terms', customCol: 'col-7', link: true },
        { name: 'Browse', route: '/browse', customCol: 'col-5', link: true },
        { name: 'Compliance', route: '/compliance', customCol: 'col-7', link: true },
        { name: 'Resources', route: '/resources', customCol: 'col-5', link: true },
        { name: 'Commerce Policy', route: '/commerce', customCol: 'col-7', link: true },
        { name: 'FAQ', route: '/faq', customCol: 'col-5', link: true },
        { name: 'Privacy Policy', route: '/privacy', customCol: 'col-7', link: true },
        // { name: 'Blog', route: '/', customCol: 'col-5', link: true },
        { name: 'Contact', function: handleOpenModal, customCol: 'col-7', link: false },
    ];

    const logoSection = (
        <>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 img-row">
                <div className="w-full flex ">
                    <Logo width={'80'} height={'80'} />
                </div>
                <div className="text">{text}</div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 links-row">
                <div className="row">
                    <div className="site-text ">Site Links</div>
                    {footerLinks.map((data, index) =>
                        data.link ? (
                            <Link key={`${data.name}-${index}`} href={data.route!} passHref>
                                <a className={`${data.customCol ? data.customCol : 'col-6'} links`}>{data.name}</a>
                            </Link>
                        ) : (
                            <div className="col-6 links" key={`${data.name}-${index}`}>
                                <UnstyledButton onClick={data.function}>{data.name}</UnstyledButton>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </>
    );

    const linksSection = (
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 subscribe-row">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-lg-12 col-xl-12">
                    <div className="lg:justify-start grid md:flex items-center gap-x-2 gap-y-2 xl:gap-y-0">
                        <div className="text-basic-color">Currencies currently supported:</div>
                        <div className="flex gap-x-2">
                            {['btc', 'bsc', 'ltc', 'eth', 'usdt', 'erc20'].map((currency, index) => (
                                <MaterialTooltip key={`${currency}-${index}`} tooltipText={currency.toUpperCase()}>
                                    <div className="grid text-center">
                                        <img
                                            className="w-8 h-8"
                                            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/currency/${currency}.png`}
                                        ></img>
                                        <div className="text-basic-color text-xs">{currency.toLocaleUpperCase()}</div>
                                    </div>
                                </MaterialTooltip>
                            ))}
                        </div>
                    </div>
                    <div className="site-text">Stay Up To Date With Merov</div>
                    <div className="text-second">
                        Join thousands of Merov members receiving the latest in news, technology, promotions & contests.
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-12 col-xl-12">
                    <div className="row subscribe-row items-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mb-6 lg:mb-0 lg:pr-0">
                            <Input
                                onChange={(e: any) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter your email address"
                                style={{ fontSize: '14px', padding: '12px' }}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ">
                            <Button loading={isLoading} variant={BTN_VARIANT.PRIMARY} size={SIZE.MEDIUM} onClick={handleSubscribe}>
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <footer className="footer-background">
                <div className=" container-xxl">
                    <div className="row footer-V2">
                        {showFirstLinks ? (
                            <>
                                {logoSection} {linksSection}
                            </>
                        ) : (
                            <>
                                {linksSection} {logoSection}
                            </>
                        )}
                    </div>
                    <div className="row footer-V2">
                        <div className="col-12 copyright-row">
                            <div className="row">
                                <div className="col-12 copyright-text">Copyright © Merov Inc. All rights reserved.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <ContactModal contactModal={contactModal} setContactModal={setContactModal}></ContactModal>
        </>
    );
}
