import React, { useState } from 'react';
import styled from 'styled-components';
import { OrderContext } from '../../../context/OrderContext';
import { useMerovUser } from '../../../hooks/useMerovUser';
import { Order, OrderStatus } from '../../../typings/order';
import OrderCreated from './status/OrderCreated';
import OrderDelivered from './status/OrderDelivered';
import OrderAccepted from './status/OrderAccepted';
import OrderPaid from './status/OrderPaid';
import OrderShipped from './status/OrderShipped';
import OrderDisputed from './status/OrderDisputed';
import OrderRefunded from './status/OrderRefunded';
import OrderCompleted from './status/OrderCompleted';
import OrderClosed from './status/OrderClosed';
import OrderInReview from './status/OrderInReview';

export default function OrderView({ initialOrder }: { initialOrder: Order }) {
    const [order, setOrder] = useState<Order>(initialOrder);
    const user = useMerovUser();

    const getOrderView = (order: Order, isSeller: boolean) => {
        switch (order.status) {
            case OrderStatus.Created:
                return <OrderCreated order={order} isSeller={isSeller} />;
            case OrderStatus.Accepted:
                return <OrderAccepted order={order} isSeller={isSeller} />;
            case OrderStatus.Paid:
                return <OrderPaid order={order} isSeller={isSeller} />;
            case OrderStatus.Shipped:
                return <OrderShipped order={order} isSeller={isSeller} />;
            case OrderStatus.Delivered:
                return <OrderDelivered order={order} isSeller={isSeller} />;
            case OrderStatus.Disputed:
                return <OrderDisputed order={order} isSeller={isSeller} />;
            case OrderStatus.Refunded:
                return <OrderRefunded order={order} isSeller={isSeller} />;
            case OrderStatus.Completed:
                return <OrderCompleted order={order} isSeller={isSeller} />;
            case OrderStatus.Closed:
                return <OrderClosed order={order} isSeller={isSeller} />;
            default:
                return <OrderInReview order={order} isSeller={isSeller} />;
        }
    };

    return (
        <InnerDiv>
            <OrderContext.Provider value={setOrder}>{getOrderView(order, order.buyerId !== user.accountId)}</OrderContext.Provider>
        </InnerDiv>
    );
}

const InnerDiv = styled.div`
    width: 100%;
    align-items: center;
`;
