import React from 'react';
import { GetStaticProps } from 'next';
import merovService from '../services/merov';
import { Category } from '../typings/category';
import Store from '../ui/pages/Store';

interface Props {
    categories: Category[];
}

export default function Page({ categories }: Props) {
    return <Store categories={categories} />;
}

export const getStaticProps: GetStaticProps = async () => {
    const categoriesResponse = await merovService.api.getCategories();

    if (!categoriesResponse) {
        return {
            props: {
                categories: [],
            },
            revalidate: 43200,
        };
    }

    const categories = [
        {
            name: 'All Categories',
            id: 'all',
            subcategories: [],
        },
        ...categoriesResponse,
    ];

    return {
        props: {
            categories,
        },
        revalidate: 86400,
    };
};
