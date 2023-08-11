import React from 'react';
import merovService from '../services/merov';
import { Product } from '../typings/product';
import HomeSubscription from '../ui/pages/HomeSubscription';
import Home from '../ui/pages/Home';
import { isProduction } from '../helpers/enviroments';

export async function getServerSideProps() {
    try {
        const products = (await merovService.api.getFeaturedProducts()).response;
        return {
            props: {
                products,
            },
        };
    } catch (error) {
        return {
            props: {
                products: [],
            },
        };
    }
}

function Page(props: { products: Product[] }) {
    const { products } = props;

    if (isProduction()) {
        return <HomeSubscription />;
    }

    return <Home products={products} />;
}

export default Page;
