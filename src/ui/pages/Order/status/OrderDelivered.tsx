import React, { useContext, useState } from 'react';
import { notification } from 'antd';
import Router from 'next/router';
import { Order, OrderStatus, Review } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { OrderContext } from '../../../../context/OrderContext';
import merovService from '../../../../services/merov';
import DisputeOrderModal from '../modals/DisputeOrderModal';
import RateModal from '../modals/RateModal';
import FullStarLogo from '../../../../assets/icons/FullStarLogo';
import COLORS from '../../../foundation/colors';
import { createTable } from '../helper/table';
import { handleChatClick } from '../helper/handleChat';

export default function OrderShipped({ order, isSeller }: { order: Order; isSeller: boolean }) {
    const [isSubmitReviewLoading, setIsSubmitReviewLoading] = useState<boolean>(false);
    const [isDisputeLoading, setIsDisputeLoading] = useState<boolean>(false);
    const [isDisputeModalOpen, setIsDisputeModalOpen] = useState<boolean>(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
    const [isFocusButton, setIsFocusButton] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const setOrder = useContext(OrderContext);

    const handleSubmitReview = async (values: Review) => {
        if (disabled) return;
        setIsSubmitReviewLoading(true);
        setDisabled(true);

        try {
            const response = await merovService.secureApi().postReview(values, order.id);
            setOrder({
                ...order,
                reviews: [...order.reviews, response],
            });
        } catch (error) {
            notification.open({
                message: 'Error',
                description: 'Error submiting review',
                duration: 2,
                className: 'error',
            });
        } finally {
            setIsSubmitReviewLoading(false);
            setDisabled(false);
            setIsReviewModalOpen(false);
        }
    };

    const onDisputeButtonClick = async (disputeReason: string) => {
        setIsDisputeLoading(true);
        setDisabled(true);
        try {
            const updatedOrder = await merovService.secureApi().updateOrder(order.id, {
                status: OrderStatus.Disputed,
                disputeReason,
            });
            setOrder(updatedOrder);
        } catch (error) {
            notification.open({
                message: 'Error',
                description: 'Error disputing the order',
                duration: 2,
                className: 'error',
            });
        } finally {
            setDisabled(false);
            setIsDisputeLoading(false);
            setIsDisputeModalOpen(false);
        }
    };

    const userAlreadyRated = () => {
        const userId = isSeller ? order.seller.id : order.buyer.id;
        return order.reviews.filter((review: Review) => review.reviewerId === userId).length > 0;
    };

    return (
        <>
            <RateModal
                account={isSeller ? order.buyer : order.seller}
                title={isSeller ? 'Rate buyer' : 'Rate seller'}
                shouldOpen={isReviewModalOpen}
                onCloseModal={() => setIsReviewModalOpen(false)}
                onSubmitReview={handleSubmitReview}
                cancelButton={{ disabled }}
                acceptButton={{ loading: isDisputeLoading, disabled }}
            />
            <DisputeOrderModal
                shouldOpen={isDisputeModalOpen}
                onCloseModal={() => setIsDisputeModalOpen(false)}
                onSubmitDispute={onDisputeButtonClick}
                cancelButton={{ disabled }}
                acceptButton={{ loading: isDisputeLoading, disabled }}
            />
            <Detail
                account={isSeller ? order.buyer : order.seller}
                imagesCarousel={order.product.images}
                textLeft={order.product.title}
                leftFirstButton={{
                    children: 'View Product',
                    onClick: () => {
                        Router.push(`/products/${order.product.id}`);
                    },
                }}
                textTitle={'Order completed'}
                textSubTitle={'Thank you for entrusting Merov'}
                handleChatClick={!isSeller ? () => handleChatClick(order.chatId) : null}
                tableData={createTable(order)}
                rightFirstButton={
                    !userAlreadyRated()
                        ? {
                              children: (
                                  <div className="flex gap-2 items-center">
                                      <FullStarLogo width={20} height={20} color={isFocusButton ? COLORS.GREEN : COLORS.GREEN_DARK} />
                                      {isSeller ? 'Rate buyer' : 'Rate seller'}
                                  </div>
                              ),
                              onClick: () => {
                                  setIsReviewModalOpen(true);
                              },
                              onMouseEnter: () => {
                                  setIsFocusButton(true);
                              },
                              onMouseLeave: () => {
                                  setIsFocusButton(false);
                              },
                              loading: isSubmitReviewLoading,
                              disabled,
                              className: 'mt-4',
                          }
                        : null
                }
                rightSecondButton={
                    !isSeller
                        ? {
                              children: 'Dispute this item',
                              onClick: () => {
                                  setIsDisputeModalOpen(true);
                              },
                              disabled,
                          }
                        : null
                }
                showContactUs
            />
        </>
    );
}
