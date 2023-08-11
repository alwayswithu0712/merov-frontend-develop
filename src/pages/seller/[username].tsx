import { GetServerSidePropsContext } from 'next';
import React from 'react';
import merovService from '../../services/merov';
import { Review } from '../../typings/order';
import { Account } from '../../typings/account';
import Seller from '../../ui/pages/Seller';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const username = context?.params?.username as string;

    try {
        const seller = await merovService.api.getAccountByName(username);
        const sellerReviews = await merovService.api.getReviews(seller.id);
        return {
            props: {
                seller,
                sellerReviews,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

function Page(props: { seller: Account; sellerReviews: Review[] }) {
    return <Seller {...props} />;
}

export default Page;
