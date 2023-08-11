import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import Account from '../../ui/pages/Account/Profile/Account';
import AccountLayout from '../../ui/layouts/AccountLayout';

const Page: NextPageWithLayout = () => <Account view="profile" />;

const AuthPage = withPageAuthRequired(Page) as any;

AuthPage.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
};

export default AuthPage;
