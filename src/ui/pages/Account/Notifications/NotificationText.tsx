import React from 'react';
import styled from 'styled-components';
import { useMerovUser } from '../../../../hooks/useMerovUser';
import { Notification } from '../../../../typings/notification';

export const NotificationText = ({ notification }: { notification: Notification }) => {
    const user = useMerovUser();

    const { productName, buyerId, buyerName, sellerName, orderId } = notification.metadata as any;

    const getText = () => {
        switch (notification.type) {
            case 'order.created':
                if (user.accountId === buyerId) {
                    return (
                        <Text>
                            Your order for <GreenText>{`#${productName}`}</GreenText> has been successfully created.
                        </Text>
                    );
                }
                return (
                    <Text>
                        An order for <GreenText>{`#${productName}`}</GreenText> has been created by <GreenText>{`@${buyerName}`}</GreenText>{' '}
                        .
                    </Text>
                );
            case 'order.accepted':
                if (user.accountId === buyerId) {
                    return (
                        <Text>
                            <GreenText>{`@${sellerName}`}</GreenText> has accepted your order <GreenText>{`#${orderId}`}</GreenText> for{' '}
                            <GreenText>{`#${productName}`}</GreenText>.
                        </Text>
                    );
                }
                return (
                    <Text>
                        Your order for <GreenText>{`#${productName}`}</GreenText> has been accepted
                    </Text>
                );
            case 'order.paid':
                if (user.accountId === buyerId) {
                    return (
                        <Text>
                            Your order <GreenText>{`#${orderId}`}</GreenText> for <GreenText>{`#${productName}`}</GreenText> has been marked
                            as paid.
                        </Text>
                    );
                }
                return (
                    <Text>
                        Order <GreenText>{`#${orderId}`}</GreenText> for <GreenText>{`#${productName}`}</GreenText> has been paid by the
                        buyer.
                    </Text>
                );
            case 'order.shipped':
                if (user.accountId === buyerId) {
                    return (
                        <Text>
                            Your order <GreenText>{`#${orderId}`}</GreenText> for <GreenText>{`#${productName}`}</GreenText> is on its way.
                        </Text>
                    );
                }
                return (
                    <Text>
                        Your order for <GreenText>{`#${productName}`}</GreenText> has been successfully shipped
                    </Text>
                );
            case 'order.delivered':
                return (
                    <Text>
                        Your order for <GreenText>{`#${productName}`}</GreenText> has been successfully delivered
                    </Text>
                );
            case 'order.disputed':
                return (
                    <Text>
                        <GreenText>{`@${buyerName}`}</GreenText> has opened a dispute for order <GreenText>{`#${orderId}`}</GreenText>.
                        Please contact them via chat to resolve it.
                    </Text>
                );
            case 'order.refunded':
                if (user.accountId === buyerId) {
                    return (
                        <Text>
                            Our support team has accepted your dispute. Your order <GreenText>{`#${orderId}`}</GreenText> has been refunded.
                        </Text>
                    );
                }
                return (
                    <Text>
                        Our support team has resolved the dispute in favor of <GreenText>{`@${buyerName}`}</GreenText> , and the order{' '}
                        <GreenText>{`#${orderId}`}</GreenText> has been refunded.
                    </Text>
                );
            case 'order.closed':
                return (
                    <Text>
                        Order <GreenText>{`#${orderId}`}</GreenText> for <GreenText>{`#${productName}`}</GreenText> has been closed. For
                        further help, please contact our support team.
                    </Text>
                );
            default:
                return <p>{notification.type}</p>;
        }
    };
    return <>{getText()}</>;
};

const Text = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin: 0px;
`;
const GreenText = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #47e6b6;
    line-height: 24px;
    margin: 0px;
`;
