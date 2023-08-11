import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';
import MainLayout from '../../ui/layouts/MainLayout';
import CreateBlog from '../../ui/pages/Blog/CreateBlog';

function Page() {
    return (
        <MainLayout headTitle="Post your blog" pageClass={'dashboard '}>
            <CreateBlog />
        </MainLayout>
    );
}

export default withPageAuthRequired(Page);
