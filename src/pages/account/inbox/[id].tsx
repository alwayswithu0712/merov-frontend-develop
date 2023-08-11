import React from 'react';
import { GetServerSideProps } from 'next';
import Inbox from '../../../ui/pages/Account/Inbox';
import withPagePermissionsRequired from '../../../helpers/permissions/withPagePermissionsRequired';
import { Permission } from '../../../typings/permissions';

export default function Page() {
    return <Inbox />;
}

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired([Permission.Chats]);
