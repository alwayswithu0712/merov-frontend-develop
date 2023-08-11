import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import AccountLayout from '../../ui/layouts/AccountLayout';
import Notifications from '../../ui/pages/Account/Notifications';

const Page: NextPageWithLayout = () => <Notifications />;

const AuthPage = withPageAuthRequired(Page) as any;

AuthPage.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
};

export default AuthPage;
