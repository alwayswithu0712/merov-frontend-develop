import { getSession } from '@auth0/nextjs-auth0';
import React, { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import AccountLayout from '../../ui/layouts/AccountLayout';
import Members from '../../ui/pages/Account/Members';

import { Auth0User, User } from '../../typings/user';
import merovService from '../../services/merov';
import withPagePermissionsRequired from '../../helpers/permissions/withPagePermissionsRequired';

const Page = (props: { members: User[]; user: Auth0User }) => <Members members={props.members} user={props.user} />;

Page.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired([], async (context: GetServerSidePropsContext) => {
    try {
        const { req, res } = context;
        const session = await getSession(req, res);

        const members = await merovService.secureApi(session?.accessToken).getMembers();
        return {
            props: {
                members,
            },
        };
    } catch (error) {
        return { notFound: true };
    }
});
