import React from 'react';
import { toShortString } from '../../../../helpers/wallet';
import { Order } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { handleChatClick } from '../helper/handleChat';
import { createTable } from '../helper/table';

export default function OrderDisputed({ order, isSeller }: { order: Order; isSeller: boolean }) {
    return (
        <Detail
            account={isSeller ? order.buyer : order.seller}
            imagesCarousel={order.product.images}
            textLeft={order.product.title}
            textTitle={'Order has been disputed.'}
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
            showContactUs
        />
    );
}
