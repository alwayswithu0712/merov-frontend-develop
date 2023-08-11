import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import merovService from '../../../services/merov';
import { Product } from '../../../typings/product';
import ProductsView from '../../../ui/pages/ProductView';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context?.params?.id as string;

    try {
        return {
            props: {
                product: await merovService.api.getProductById(id),
            },
        };
    } catch (error) {
        try {
            const { req, res } = context;
            const session = await getSession(req, res);

            return {
                props: {
                    product: await merovService.secureApi(session?.accessToken).getProductById(id),
                },
            };
        } catch (error) {
            return { notFound: true };
        }
    }
}

export default function Page(props: { product: Product }) {
    const { product } = props;

    return <ProductsView product={product} />;
}
