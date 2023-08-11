import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';
import Cart from '../ui/pages/Cart';

function Page() {
    return <Cart />;
}

export default withPageAuthRequired(Page);
