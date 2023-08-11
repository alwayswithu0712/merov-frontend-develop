import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import PhoneVerified from '../../ui/pages/PhoneVerified';

function Page({user}) {
    return <PhoneVerified user={user} success/>;
}

export default withPageAuthRequired(Page);
