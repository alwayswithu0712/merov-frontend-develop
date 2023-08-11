import React from 'react';
import useSWR from 'swr';
import merovService from '../../../services/merov';
import ProductCard from '../cards/ProductCard';

interface Props {
    productId: string;
    className?: string;
}

export default function RelatedProducts({ productId, className }: Props): JSX.Element {
    const { data: relatedProducts } = useSWR(['/related', productId], () => merovService.api.getRelatedProducts(productId));

    return relatedProducts && relatedProducts.totalCount > 0 ? (
        <div className={className}>
            <h3 className="m-0 mt-4 mb-3 font-semibold text-base">Related products</h3>
            <div className="flex flex-wrap gap-8 md:gap-4">
                {relatedProducts.response.map((sp) => (
                    <div className="w-full sm:w-40 md:w-44" key={sp.id}>
                        <ProductCard product={sp} showPrice />
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <></>
    );
}
