import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import AccountLayout from '../../ui/layouts/AccountLayout';
import Settings from '../../ui/pages/Account/settings/Security';

const Page: NextPageWithLayout = () => <Settings />;

const AuthPage = withPageAuthRequired(Page) as any;

AuthPage.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
};

export default AuthPage;
