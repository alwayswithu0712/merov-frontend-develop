import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Router from 'next/router';
import DetailLogo from '../../../../assets/icons/DetailLogo';
import Currency from '../../../components/Currency';
import { Order, OrderStatus } from '../../../../typings/order';
import { useMobile } from '../../../../hooks/useMobile';
import ChatIcon from '../../../../assets/icons/ChatIcon';

const OrderCard = ({ order, viewCard, condition, status }: { order: Order; viewCard: boolean; condition: string; status: string }) => {
    const mobile = useMobile();
    const otherUser = condition === 'buyer' ? order.seller : order.buyer;
    const otherUserCondition = condition === 'buyer' ? 'Seller' : 'Buyer';

    return (
        <ProductDiv className='animate__animated animate__fadeIn animate__faster'>
            <LeftDiv>
                <ProductImage src={order.product.images[0]} />
                <TextCurrencyDiv>
                    <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                        <Title>{order.product.title}</Title>
                    </div>
                    <Currency price={order.price} currency={order.currency} showImage showPrice showConversion/>

                    <Availablediv>
                        <Available>
                            Available Stock: <Stock>{order.quantity}</Stock>
                        </Available>
                        {status === 'active' ? (
                            <StatusDiv>{order.status === OrderStatus.EscrowPaymentFailed ? 'Reviewing' : order.status}</StatusDiv>
                        ) : (
                            <StatusDivCompleted>{order.status}</StatusDivCompleted>
                        )}
                    </Availablediv>
                </TextCurrencyDiv>
            </LeftDiv>
            <Divider />
            <RightDiv>
                <PurchasedDiv>
                    <Available>{`${condition === 'buyer' ? 'Purchased on' : 'Sold on'}`}</Available>
                    <DateText>{moment(order.createdAt).format('MM/DD/YYYY')}</DateText>
                </PurchasedDiv>
                {viewCard || mobile ? (
                    <>
                        <BuyerDiv>
                            <Available>{otherUserCondition}</Available>
                            <div style={{ display: 'flex' }}>
                                <UserImage src={otherUser.avatarUrl} />
                                <BuyerText>@{otherUser.name}</BuyerText>
                            </div>
                        </BuyerDiv>
                        <Shipping>Shipping Address</Shipping>
                        <DateText>
                            {order.shippingToState}, {order.shippingToCountry}, {order.shippingToPostcode}, {order.shippingToStreet}
                        </DateText>
                    </>
                ) : (
                    <BuyerDiv>
                        <Available>{otherUserCondition}</Available>
                        <div style={{ display: 'flex', margin: '5px 0px' }}>
                            <UserImage src={otherUser.avatarUrl} />
                            <BuyerText>@{otherUser.name}</BuyerText>
                        </div>
                        <Shipping>Shipping Address</Shipping>
                        <DateText>
                            {order.shippingToState}, {order.shippingToCountry}, {order.shippingToPostcode}, {order.shippingToStreet}
                        </DateText>
                    </BuyerDiv>
                )}

                <Icons>
                    <IconTextDiv
                        disabled={!order.chatId}
                        onClick={() => {
                            if (order.chatId) {
                                Router.push(`/account/inbox/${order.chatId}`);
                            }
                        }}
                    >
                        <ChatIcon height={22} width={22} />
                        <ChatText> Chat</ChatText>
                    </IconTextDiv>
                    <IconTextDiv
                        onClick={() => {
                            Router.push(`/orders/${order.id}`);
                        }}
                    >
                        <DetailLogo height={22} width={22} />

                        <Details> Details</Details>
                    </IconTextDiv>
                </Icons>
            </RightDiv>
        </ProductDiv>
    );
};

export default OrderCard;

const ProductDiv = styled.div`
    display: flex;
    min-width: 100%;
    background: #121212;
    margin: 10px 0px 20px 0px;
    align-items: center;
    border-radius: 4px;
    border: 2px solid #1f2123;
    height: 155px;
    overflow: hidden;
    white-space: nowrap;
    @media (max-width: 1100px) {
        min-width: 90%;
        height: 320px;
        flex-direction: column;
        padding: 10px;
    }
`;
const LeftDiv = styled.div`
    display: flex;
    min-width: 50%;
    padding: 0% 2%;
    background: #121212;
    border-radius: 5px;
    border-radius-right: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
    align-items: center;
    @media (max-width: 1100px) {
        min-width: 100%;
    }
`;
const RightDiv = styled.div`
    display: flex;
    min-width: 50%;
    padding: 10px 15px;
    height: 100%;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background: #121212;
    @media (max-width: 1100px) {
        min-width: 100%;
        flex-direction: column;
        padding: 3% 2% 1% 2%;
    }
`;
const Divider = styled.div`
    border: 1px solid #3d3c3f;
    height: 100%;
    padding: 0px;
    @media (max-width: 1100px) {
        display: none;
    }
`;
const StatusDiv = styled.div`
    height: 20px;
    background: #221903;
    padding: 0px 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #fdb90d;
    border-radius: 50px;
    text-align: center;
    width: fit-content;
    align-self: flex-end;
`;
const StatusDivCompleted = styled.div`
    height: 20px;
    background: #09261d;
    padding: 0px 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #47e6b6;
    border-radius: 50px;
    text-align: center;
    width: fit-content;
    align-self: flex-end;
`;
const ProductImage = styled.img`
    max-width: 30%;
    max-height: 80px;
    border-radius: 5px;
`;

const UserImage = styled.img`
    max-width: 25px;
    max-height: 25px;
    min-width: 25px;
    min-height: 25px;
    border-radius: 50px;
    margin-right: 10px;
`;
const Title = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    @media (max-width: 1100px) {
        min-width: 60%;
    }
`;
const Available = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin: 0px;
    @media (max-width: 1100px) {
        margin-right: 10px;
    }
`;
const Shipping = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin: 2px 0px;

    @media (max-width: 1100px) {
        margin-right: 10px;
        margin-bottom: 10px;
    }
`;
const BuyerText = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    margin-bottom: px;
    width: 100%;
    color: #47e6b6;
`;

const Stock = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
`;
const DateText = styled.h4`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #8c8a93;
    margin: 0px;
    width: 100%;
    white-space: break-spaces;
`;

const TextCurrencyDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    padding: 0px 4%;
    justify-content: space-between;
`;

const PurchasedDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    min-width: 100px;
    @media (max-width: 1100px) {
        width: 100%;
        min-width: 100%;
        align-items: center;
        flex-direction: row;
    }
`;
const Icons = styled.div`
    display: flex;
    padding: 10px 0px;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    @media (max-width: 1100px) {
        padding: 45px 0px 0px 0px;
        flex-direction: row;
        justify-content: end;
    }
`;
const BuyerDiv = styled.div`
    padding: 0px 10px;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    flex-shrink: 2;
    margin: 0 auto;
    @media (max-width: 1100px) {
        flex-direction: column;
        padding: 0px;
        height: 35%;
        align-items: start;
        display: flex;
        padding: 0px;
        justify-content: start;
    }
`;

const Availablediv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
`;
const IconTextDiv = styled.div<{ disabled?: boolean }>`
    display: flex;
    align-items: center;

    @media (max-width: 1100px) {
        margin: 0px 15px;
    }

    ${({ disabled }) => (disabled ? `cursor: default;` : `cursor: pointer;`)}
`;

const Details = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    margin: 0px;
    margin-left: 5px;
`;

const ChatText = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #47e6b6;
    margin: 0px;
    margin-left: 5px;
`;
