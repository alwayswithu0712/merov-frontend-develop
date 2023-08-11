import { getSession, Session } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import merovService from '../../../services/merov';
import { IBlog } from '../../../typings/blog';
import Blog from '../../../ui/pages/Blog/Blog';
import PageNotFound from '../../../ui/pages/PageNotFound';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        const { req, res } = context;

        const id = context?.params?.id as string;

        const session = (await getSession(req, res)) as Session;

        const { accessToken } = session;

        if (!id) {
            return { notFound: true };
        }

        const blog = await merovService.secureApi(accessToken).getBlogById(id);

        if (!blog) {
            return { notFound: true };
        }

        return {
            props: {
                blog,
            },
        };
    } catch (error) {
        return { notFound: true };
    }
};

export default function Page(props: { blog: IBlog }) {
    const { blog } = props;

    if (!blog) {
        return <PageNotFound />;
    }

    return <Blog blog={blog} />;
}
