import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import moment from 'moment';
import useSWR from 'swr';
import merovService from '../../../../services/merov';
import OrderCard from './OrderCard';
import Pagination from '../../../components/Pagination';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { Order } from '../../../../typings/order';
import { PaginatedResponse } from '../../../../typings/paginatedResponse';
import NoItems from '../../../components/NoItems';
import { PageQuery } from '../../../../typings/pageQuery';

const tabsTitle = { active: 'Active', completed: 'Completed' };

const getViewTitle = (condition: string, status: string) => `${tabsTitle[status]} ${condition === 'buyer' ? 'Purchases' : 'Sales'}`;

const Orders = ({ condition, status }: { condition: string; status: string }) => {
    const purchasesOrSales = condition === 'buyer' ? 'purchases' : 'sales';

    const [viewCard, setViewCard] = useState<boolean>(false);

    const [ordersByDate, setOrdersByDate] = useState<Record<string, Order[]>>({});

    const [params, setParams] = useState<PageQuery>({
        take: 12,
        skip: 0,
    });

    const router = useRouter();

    const tabs = useMemo(
        () => (
            <Tabs>
                <TabDiv
                    onClick={() => {
                        router.push(`/account/${purchasesOrSales}/active`, undefined, { shallow: true });
                    }}
                >
                    {status === 'active' ? <TitleSelected>{tabsTitle.active}</TitleSelected> : <Title>{tabsTitle.active}</Title>}
                </TabDiv>
                <TabDiv
                    onClick={() => {
                        router.push(`/account/${purchasesOrSales}/completed`, undefined, { shallow: true });
                    }}
                >
                    {status === 'completed' ? <TitleSelected>{tabsTitle.completed}</TitleSelected> : <Title>{tabsTitle.completed}</Title>}
                </TabDiv>
            </Tabs>
        ),
        [purchasesOrSales, router, status],
    );

    const fetchOrders = async () =>
        status === 'active'
            ? merovService.secureApi().getMyActiveOrders({ ...params, condition })
            : merovService.secureApi().getMyCompletedOrders({ ...params, condition });

    const { data: orders } = useSWR<PaginatedResponse<Order>>(['orders', params, condition, status], fetchOrders);

    const onPaginationChange = async (page: number) => {
        setParams({
            ...params,
            skip: page === 1 ? 0 : (page - 1) * params.take,
        });
    };

    const size = useWindowSize();

    useEffect(() => {
        setViewCard(size.width < 1100 && size.width > 801);
    }, [size]);

    useEffect(() => {
        const ordersByDate: Record<string, Order[]> = {};
        orders?.response.forEach((order) => {
            const date = moment(order.createdAt).format('MM/DD/YYYY');

            if (!ordersByDate[date]) {
                ordersByDate[date] = [];
            }

            ordersByDate[date].push(order);
        });

        setOrdersByDate(ordersByDate);
    }, [orders?.response]);

    if (!orders) return null;

    if (!orders?.totalCount) {
        return (
            <InnerDiv>
                {tabs}

                <TopDiv>
                    <TitleHeader>{getViewTitle(condition, status)}</TitleHeader>
                </TopDiv>
                <RightDivBorder>
                    <NoItems
                        title={`No ${purchasesOrSales} yet`}
                        description={`Here we will display your ${status} ${purchasesOrSales}`}
                    ></NoItems>
                </RightDivBorder>
            </InnerDiv>
        );
    }
    return (
        <InnerDiv>
            {tabs}
            <TopDiv>
                <TitleHeader>{getViewTitle(condition, status)}</TitleHeader>
            </TopDiv>
            {Object.keys(ordersByDate).map((date, index) => (
                <div key={`${date}-${index}`} className="w-full">
                    <Date key={date}>{date.toString()}</Date>
                    {ordersByDate[date].map((order: Order) => (
                        <OrderCard status={status} condition={condition} key={order.id} viewCard={viewCard} order={order} />
                    ))}
                </div>
            ))}
            <div style={{ marginTop: '25px' }}>
                <Pagination
                    onPaginationChange={onPaginationChange}
                    pageCount={orders.pageCount}
                    currentPage={orders.currentPage}
                    pageSize={orders.pageSize}
                    onPageSizeChange={(e) => {
                        setParams({ ...params, skip: 0, take: e });
                    }}
                />
            </div>
        </InnerDiv>
    );
};

export default Orders;

const TitleSelected = styled.h2`
    text-decoration-line: underline;
    text-decoration-color: #47e6b6;
    text-underline-offset: 15px;
    margin: 0%;
    margin-right: 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    white-space: nowrap;
    line-height: 40px;
    color: #47e6b6;
    cursor: pointer;
`;
const Title = styled.h2`
    cursor: pointer;
    margin: 0%;
    margin-right: 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    white-space: nowrap;
    line-height: 40px;
`;

const TabDiv = styled.div`
    display: flex;
    align-items: start;
`;

const Tabs = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 10px;
`;

const TitleHeader = styled.h3`
    font-family: 'Poppins';
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    margin: 0px;
`;

const TopDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
`;
const InnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const RightDivBorder = styled.div`
    display: flex;
    padding: 2% 2%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70%;
    border: 2px solid #1f2123;
    border-radius: 5px;
`;

const Date = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: start;
    margin: 0px;
    width: 100%;
`;
