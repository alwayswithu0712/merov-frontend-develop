import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ProductOptionsDropdown from '../ProductOptionsDropdown';
import { Product } from '../../../../typings/product';
import DeleteItemsModal from '../../modals/DeleteItemModal';
import Currency from '../../Currency';
import Carousel from '../../Carousel';
import Stars from '../../Stars';

interface Props {
    product: Product;
    onChangePrivacy?: (product: Product) => Promise<void>;
    isEditable?: boolean;
    showCondition?: boolean;
    showPrice?: boolean;
    showStars?: boolean;
    showDescription?: boolean;
    refreshProducts?: () => Promise<void>;
}

export default function ProductCard({
    product,
    isEditable,
    onChangePrivacy,
    showCondition,
    showPrice,
    showStars,
    showDescription,
    refreshProducts,
}: Props): JSX.Element {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showReviewText, setShowReviewText] = useState<boolean>(false);

    useEffect(() => {
        if (!showStars) return;
        function handleResize() {
            setShowReviewText(window.innerWidth < 767);
        }
        window.addEventListener('resize', handleResize);
        return () => showStars && window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Link href={`/products/${product.id}`} passHref>
            <a>
                <div className="product-card animate__animated animate__fadeIn animate__faster">
                    <div className="image mb-3">
                        {isEditable && (
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <ThreeDots>
                                    <ProductOptionsDropdown
                                        product={product}
                                        openDeleteModal={() => setShowModal(true)}
                                        onChangePrivacy={onChangePrivacy!}
                                    />
                                </ThreeDots>
                            </div>
                        )}
                        <Carousel images={product.images} imageLayout={'responsive'} width={350} height={350} />
                    </div>
                    {showCondition && <div className="condition w-full sm:w-max px-3">Condition: {product.condition}</div>}
                    <div className="title">{product.title}</div>
                    {showPrice && (
                        <div className="w-full">
                            <Currency price={product.price} currency={product.currency} showImage showPrice showConversion />
                        </div>
                    )}
                    {showStars && (
                        <div className="w-full flex h-fit m-auto mt-2">
                            <Stars rating={product.seller.rating} size={15} />
                            <div className="review">
                                {showReviewText ? `${product.seller.reviewCount} Reviews` : `(${product.seller.reviewCount})`}{' '}
                            </div>
                        </div>
                    )}
                    {showDescription && (
                        <div className="row description-row">
                            <p className="w-full description">{product.description}</p>
                        </div>
                    )}
                    {isEditable && (
                        <div className="w-full mt-3 flex flex-wrap justify-between gap-2">
                            {!product.approved && (
                                <StatusDiv isComplete={product.approved} className="px-2.5 py-0 whitespace-nowrap">
                                    In review
                                </StatusDiv>
                            )}
                            {product.activeOrdersCount > 0 && (
                                <StatusDiv isComplete={product.published} className="px-2.5 py-0 whitespace-nowrap">
                                    {product.activeOrdersCount === 1
                                        ? `${product.activeOrdersCount} Order`
                                        : `${product.activeOrdersCount} Orders`}
                                </StatusDiv>
                            )}
                            <Available>
                                Stock: <Stock>{product.stock}</Stock>
                            </Available>
                        </div>
                    )}
                    <DeleteItemsModal
                        stateModal={showModal}
                        setStateModal={setShowModal}
                        id={product?.id}
                        onDeleteCallback={refreshProducts}
                    />
                </div>
            </a>
        </Link>
    );
}

const ThreeDots = styled.div`
    position: absolute;
    z-index: 3;
    top: 30px;
    right: 30px;
`;

const StatusDiv = styled('button')(
    (props: { isComplete: boolean }) => `
    color: ${props.isComplete ? '#47e6b6' : '#ffc51c'};
    background: ${props.isComplete ? '#09261d' : '#262318'};
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    border-radius: 50px;
    text-align: center;
    width: fit-content;
    margin-right: 5px;

    @media (max-width: 1200px) {
        margin-bottom: 2px;
    }
    @media (max-width: 900px) {
        width: 130px;
        margin-bottom: 10px;
    }
    `,
);

const Available = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin: 0px;
    color: #dbdbdb;
    @media (max-width: 800px) {
        width: 80%;
    }
`;

const Stock = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #dbdbdb;
`;
