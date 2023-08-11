import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import PageTitle from '../../layouts/PageTitle';
import MainLayout from '../../layouts/MainLayout';
import SortDropdown from './SortDropdown';
import CategoryDropdown from './CategoryDropdown';
import { Category, Subcategory } from '../../../typings/category';
import merovService from '../../../services/merov';
import { ProductFilters } from '../../../typings/filters';
import Pagination from '../../components/Pagination';
import { PageQuery } from '../../../typings/pageQuery';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';
import ProductCard from '../../components/cards/ProductCard';

interface Props {
    categories: Category[];
}

export default function Store(props: Props) {
    const [params, setParams] = useSearchParamsState<PageQuery & ProductFilters>({
        take: 12,
        skip: 0,
        sort: 'price_asc',
    });

    const [categories, setCategories] = useState<any[]>(props.categories);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await merovService.api.getCategories();
            const options = [
                {
                    name: 'All Categories',
                    id: 'all',
                    subcategories: [],
                },
                ...categories,
            ];

            setCategories(options);
        };
        if (props.categories.length === 0) {
            fetchCategories();
        }
    }, [props.categories]);

    const { data: products } = useSWR(['products', params], () => merovService.api.getProducts({ hasStock: true, ...params }));

    const onPaginationChange = async (page: number) => {
        setParams({
            ...params,
            skip: page === 1 ? 0 : (page - 1) * params.take,
        });
    };

    const onFilterChange = (filter: ProductFilters) => {
        setParams({ ...params, skip: 0, ...filter });
    };

    return (
        <MainLayout headTitle="Store" pageClass={'dashboard '}>
            <div className="container">
                <div className="row store" style={{ justifyContent: 'flex-end' }}>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <PageTitle textAlign="page-title-txt-align" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 store-categories-dropdown">
                        <CategoryDropdown categories={categories} handleChange={onFilterChange} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 store-sort ">
                        <SortDropdown handleChange={(sort) => setParams({ ...params, skip: 0, sort })} />
                    </div>
                </div>
                <div className="row padding-bottom">
                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 store-categories-side">
                        {categories.map((category: Category) => (
                            <div className="store-categories" key={category.name}>
                                {category.name === 'All Categories' ? (
                                    <a
                                        className={`dropmenuAllCategories ${
                                            params.categoryIds === category.id ? 'category-text-decor' : ''
                                        }`}
                                        onClick={() => onFilterChange({ categoryIds: undefined, subcategoryIds: undefined })}
                                    >
                                        {category.name}
                                    </a>
                                ) : (
                                    <a
                                        className={`dropmenuAllCategories ${
                                            params.categoryIds === category.id ? 'category-text-decor' : ''
                                        }`}
                                        onClick={() => onFilterChange({ categoryIds: category.id, subcategoryIds: undefined })}
                                    >
                                        {category.name}
                                    </a>
                                )}
                                {category.subcategories.map((subcategory: Subcategory) => (
                                    <a
                                        onClick={() => onFilterChange({ categoryIds: undefined, subcategoryIds: subcategory.id })}
                                        key={subcategory.id}
                                        className={`store-subcategories ${
                                            params.subcategoryIds === subcategory.id ? 'category-text-decor' : ''
                                        }`}
                                    >
                                        {subcategory.name}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9 ">
                        {products && products.totalCount > 0 && (
                            <>
                                <div className="row">
                                    <div className="justify-content-center grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                        {products.response?.map((p) => (
                                            <ProductCard key={p.id} product={p} showCondition showPrice />
                                        ))}
                                    </div>
                                </div>
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
                            </>
                        )}
                        {products && products.totalCount === 0 && (
                            <NoProductsContainer>
                                <NoProducts>No products found</NoProducts>
                            </NoProductsContainer>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

const NoProductsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25%;
`;

const NoProducts = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    margin: 10px 0px;
    display: flex;
    align-items: center;
`;
