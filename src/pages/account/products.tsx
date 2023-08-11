import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import AccountLayout from '../../ui/layouts/AccountLayout';
import ProductsView from '../../ui/pages/Account/Products';
import withPagePermissionsRequired from '../../helpers/permissions/withPagePermissionsRequired';
import { Permission } from '../../typings/permissions';

const Page: NextPageWithLayout = () => <ProductsView />;

Page.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
};
export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired([Permission.Products]);