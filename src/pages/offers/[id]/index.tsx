import { getSession, Session } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from 'next';

import React from 'react';
import merovService from '../../../services/merov';
import { User } from '../../../typings/user';
import { Visibility } from '../../../typings/visibility';
import PageNotFound from '../../../ui/pages/PageNotFound';
import OfferView from '../../../ui/pages/OfferView';
import { Offer } from '../../../typings/offer';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context;

    try {
        const id = context?.params?.id as string;

        const offer = await merovService.api.getOfferById(id);

        const session = (await getSession(req, res)) as Session;

        const { accessToken } = session;

        if (!session) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/signup?r=${offer.seller.name}&redirect=${offer.url}`,
                },
            };
        }

        const user = await merovService.secureApi(accessToken).getMyUser();

        return {
            props: {
                offer,
                user: user || null,
            },
        };
    } catch (error) {
        return { notFound: true };
    }
};

export default function Page(props: { offer: Offer; user: User }) {
    const { offer, user } = props;

    if (offer?.status === 'Closed') {
        return <PageNotFound />;
    }

    if (
        offer?.visibility === Visibility.Private &&
        user?.account.name &&
        offer?.sharedWith !== user?.account.name &&
        user?.account.name &&
        user?.account.name !== offer?.seller.name
    ) {
        return <PageNotFound />;
    }

    return <OfferView offer={offer} user={user} />;
}
