import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PageHead from '../../layouts/PageHead';
import COLORS from '../../foundation/colors';
import Input from '../../components/inputs/Input';
import Button, { SIZE, VARIANT as BTN_VARIANT } from '../../components/buttons/Button';
import merovService from '../../../services/merov';
import Logo from '../../../assets/images/Logo';
import StringValidator from '../../../helpers/validators/StringValidator';

const titleData = {
    title: 'A Multi-Currency Marketplace',
    subTitle: 'Buy & Sell anything with the confidence of transaction protection.',
};

const footerText = `We envision a future where all currencies, digital and fiat, 
are widely accepted as a form of payment and are used in everyday transactions to buy and 
sell anything with the confidence of transaction protection — from laptops to skyscrapers.`;

export default function HomeSubscription() {
    const [becameBetaTester, setBecameBetaTester] = useState<boolean>(false);
    const [getRegularUpdates, setGetRegularUpdates] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [email, setEmail] = useState<string>();
    const { EmailValidator } = StringValidator();

    useEffect(() => {
        if (!becameBetaTester && !getRegularUpdates) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [becameBetaTester, getRegularUpdates]);

    const handleCheckRegularUpdates = () => {
        setGetRegularUpdates((prevState) => !prevState);
    };

    const handleChecBecomeBetaTester = () => {
        setBecameBetaTester((prevState) => !prevState);
    };

    async function handleSubscribe() {
        setIsLoading(true);
        try {
            await EmailValidator(email, 'email');
            try {
                await merovService.api.postEmail({ email, updates: getRegularUpdates, betaTester: becameBetaTester });
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
    return (
        <>
            <PageHead headTitle={'Home'} />
            <div>
                <header className="z-10 py-1 flex relative justify-center bg-transparent ">
                    <div className="flex ">
                        <Logo width={'60'} height={'60'} />
                    </div>
                </header>

                <div className=" flex justify-center relative">
                    <div className="bg-center bg-[url('/images/Merov-bg-home.svg')] xl:border-neutral-500 border-solid  2xl:border-t-[2px]  2xl:border-b-[2px] absolute h-[540px] z-10  bg-no-repeat bg-cover w-full animate__animated animate__fadeIn animate__faster"></div>
                </div>

                <div className="flex justify-center w-full">
                    <div className=" bg-[url('/images/Merov-logo-home.svg')] mt-8 sm:mt-12 md:mt-[40px] bg-no-repeat h-[500px] md:h-[450px] w-[350px] md:w-[450px]  z-20 animate__animated animate__fadeIn animate__faster"></div>
                </div>
                <div className="flex justify-center">
                    <div className="pt-[450px] sm:pt-[450px] md:pt-[490px] mb-12 lg:mb-11 top-0 absolute z-20">
                        <div className="flex justify-center text-center">
                            <h3 className="font-medium text-3xl sm:text-4xl lg:text-5xl mb-2.5">{titleData.title}</h3>
                        </div>
                        <div className="flex justify-center text-center">
                            <h5 className="font-light text-lg md:text-[25px]">{titleData.subTitle}</h5>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className=" ">
                        <div className="left-0 flex w-full title-img-background"></div>
                        <div className="mt-24 justify-center text-2xl font-normal px-2 md:px-10">
                            <div className="flex justify-center">
                                <div className="w-full sm:w-9/12 xl:w-8/12 font-medium flex text-center justify-center z-10">
                                    {`  Our marketplace is getting restructured to offer you the best possible experience, service and support! Sign
                                up below for regular updates on our product features, industry news, or if you'd like to be a beta tester.`}
                                </div>
                            </div>
                            <div className="flex justify-center mt-20 ">
                                <div className="w-full sm:w-8/12  flex text-center justify-center z-10">Be Well,</div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full sm:w-8/12  flex text-center justify-center z-10">The Merov Marketplace Team</div>
                            </div>
                            <div className="flex justify-center mt-10">
                                <i className={``}></i>
                            </div>
                            <div className="flex justify-center mt-10 text-xl">
                                <div>
                                    <div className="flex h-5 items-center">
                                        <CheckBox
                                            id="comments"
                                            aria-describedby="comments-description"
                                            name="comments"
                                            type="checkbox"
                                            onChange={handleCheckRegularUpdates}
                                        />
                                        <div className="ml-3 ">
                                            <label htmlFor="comments" className=" ">
                                                Get Regular Updates
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex h-5 items-center mt-5">
                                        <CheckBox
                                            id="comments"
                                            aria-describedby="comments-description"
                                            name="comments"
                                            type="checkbox"
                                            onChange={handleChecBecomeBetaTester}
                                            style={{ background: !becameBetaTester ? 'transparent' : 'blue' }}
                                        />
                                        <div className="ml-3">
                                            <label htmlFor="comments" className="">
                                                Become a Beta Tester
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid sm:flex justify-center mt-10 items-center">
                                <div className="sm:mr-2">
                                    <Input
                                        onChange={(e: any) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="Enter your email address"
                                        style={{ fontSize: '14px' }}
                                        className="py-2 px-3.5 w-72"
                                    />
                                </div>
                                <div className="flex mt-4 sm:mt-0 h-full">
                                    <Button
                                        disabled={isDisabled}
                                        loading={isLoading}
                                        variant={BTN_VARIANT.PRIMARY}
                                        size={SIZE.MEDIUM}
                                        onClick={handleSubscribe}
                                        className={'w-full h-full sm:w-auto'}
                                    >
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                            <FooterDiv>
                                <div className="flex justify-center">
                                    <div className={`max-w-screen-xl text-sm mt-10 `}>
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
                            </FooterDiv>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const CheckBox = styled.input`
    accent-color: ${COLORS.GREEN};
    width: 23px;
    height: 23px;
    background-color: transparent;
`;

const FooterDiv = styled.div`
    background-color: ${COLORS.LIGHTDARK};
    width: 100%;
    padding: 0 40px 0 40px;
    margin-top: 240px;
    @media (max-width: 900px) {
        padding: 0 8px 0 8px;
    }
`;
