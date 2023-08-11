import { getSession } from '@auth0/nextjs-auth0';
import React from 'react';
import merovService from '../services/merov';
import Verify from '../ui/pages/Verify';

export const getServerSideProps = async (context) => {
    const { req, res } = context;

    const session = await getSession(req, res);

    // if no session then show verify page
    if (!session) {
        return { props: {} };
    }
    // if user is verified then redirect to home page
    if (session?.user.email_verified) {
        try {
            const merovUser = await merovService.secureApi(session?.accessToken).getMyUser();
            if (!merovUser.isPhoneVerified) {
                return {
                    redirect: {
                        permanent: false,
                        destination: context.query.redirect ? context.query.redirect : '/profile/complete',
                    },
                };
            }
        } catch (error) {
            console.error('There is no user in merov database');
            return {
                redirect: {
                    permanent: false,
                    destination: '/api/auth/logout?returnTo=/',
                },
            };
        }
        return {
            redirect: {
                permanent: false,
                destination: context.query.redirect ? context.query.redirect : '/',
            },
        };
    }
    // if user is not verified then logout and redirect to verify page
    return {
        redirect: {
            permanent: false,
            destination: '/api/auth/logout?returnTo=verify',
        },
    };
};

export default function VerifyEmail() {
    return <Verify />;
}
