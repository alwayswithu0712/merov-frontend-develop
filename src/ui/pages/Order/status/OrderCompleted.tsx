import React from 'react';
import { Order } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { createTable } from '../helper/table';

export default function OrderCompleted({ order, isSeller }: { order: Order; isSeller: boolean }) {
    return (
        <Detail
            account={isSeller ? order.buyer : order.seller}
            imagesCarousel={order.product.images}
            textLeft={order.product.title}
            textTitle={'Order completed'}
            tableData={createTable(order)}
            showContactUs
        />
    );
}
