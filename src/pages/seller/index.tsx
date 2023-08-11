import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import Seller from '../../ui/pages/Seller';
import merovService from '../../services/merov';
import { Review } from '../../typings/order';
import { Account } from '../../typings/account';

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context: GetServerSidePropsContext) {
        const { req, res } = context;

        const session = await getSession(req, res);

        try {
            const [seller, sellerReviews] = await Promise.all([
                merovService.secureApi(session?.accessToken).getMyUser(),
                merovService.secureApi(session?.accessToken).getMyReviews(),
            ]);

            return {
                props: {
                    seller,
                    sellerReviews,
                },
            };
        } catch (error) {
            return { notFound: true };
        }
    },
});

function Page(props: { seller: Account; sellerReviews: Review[] }) {
    return <Seller {...props} />;
}

export default Page;
