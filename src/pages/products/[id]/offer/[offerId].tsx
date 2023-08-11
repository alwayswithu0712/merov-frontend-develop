import { getSession, Session } from '@auth0/nextjs-auth0';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import withPagePermissionsRequired from '../../../../helpers/permissions/withPagePermissionsRequired';
import merovService from '../../../../services/merov';
import { Offer } from '../../../../typings/offer';
import { Permission } from '../../../../typings/permissions';
import { User } from '../../../../typings/user';
import PageNotFound from '../../../../ui/pages/PageNotFound';
import ShowOffer from '../../../../ui/pages/ShowOffer/ShowOffer';

function Page(props: { offer: Offer; merovUser: User }) {
    const { offer, merovUser } = props;

    if (!offer || merovUser.accountId !== offer.seller.id) {
        return <PageNotFound />;
    }

    return <ShowOffer offer={offer} />;
}

export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired(
    [Permission.Offers],
    async (context: GetServerSidePropsContext) => {
        const id = context?.params?.offerId as string;

        const { req, res } = context;

        const session = (await getSession(req, res)) as Session;

        const { accessToken } = session;

        const user = await merovService.secureApi(accessToken).getMyUser();
        if (!user) {
            return { notFound: true };
        }

        try {
            const offer = await merovService.api.getOfferById(id);

            return {
                props: {
                    offer,
                    merovUser: user,
                },
            };
        } catch (error) {
            return { notFound: true };
        }
    },
);
