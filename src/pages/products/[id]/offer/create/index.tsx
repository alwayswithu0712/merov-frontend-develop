import { getSession, Session } from '@auth0/nextjs-auth0';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import withPagePermissionsRequired from '../../../../../helpers/permissions/withPagePermissionsRequired';
import merovService from '../../../../../services/merov';
import { Permission } from '../../../../../typings/permissions';
import { Product } from '../../../../../typings/product';
import { User } from '../../../../../typings/user';
import CreateOffer from '../../../../../ui/pages/CreateOffer';
import PageNotFound from '../../../../../ui/pages/PageNotFound';

function Page(props: { product: Product; merovUser: User }) {
    const { product, merovUser } = props;
    if (!product || merovUser.accountId !== product.seller.id) {
        return <PageNotFound />;
    }

    return <CreateOffer product={product} />;
}

export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired(
    [Permission.Offers],
    async (context: GetServerSidePropsContext) => {
        const id = context?.params?.id as string;

        const { req, res } = context;

        const session = (await getSession(req, res)) as Session;

        const { accessToken } = session;

        const user = await merovService.secureApi(session?.accessToken).getMyUser();
        if (!user) {
            return { notFound: true };
        }

        try {
            const product = await merovService.secureApi(accessToken).getProductById(id);
            return {
                props: {
                    product,
                    merovUser: user,
                },
            };
        } catch (error) {
            return { notFound: true };
        }
    },
);
