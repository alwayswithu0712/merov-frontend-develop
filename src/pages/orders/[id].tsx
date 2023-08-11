import { getSession, Session } from '@auth0/nextjs-auth0';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import merovService from '../../services/merov';
import { Order } from '../../typings/order';
import OrderView from '../../ui/pages/Order/OrderView';
import MainLayout from '../../ui/layouts/MainLayout';
import { Permission } from '../../typings/permissions';
import withPagePermissionsRequired from '../../helpers/permissions/withPagePermissionsRequired';

const Page = (props: { initialOrder: Order }) => <OrderView {...props} />;

Page.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired(
    [Permission.Orders],
    async (context: GetServerSidePropsContext) => {
        const { req, res } = context;

        const session = (await getSession(req, res)) as Session;

        const { accessToken } = session;

        const id = context?.params?.id as string;

        try {
            const order = await merovService.secureApi(accessToken).getOrderById(id);

            return {
                props: {
                    initialOrder: order,
                },
            };
        } catch (error) {
            return { notFound: true };
        }
    },
);
