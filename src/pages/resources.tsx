import React, { useState } from 'react';

import Link from 'next/link';
import styled from 'styled-components';
import MainLayout from '../ui/layouts/MainLayout';
import UnstyledButton from '../ui/components/buttons/UnstyledButton';
import ContactModal from '../ui/layouts/modals/ContactModal';

export default function Page() {
    const [contactModal, setContactModal] = useState<boolean>(false);

    const handleOpenModal = () => {
        setContactModal(true);
    };

    return (
        <>
            {/* eslint-disable max-len  */}
            <MainLayout headTitle="Process" pageClass={'dashboard '} width={'90%'}>
                <div className="container">
                    <div className="row padding-bottom flex justify-center">
                        <div className="py-8 justify-center justify-content-center grid grid-cols-1 md:grid-cols-2 animate__animated animate__fadeIn animate__faster">
                            <div className="flex justify-end">
                                <ContainerImage>
                                    <img className="w-full md:max-w-lg" src="/images/resources/step1.jpg" />
                                </ContainerImage>
                            </div>
                            <div>
                                <div className="promotion-detail padding-left">
                                    <h1 className="green-text">Step 1</h1>
                                    <h3 className="mb-3">Create Account </h3>
                                    <p>
                                        In order to utilize our marketplace you need to create a user account with a valid email address.
                                        Our account creation process requires basic information for user identity verification including
                                        full legal name, birth month and year, and phone number. These simple details allow us to ensure the
                                        quality of delivered products and services. Create your account{' '}
                                        <Link href={'/signup'} passHref>
                                            <LinkUnderline>here!</LinkUnderline>
                                        </Link>
                                    </p>
                                    <p>
                                        <i>We do not sell your data!</i>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="py-8 justify-center justify-content-center grid grid-cols-1 md:grid-cols-2  animate__animated animate__fadeIn animate__faster">
                            <div className="flex justify-end">
                                <ContainerImage>
                                    <img className="w-full md:max-w-lg" src="/images/resources/step2.jpg" />
                                </ContainerImage>
                            </div>
                            <div>
                                <div className="promotion-detail padding-left">
                                    <h1 className="green-text">Step 2</h1>
                                    <h3 className="mb-3">Looking for items to buy or sell?</h3>
                                    <p>
                                        Hop on over to the{' '}
                                        <Link href={`/browse`} passHref>
                                            <LinkUnderline>Browse section</LinkUnderline>
                                        </Link>{' '}
                                        and{' '}
                                        <Link href={`/#marketplace`} passHref>
                                            <LinkUnderline>Featured Collections</LinkUnderline>
                                        </Link>
                                    </p>
                                    <p>
                                        If you&apos;re looking to sell items, head over to{' '}
                                        <Link href={`/products/create`} passHref>
                                            <LinkUnderline>Sell a product</LinkUnderline>
                                        </Link>{' '}
                                        and start listing! Be sure to list your items as accurately and thoroughly as possible with at least
                                        three photos as this will improve your chances of success in the Marketplace. Please take into
                                        consideration the current market and trends for the items you&apos;re selling to price them
                                        correctly and update your ads frequently for the best chance of success. Please ensure your listings
                                        abide by our{' '}
                                        <Link href={`/commerce`} passHref>
                                            <LinkUnderline>Commerce Policy</LinkUnderline>
                                        </Link>{' '}
                                        - listings that do not comply will be deactivated.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="py-8 justify-center justify-content-center grid grid-cols-1 md:grid-cols-2  animate__animated animate__fadeIn animate__faster">
                            <div className="flex justify-end">
                                <ContainerImage>
                                    <img className="w-full md:max-w-lg" src="/images/resources/step3.jpg" />
                                </ContainerImage>
                            </div>
                            <div>
                                <div className="promotion-detail padding-left">
                                    <h1 className="green-text">Step 3</h1>
                                    <h3 className="mb-3">Update Your Public Profile </h3>
                                    <p>
                                        Make sure you have enough information visible to potential buyers and sellers so that they feel
                                        comfortable doing business with you. Communicate with your buyer or seller to settle on details of
                                        the purchase. Once you come to an agreement, complete the purchase and wait to receive your item or
                                        payment.{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="py-8 justify-center justify-content-center grid grid-cols-1 md:grid-cols-2  animate__animated animate__fadeIn animate__faster">
                            <div className="flex justify-end">
                                <ContainerImage>
                                    <img className="w-full md:max-w-lg" src="/images/resources/step4.jpg" />
                                </ContainerImage>
                            </div>
                            <div>
                                <div className="promotion-detail padding-left">
                                    <h1 className="green-text">Step 4</h1>
                                    <h3 className="mb-3">Success!</h3>
                                    <p>
                                        For sellers, ensure that you&apos;ve packaged your item/s sufficiently for safe transport to
                                        minimize the risk of damage. Buyers, upon receiving your item(s) please ensure that the item is in
                                        good working order and condition upon receipt. If in doubt, photograph all phases of delivery and
                                        unwrapping as this may be necessary evidence in the unlikely event there is a dispute.
                                    </p>
                                    <p>Buyers enjoy your items! Seller enjoy your profits!</p>
                                    <p>
                                        We hope you enjoy the service. Please reach out with any suggestions{' '}
                                        <UnstyledButton
                                            onClick={handleOpenModal}
                                            customStyle={`
                                                text-decoration-line: underline;
                                                text-decoration-color: #47e6b6;
                                            `}
                                        >
                                            here:
                                        </UnstyledButton>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactModal contactModal={contactModal} setContactModal={setContactModal}></ContactModal>
            </MainLayout>
            {/* eslint-enable max-len */}
        </>
    );
}

const LinkUnderline = styled.a`
    text-decoration-line: underline;
    text-decoration-color: #47e6b6;
`;

const ContainerImage = styled.div`
    width: fit-content;
    height: fit-content;
    border: 2px solid #1f2123;
    border-radius: 5px;
`;
