import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import MerovLogo from '../../../assets/icons/MerovLogo';
import Button, { VARIANT, SIZE } from '../../components/buttons/Button';
import { Auth0User } from '../../../typings/user';
import { useMerovUser } from '../../../hooks/useMerovUser';

type Props = {
    user?: Auth0User;
    success?: boolean;
};

const PhoneVerified = ({ user, success }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const { update } = useMerovUser();

    useEffect(() => {
        const updateUser = async () => {
            setDisabled(true);
            await update();
            setDisabled(false);
        };
        updateUser();
    }, [user]);

    const handleRedirect = async (route: string): Promise<void> => {
        if (loading) return;
        setDisabled(true);
        setLoading(true);
        await update();
        Router.replace(route);
    };
    return (
        <MainLayout headTitle="SMS Verification" pageClass={'dashboard'}>
            <section className="max-w-lg px-3 mt-14 mb-52 mx-auto">
                <div className="flex justify-center">
                    <MerovLogo color={'#47e6b6'} />
                </div>
                <span className="flex text-base font-normal text-center mb-8 w-4/5 m-auto mt-2">
                    {success
                        ? 'Your phone has been verified, now you can continue using Merov.'
                        : 'The verification of your phone has failed.'}
                </span>
                {!!user && user?.sessionId && (
                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-12">
                        <Button
                            loading={loading}
                            variant={VARIANT.SECONDARY}
                            size={SIZE.SMALL}
                            disabled={disabled}
                            className="w-full max-w-none sm:w-44"
                            onClick={() => handleRedirect('/browse')}
                        >
                            MARKETPLACE
                        </Button>
                        <Button
                            loading={loading}
                            variant={VARIANT.PRIMARY}
                            size={SIZE.SMALL}
                            disabled={disabled}
                            className="w-full max-w-none sm:w-44"
                            onClick={() => handleRedirect('/account/profile')}
                        >
                            MY PROFILE
                        </Button>
                    </div>
                )}
            </section>
        </MainLayout>
    );
};

export default PhoneVerified;
