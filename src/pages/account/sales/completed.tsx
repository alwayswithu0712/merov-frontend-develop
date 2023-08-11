import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';
import Orders from '../../../ui/pages/Account/Orders';
import AccountLayout from '../../../ui/layouts/AccountLayout';
import withPagePermissionsRequired from '../../../helpers/permissions/withPagePermissionsRequired';
import { Permission } from '../../../typings/permissions';

const Page: NextPageWithLayout = () => <Orders condition="seller" status="completed" />;

Page.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
};
export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired([Permission.Orders]);
