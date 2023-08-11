import React, { useContext, useState } from 'react';
import { notification } from 'antd';
import Router from 'next/router';
import { Order, OrderStatus } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { OrderContext } from '../../../../context/OrderContext';
import merovService from '../../../../services/merov';
import { toShortString } from '../../../../helpers/wallet';
import { createTable } from '../helper/table';
import { handleChatClick } from '../helper/handleChat';

export default function OrderAccepted({ order, isSeller }: { order: Order; isSeller: boolean }) {
    const [isWithdrawLoading, setIsWithdrawLoading] = useState<boolean>(false);
    const setOrder = useContext(OrderContext);

    const handleWithdrawOrder = async (): Promise<void> => {
        setIsWithdrawLoading(true);

        try {
            const updatedOrder = await merovService.secureApi().updateOrder(order.id, {
                status: OrderStatus.Closed,
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
            setIsWithdrawLoading(false);
        }
    };

    return (
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
            textTitle={
                isSeller
                    ? `Waiting for @${order.buyer.name} to fund the escrow`
                    : `@${order.seller.name} has accepted your purchase`
            }
            textSubTitle={
                isSeller
                    ? `You’ll be notified when payment is completed`
                    : 'Before your item can be sent, you need to fund the wallet address.  '
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
            rightSecondButton={
                !isSeller
                    ? {
                          loading: isWithdrawLoading,
                          disabled: isWithdrawLoading,
                          children: 'Decline',
                          onClick: handleWithdrawOrder,
                      }
                    : null
            }
            showContactUs
        />
    );
}
