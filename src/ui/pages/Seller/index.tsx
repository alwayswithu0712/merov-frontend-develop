import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import MainLayout from '../../layouts/MainLayout';
import { Account } from '../../../typings/account';
import { Review } from '../../../typings/order';
import ProductCard from '../../components/cards/ProductCard';
import AccountAvatar, { VARIANT as PROFILE_VARIANT } from '../../components/AccountAvatar';
import merovService from '../../../services/merov';
import { PageQuery } from '../../../typings/pageQuery';
import Pagination from '../../components/Pagination';
import Stars from '../../components/Stars';

interface SellerProps {
    seller: Account;
    sellerReviews: Review[];
}

export default function Seller(props: SellerProps) {
    const [params, setParams] = useState<PageQuery>({
        take: 12,
        skip: 0,
        sort: 'created_desc',
    });

    const { seller, sellerReviews } = props;

    const { data: products } = useSWR(['products', seller.id, params], () =>
        merovService.api.getProducts({ hasStock: true, sellerId: seller.id, ...params }),
    );

    const [reviews, setReviews] = useState<Review[]>(sellerReviews?.slice(0, 3));
    const [reviewPage, setReviewPage] = useState<number>(0);
    const [limitReviews, setLimitReviews] = useState<number>(3);

    useEffect(() => {
        setLimitReviews(window.innerWidth <= 767 ? 1 : 3);
    }, []);

    useEffect(() => {
        setReviews(window.innerWidth <= 767 ? sellerReviews?.slice(0, 1) ?? [] : sellerReviews?.slice(0, 3) ?? []);
    }, [sellerReviews]);

    const handleChangeReviews = async (directionRight: boolean) => {
        if (directionRight) {
            if (sellerReviews.length > reviewPage * limitReviews + limitReviews) {
                setReviewPage(() => {
                    const newPage = reviewPage + 1;
                    setReviews(sellerReviews?.slice(newPage * limitReviews, newPage * limitReviews + limitReviews) ?? reviews);
                    return newPage;
                });
            }
        } else if (reviewPage * limitReviews > 0) {
            setReviewPage(() => {
                const newPage = reviewPage - 1;
                setReviews(sellerReviews?.slice(newPage * limitReviews, newPage * limitReviews + limitReviews) ?? reviews);
                return newPage;
            });
        }
    };

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 767) {
                setLimitReviews(() => {
                    setReviews([reviews[0]]);
                    return 1;
                });
            } else {
                setLimitReviews(() => {
                    const newLimitReviews = 3;
                    setReviews(sellerReviews?.slice(reviewPage, reviewPage * newLimitReviews + newLimitReviews) ?? reviews);
                    return newLimitReviews;
                });
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [sellerReviews, reviewPage, reviews]);

    const onPaginationChange = async (page: number) => {
        setParams({
            ...params,
            skip: page === 1 ? 0 : (page - 1) * params.take,
        });
    };

    return (
        <MainLayout headTitle="Seller" pageClass={'dashboard '}>
            <div className="container seller">
                <h3>Dashboard</h3>
                <div className=" margin-bottom-dashboard col-12">
                    <div className="border-green col-12"></div>
                </div>

                <div className="row seller-data ">
                    <div className="mb-8">
                        <AccountAvatar
                            name={seller.name}
                            avatarUrl={seller.avatarUrl}
                            rating={seller.rating}
                            variant={PROFILE_VARIANT.VERTICAL}
                            href={`/seller/${seller.name}`}
                            showName
                            showStars
                            showReviews
                            showJoined
                            imageSize={160}
                            animatePhoto
                        />
                    </div>

                    <div className="col-12">
                        <div className="row seller-review-row">
                            {sellerReviews && sellerReviews.length > 0 && (
                                <div className="d-flex">
                                    <div
                                        onClick={() => handleChangeReviews(false)}
                                        className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-2 seller-arrow"
                                    >
                                        <i className="ri-arrow-left-s-line pointer"></i>
                                    </div>
                                    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-8">
                                        <div className="row">
                                            {' '}
                                            {reviews.map((review: any) => (
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " key={review.id}>
                                                    <div className="reviews-card">
                                                        <div className="img-avatar-review">
                                                            <img src={review.reviewerAvatarUrl} className="header-avatar"></img>
                                                        </div>
                                                        <div
                                                            style={{ height: '15%' }}
                                                            className="seller-data-text seller-cards-reviews-stars"
                                                        >
                                                            <Stars rating={review.rating} size={15} />
                                                        </div>
                                                        <div style={{ height: '65%' }} className="seller-review">
                                                            {`"`}
                                                            {review.review}
                                                            {`"`}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => handleChangeReviews(true)}
                                        className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-2 seller-arrow seller-arrow-right"
                                    >
                                        <i className="ri-arrow-right-s-line pointer"></i>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <h4 className="col-12 seller-margin-titles">Products</h4>
                    <div className=" margin-bottom col-12">
                        <div className="border-green col-12"></div>
                    </div>
                </div>
                <div className="row ">
                    <div className="justify-content-center grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {products?.response?.map((p) => (
                            <ProductCard key={p.id} product={p} showPrice showCondition />
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    {products && products.totalCount > 0 && (
                        <Pagination
                            onPaginationChange={onPaginationChange}
                            pageCount={products.pageCount}
                            currentPage={products.currentPage}
                            pageSize={products.pageSize}
                            onPageSizeChange={(e) => {
                                setParams({ ...params, skip: 0, take: e });
                            }}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
