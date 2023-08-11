import React, { useContext, useState } from 'react';
import { notification } from 'antd';
import Router from 'next/router';
import { Order, OrderStatus } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { OrderContext } from '../../../../context/OrderContext';
import merovService from '../../../../services/merov';
import DisputeOrderModal from '../modals/DisputeOrderModal';
import { createTable } from '../helper/table';
import { toShortString } from '../../../../helpers/wallet';
import { handleChatClick } from '../helper/handleChat';

export default function OrderShipped({ order, isSeller }: { order: Order; isSeller: boolean }) {
    const [isDeliveryLoading, setIsDeliveryLoading] = useState<boolean>(false);
    const [isDisputeLoading, setIsDisputeLoading] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const setOrder = useContext(OrderContext);

    const handleDeliveryButtonClick = async () => {
        if (disabled) return;
        setIsDeliveryLoading(true);
        setDisabled(true);
        try {
            const updatedOrder = await merovService.secureApi().updateOrder(order.id, {
                status: OrderStatus.Delivered,
            });

            setOrder(updatedOrder);
        } catch (error) {
            notification.open({
                message: 'Error',
                description: error,
                duration: 2,
                className: 'error',
            });
        } finally {
            setIsDeliveryLoading(false);
            setDisabled(false);
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
            setIsOpenModal(false);
        }
    };

    return (
        <>
            <DisputeOrderModal
                shouldOpen={isOpenModal}
                onCloseModal={() => setIsOpenModal(false)}
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
                textTitle={`Order has been shipped`}
                textSubTitle={
                    isSeller
                        ? `Review the shipping details and be on the lookout for your order`
                        : "You'll be notified when the shipment arrives"
                }
                handleChatClick={!isSeller ? () => handleChatClick(order.chatId) : null}
                tableData={createTable(order)}
                inputWallet={{
                    defaultValue: toShortString(order.escrowAddress),
                    valueToCopy: order.escrowAddress,
                    disabled: true,
                }}
                inputTotalData={{
                    disabled: true,
                    value: order.total,
                    currencyData: {
                        currency: order.currency,
                        price: +order.total,
                    },
                }}
                rightFirstButton={
                    !isSeller
                        ? {
                              children: 'Order Received',
                              onClick: () => {
                                  handleDeliveryButtonClick();
                              },
                              loading: isDeliveryLoading,
                              disabled,
                          }
                        : null
                }
                rightSecondButton={
                    !isSeller
                        ? {
                              children: 'Dispute this item',
                              onClick: () => {
                                  setIsOpenModal(true);
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
