import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { notification, Select } from 'antd';
import useSWR from 'swr';
import ProductListItem from './ProductListItem';
import COLORS from '../../../foundation/colors';
import Pagination from '../../../components/Pagination';
import { Product } from '../../../../typings/product';
import { PaginatedResponse } from '../../../../typings/paginatedResponse';
import merovService from '../../../../services/merov';
import CardLogo from '../../../../assets/icons/CardLogo';
import ListLogo from '../../../../assets/icons/ListLogo';
import NoItems from '../../../components/NoItems';
import { PageQuery } from '../../../../typings/pageQuery';
import ProductCard from '../../../components/cards/ProductCard';

const ProductsView = () => {
    const [cardView, setCardView] = useState<boolean>(true);

    const [params, setParams] = useState<PageQuery>({
        take: 12,
        skip: 0,
        sort: 'created_desc',
    });

    const fetchProducts = async () => merovService.secureApi().getMyProducts({ ...params });

    const { data: products, mutate: update } = useSWR<PaginatedResponse<Product>>(['me/products', params], fetchProducts);

    const onPaginationChange = async (page: number) => {
        setParams({
            ...params,
            skip: page === 1 ? 0 : (page - 1) * params.take,
        });
    };

    const handlePrivacy = async (product: Product) => {
        try {
            await merovService.secureApi().updateProduct(product.id, { published: !product.published });
            update();
        } catch (error) {
            notification.open({
                message: 'Error',
                description: 'Error uploading product',
                className: 'error',
            });
        }
    };

    if (!products) return null;

    if (!products?.totalCount) {
        return (
            <InnerDivNoProds>
                <Title style={{ marginBottom: '20px' }}>My Products</Title>
                <RightDivBorder>
                    <NoItems title={'No products yet'} description={'Here we will display your products'}></NoItems>
                    <Link href="/products/create" passHref>
                        <a>
                            <Addproduct>Add a new product</Addproduct>
                        </a>
                    </Link>
                </RightDivBorder>
            </InnerDivNoProds>
        );
    }

    return (
        <InnerDiv>
            <TopDiv>
                <Title>My Products</Title>
                <FiltersDiv>
                    <TakeDiv>
                        <FiltersTitle>Sort by: </FiltersTitle>
                        <Select
                            style={{ width: '180px', height: '26px !important' }}
                            className="select_custom_pagination"
                            value={params.sort}
                            onChange={(sort) => setParams({ ...params, skip: 0, sort })}
                        >
                            <Select.Option value={'name_asc'}>Name: (A-Z)</Select.Option>
                            <Select.Option value={'name_desc'}> Name: (Z-A)</Select.Option>
                            <Select.Option value={'created_asc'}>Newest</Select.Option>
                            <Select.Option value={'created_desc'}> Oldest</Select.Option>
                        </Select>
                    </TakeDiv>
                    <TakeDiv>
                        <FiltersTitle>Display: </FiltersTitle>
                        {cardView ? (
                            <OrdersLogoDiv>
                                <Circlediv>
                                    <CardLogo color={'#0B0C0D'} width={24} height={24} />
                                </Circlediv>
                                <div style={{ cursor: 'pointer' }} onClick={() => setCardView(!cardView)}>
                                    <ListLogo width={24} height={24} />
                                </div>
                            </OrdersLogoDiv>
                        ) : (
                            <OrdersLogoDiv>
                                <div style={{ cursor: 'pointer' }} onClick={() => setCardView(!cardView)}>
                                    <CardLogo width={24} height={24} color={undefined} />
                                </div>
                                <Circlediv>
                                    <ListLogo color={'#0B0C0D'} width={24} height={24} />
                                </Circlediv>
                            </OrdersLogoDiv>
                        )}
                    </TakeDiv>
                </FiltersDiv>
            </TopDiv>
            {!cardView ? (
                <ColumnItems>
                    {products.response?.map((p) => (
                        <ProductListItem key={p.id} product={p} isEditable={true} onChangePrivacy={handlePrivacy} />
                    ))}
                </ColumnItems>
            ) : (
                <div className="justify-content-center grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full">
                    {products.response?.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onChangePrivacy={handlePrivacy}
                            refreshProducts={update as () => Promise<void>}
                            isEditable
                            showCondition
                            showPrice
                        />
                    ))}
                </div>
            )}
            <div className="mt-8">
                <Pagination
                    onPaginationChange={onPaginationChange}
                    pageCount={products.pageCount}
                    currentPage={products.currentPage}
                    pageSize={products.pageSize}
                    onPageSizeChange={(e) => {
                        setParams({ ...params, skip: 0, take: e });
                    }}
                />
            </div>
        </InnerDiv>
    );
};
export default ProductsView;

const InnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;
const InnerDivNoProds = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: start;
`;
const TopDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: -30px;
    @media (max-width: 1000px) {
        margin-top: 0px;
        align-items: start;
        flex-direction: column;
    }
`;

const RightDivBorder = styled.div`
    display: flex;
    padding: 3% 2%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70%;
    border: 2px solid #1f2123;
    border-radius: 5px;
`;
const ColumnItems = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Title = styled.h3`
    font-family: 'Poppins';
    min-width: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    margin: 0px;
`;

const Addproduct = styled.a`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin: 0px;
    margin-bottom: 20px;
    color: ${COLORS.GREEN};
`;
const FiltersDiv = styled.div`
    display: flex;
    flex-flow: wrap;
    width: 100%;
    justify-content: end;
    align-items: center;

    @media (max-width: 1000px) {
        justify-content: start;
    }
`;
const TakeDiv = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
    @media (max-width: 1000px) {
        margin-left: 0px;
    }
`;
const OrdersLogoDiv = styled.div`
    display: flex;
    width: 100px;
    align-items: center;
    justify-content: space-evenly;
    height: 40px;
    background: #1f2123;
    border-radius: 12px;
`;
const Circlediv = styled.div`
    background: #dbdbdb;
    border-radius: 50px;
    padding: 2px;
`;
const FiltersTitle = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin: 0px;
    margin-right: 10px;
`;
