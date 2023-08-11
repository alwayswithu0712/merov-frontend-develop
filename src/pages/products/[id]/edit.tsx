import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import merovService from '../../../services/merov';
import { Product } from '../../../typings/product';
import { Category } from '../../../typings/category';
import ProductForm from '../../../ui/pages/UploadProduct';
import AccountLayout from '../../../ui/layouts/AccountLayout';
import { User } from '../../../typings/user';
import { Permission } from '../../../typings/permissions';
import withPagePermissionsRequired from '../../../helpers/permissions/withPagePermissionsRequired';

interface Props {
    item: Product;
    categories: Category[];
    merovUser: User;
}

const Page = (props: Props) => <ProductForm item={props.item} categories={props.categories} user={props.merovUser} />;

Page.getLayout = function getLayout(page: ReactElement) {
    return <AccountLayout>{page}</AccountLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = withPagePermissionsRequired(
    [Permission.Products],
    async (context: GetServerSidePropsContext) => {
        try {
            const { req, res } = context;
            const session = await getSession(req, res);

            const user = await merovService.secureApi(session?.accessToken).getMyUser();
            if (!user) {
                return { notFound: true };
            }

            const id = context.query.id as string;
            const categories = await merovService.api.getCategories();

            return {
                props: {
                    item: await merovService.secureApi(session?.accessToken).getProductById(id),
                    categories: categories || [],
                    merovUser: user,
                },
            };
        } catch (error) {
            return { notFound: true };
        }
    },
);
