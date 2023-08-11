import React from 'react';
import { Order } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { handleChatClick } from '../helper/handleChat';
import { createTable } from '../helper/table';

export default function OrderClosed({ order, isSeller }: { order: Order; isSeller: boolean }) {
    return (
        <Detail
            account={isSeller ? order.buyer : order.seller}
            imagesCarousel={order.product.images}
            handleChatClick={!isSeller ? () => handleChatClick(order.chatId) : null}
            textLeft={order.product.title}
            textTitle={'Order closed'}
            tableData={createTable(order)}
            showContactUs
        />
    );
}
