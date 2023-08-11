import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';
import Offers from '../../../ui/pages/Account/Offers';
import { NextPageWithLayout } from '../../_app';
import AccountLayout from '../../../ui/layouts/AccountLayout';
import withPagePermissionsRequired from '../../../helpers/permissions/withPagePermissionsRequired';
import { Permission } from '../../../typings/permissions';

const Page: NextPageWithLayout = () => <Offers status="active" />;

Page.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
};
export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired([Permission.Offers]);