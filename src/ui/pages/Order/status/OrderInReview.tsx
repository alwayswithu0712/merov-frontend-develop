import React from 'react';
import { Order } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { createTable } from '../helper/table';
import { handleChatClick } from '../helper/handleChat';

export default function OrderInReview({ order, isSeller }: { order: Order; isSeller: boolean }) {
    return (
        <Detail
            account={isSeller ? order.buyer : order.seller}
            imagesCarousel={order.product.images}
            handleChatClick={!isSeller ? () => handleChatClick(order.chatId) : null}
            textLeft={order.product.title}
            textTitle={'Order is under review.'}
            tableData={createTable(order)}
            showContactUs
        />
    );
}
