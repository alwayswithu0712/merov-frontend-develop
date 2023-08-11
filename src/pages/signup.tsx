import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { getSession, Session } from '@auth0/nextjs-auth0';
import Signup from '../ui/pages/Signup';

export default function Page() {
    return <Signup />;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    try {
        const session = (await getSession(req, res)) as Session;
        if (session) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/',
                },
            };
        }
        return {
            props: {},
        };
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }
};
