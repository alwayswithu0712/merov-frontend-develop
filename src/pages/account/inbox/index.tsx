import { GetServerSideProps } from 'next';
import React from 'react';
import withPagePermissionsRequired from '../../../helpers/permissions/withPagePermissionsRequired';
import { Permission } from '../../../typings/permissions';
import Inbox from '../../../ui/pages/Account/Inbox';

export default function Page() {
    return <Inbox />;
}

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired([Permission.Chats]);
