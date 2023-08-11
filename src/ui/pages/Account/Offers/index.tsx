import Router from 'next/router';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Pagination from '../../../components/Pagination';
import NoItems from '../../../components/NoItems';
import OfferCard from './OfferCard';
import { PaginatedResponse } from '../../../../typings/paginatedResponse';
import { Offer } from '../../../../typings/order';
import { PageQuery } from '../../../../typings/pageQuery';
import merovService from '../../../../services/merov';

const tabsTitle = { active: 'Active', expired: 'Expired' };

const Offers = ({ status }: { status: string }) => {
    const [params, setParams] = useState<PageQuery>({
        take: 12,
        skip: 0,
    });

    const fetchOffers = async () =>
        status === 'active'
            ? merovService.secureApi().getMyActiveOffers({ ...params })
            : merovService.secureApi().getMyExpiredOffers({ ...params });

    const { data: offers, mutate: update } = useSWR<PaginatedResponse<Offer>>(['offers', params, status], fetchOffers);

    const onPaginationChange = async (page: number) => {
        setParams({
            ...params,
            skip: page === 1 ? 0 : (page - 1) * params.take,
        });
    };

    const handleUpdateOffers = () => {
        update();
    };

    const tabs = useMemo(
        () => (
            <Tabs>
                <TabDiv
                    onClick={() => {
                        Router.push(`/account/offers/active`, undefined, { shallow: true });
                    }}
                >
                    {status === 'active' ? <TitleSelected>{tabsTitle.active}</TitleSelected> : <Title>{tabsTitle.active}</Title>}
                </TabDiv>
                <TabDiv
                    onClick={() => {
                        Router.push(`/account/offers/expired`, undefined, { shallow: true });
                    }}
                >
                    {status === 'expired' ? <TitleSelected>{tabsTitle.expired}</TitleSelected> : <Title>{tabsTitle.expired}</Title>}
                </TabDiv>
            </Tabs>
        ),
        [status],
    );

    if (!offers) return null;

    if (!offers.totalCount) {
        return (
            <InnerDivNoProds>
                <TopDiv>
                    {tabs}
                    <TitleHeader>{status === 'active' ? 'Active Offers' : 'Expired Offers'}</TitleHeader>
                </TopDiv>
                <RightDivBorder>
                    <NoItems title="No offers yet" description="Here we will display your offers" />
                </RightDivBorder>
            </InnerDivNoProds>
        );
    }

    return (
        <InnerDiv>
            <TopDiv>
                {tabs}
                <TitleHeader>{status === 'active' ? 'Active Offers' : 'Expired Offers'}</TitleHeader>
            </TopDiv>
            {offers.response.map((offer) => (
                <OfferCard key={offer.id} offer={offer} onUpdateOffers={handleUpdateOffers} />
            ))}
            <Pagination
                onPaginationChange={onPaginationChange}
                pageCount={offers.pageCount}
                currentPage={offers.currentPage}
                pageSize={offers.pageSize}
                onPageSizeChange={(e) => {
                    setParams({ ...params, skip: 0, take: e });
                }}
            />
        </InnerDiv>
    );
};

export default Offers;

const InnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const InnerDivNoProds = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: start;
`;
const TopDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: start;
    flex-direction: column;
    @media (max-width: 1000px) {
        margin-top: 0px;
        align-items: start;
        flex-direction: column;
    }
`;
const RightDivBorder = styled.div`
    display: flex;
    padding: 3% 2%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70%;
    border: 2px solid #1f2123;
    border-radius: 5px;
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
const TitleHeader = styled.h2`
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    margin-top: 20px;
`;
