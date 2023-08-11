import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import React from 'react';
import merovService from '../../services/merov';
import { Category } from '../../typings/category';
import MainLayout from '../../ui/layouts/MainLayout';
import UploadProduct from '../../ui/pages/UploadProduct';
import { User } from '../../typings/user';
import { Permission } from '../../typings/permissions';
import withPagePermissionsRequired from '../../helpers/permissions/withPagePermissionsRequired';

interface Props {
    categories: Category[];
    merovUser: User;
}

const Page = ({ categories, merovUser }: Props) => (
    <MainLayout headTitle="List your Product" pageClass={'dashboard '}>
        <UploadProduct categories={categories} user={merovUser} />
    </MainLayout>
);

export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired(
    [Permission.Products],
    async (context: GetServerSidePropsContext) => {
        try {
            const { req, res } = context;

            const session = await getSession(req, res);
            const user = await merovService.secureApi(session?.accessToken).getMyUser();
            if (!user) {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/',
                    },
                };
            }

            const categories = await merovService.api.getCategories();

            return {
                props: {
                    categories: categories || [],
                    merovUser: user,
                },
            };
        } catch (error) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/',
                },
            };
        }
    },
);
