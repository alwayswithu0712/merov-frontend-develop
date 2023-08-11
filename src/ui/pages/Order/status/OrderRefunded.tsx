import React from 'react';
import { Order } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { handleChatClick } from '../helper/handleChat';
import { createTable } from '../helper/table';

export default function OrderRefunded({ order, isSeller }: { order: Order; isSeller: boolean }) {
    return (
        <Detail
            account={isSeller ? order.buyer : order.seller}
            imagesCarousel={order.product.images}
            textLeft={order.product.title}
            textTitle={'Order was refunded'}
            textSubTitle={isSeller ? null : 'Thank you for trusting Merov with this process.'}
            handleChatClick={!isSeller ? () => handleChatClick(order.chatId) : null}
            tableData={createTable(order)}
            showContactUs
        />
    );
}
