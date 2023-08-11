import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';

import merovService from '../../../services/merov';
import { STATUS } from '../../../typings/user';
import MainLayout from '../../../ui/layouts/MainLayout';
import IdentityVerificationView from '../../../ui/pages/IdentityVerificationView/IdentityVerificationView';

function Page({ addresses, merovUser }) {
    return (
        <MainLayout headTitle="Identity Verification" pageClass={'dashboard'}>
            <IdentityVerificationView user={merovUser} addresses={addresses} />
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context: GetServerSidePropsContext) {
        try {
            const { req, res } = context;

            const session = await getSession(req, res);
            const user = await merovService.secureApi(session?.accessToken).getMyUser();
            if (!user) {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/',
                    },
                };
            }
            if (user && (user.idVerificationStatus === STATUS.Full || user.idVerificationStatus === STATUS.Blocked)) {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/account/profile',
                    },
                };
            }
            // const addresses = await merovService.secureApi(session?.accessToken).getAddresses();
            return {
                // props: { addresses: addresses || [], merovUser: user }
                redirect: {
                    permanent: false,
                    destination: '/account/profile',
                },
            };
        } catch (error) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/account/profile',
                },
            };
        }
    },
});

export default Page;
