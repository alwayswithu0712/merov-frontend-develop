import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Router from 'next/router';
import DetailsLogo from '../../../../../assets/icons/DetailsLogo';
import RemoveLogo from '../../../../../assets/icons/RemoveLogo';

import COLORS from '../../../../foundation/colors';
import { useMobile } from '../../../../../hooks/useMobile';
import { Offer } from '../../../../../typings/order';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import ShareLogo from '../../../../../assets/icons/shareLogo';
import { Visibility } from '../../../../../typings/visibility';
import Currency from '../../../../components/Currency';
import DeleteOfferModal from './DeleteOfferModal';
import { copyToClipboard } from '../../../../../helpers/copyToClipboard';

type Props = {
    offer: Offer;
    onUpdateOffers: () => void;
};

const OfferCard = ({ offer, onUpdateOffers }: Props) => {
    const mobile = useMobile();
    const size = useWindowSize();
    const [showModal, setShowModal] = useState<boolean>(false);

    const icons = useMemo(
        () => (
            <Icons>
                <IconTextDiv onClick={() => copyToClipboard(offer.url)}>
                    <ShareLogo height={15} width={15} color={COLORS.GREY} />
                    <IconText>Share</IconText>
                </IconTextDiv>
                <IconTextDiv
                    onClick={() => {
                        Router.push(`/offers/${offer.id}`);
                    }}
                >
                    <DetailsLogo height={15} color={COLORS.GREY} width={15} />
                    <IconText>Details</IconText>
                </IconTextDiv>
                <IconTextDiv onClick={() => setShowModal(true)}>
                    <RemoveLogo height={15} color={COLORS.GREY} width={15} />
                    <IconText>Close</IconText>
                </IconTextDiv>
            </Icons>
        ),
        [offer.id, offer.url],
    );
    return (
        <ProductDiv className='animate__animated animate__fadeIn animate__faster'>
            <LeftDiv>
                {mobile ? (
                    <>
                        <div style={{ width: '95%' }}>
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                <ProductImage src={offer.product.images[0]} />
                                <TextCurrencyDiv>
                                    <StatusDivContainer>
                                        <Title>{offer.product.title}</Title>
                                        {offer.visibility === Visibility.Private && <StatusDivCompleted>private</StatusDivCompleted>}
                                    </StatusDivContainer>
                                    <Currency price={offer.price} currency={offer.currency} showImage showPrice showConversion/>
                                    <Available>
                                        Available Stock <Stock>{offer.quantity}</Stock>
                                    </Available>
                                </TextCurrencyDiv>
                            </div>
                        </div>
                        {icons}
                    </>
                ) : (
                    <>
                        <ProductImage src={offer.product.images[0]} />
                        <TextCurrencyDiv>
                            <StatusDivContainer>
                                <Title>{offer.product.title}</Title>
                                {offer.visibility === Visibility.Private && <StatusDivCompleted>private</StatusDivCompleted>}
                            </StatusDivContainer>
                            <Currency price={offer.price} currency={offer.currency} showImage showPrice showConversion/>
                            <Availablediv>
                                <Available>
                                    Available Stock <Stock>{offer.quantity}</Stock>
                                </Available>
                            </Availablediv>
                        </TextCurrencyDiv>
                        {size.width <= 1050 && icons}
                    </>
                )}
            </LeftDiv>
            <Divider />
            <RightDiv>
                <DateExpiracy>
                    <ExpiresOn>Created on</ExpiresOn>
                    <DateText>{moment(offer.createdAt).format('MM/DD/YYYY')}</DateText>
                    <ExpiresOn>Expires on</ExpiresOn>
                    <DateText>{moment(offer.expirationDate).format('MM/DD/YYYY')}</DateText>
                </DateExpiracy>
                {icons}
            </RightDiv>
            <DeleteOfferModal stateModal={showModal} setStateModal={setShowModal} onUpdateOffers={onUpdateOffers} id={offer.id} />
        </ProductDiv>
    );
};

export default OfferCard;

const ProductDiv = styled.div`
    display: flex;
    min-width: 100%;
    background: #121212;
    margin: 20px 0px;
    align-items: center;
    border-radius: 4px;
    border: 2px solid #1f2123;
    height: 130px;
    @media (max-width: 1050px) {
        min-width: 100%;
        border: none;
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
    @media (max-width: 1050px) {
        min-width: 100%;
        padding: 2% 2%;
        border: 2px solid #1f2123;
    }
    @media (max-width: 800px) {
        min-width: 100%;
        padding: 4% 2%;
        border: 2px solid #1f2123;
    }
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
const RightDiv = styled.div`
    display: flex;
    min-width: 50%;
    padding: 0% 2%;
    height: 100%;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background: #121212;
    @media (max-width: 1050px) {
        display: none;
    }
`;
const Divider = styled.div`
    border: 1px solid #3d3c3f;
    height: 100%;
    padding: 0px;
    @media (max-width: 1050px) {
        display: none;
    }
`;
const DateExpiracy = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
`;
const ProductImage = styled.img`
    max-width: 140px;
    max-height: 100px;
    border-radius: 5px;

    @media (max-width: 1050px) {
        max-height: 60px;
        max-width: 80px;
    }
`;
const Title = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    max-width: 200px;
    min-width: 200px;
    font-size: 18px;
    line-height: 27px;
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    @media (max-width: 800px) {
        margin-bottom: 5px;
        max-width: 300px;
        min-width: 200px;
    }
    @media (max-width: 600px) {
        margin-bottom: 5px;
        max-width: 200px;
        min-width: 200px;
    }
    @media (max-width: 500px) {
        margin-bottom: 5px;
        max-width: 150px;
        min-width: 150px;
    }
    }
`;
const Available = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin: 0px;
    @media (max-width: 1050px) {
        width: 80%;
    }
`;
const Stock = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
`;

const TextCurrencyDiv = styled.div`
    display: flex;
    width: 100%;

    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    padding: 0px 4%;
    justify-content: space-between;
    @media (max-width: 1050px) {
        width: 90%;
        padding: 0px 4%;
        margin-bottom: 5px;
    }
`;
const Icons = styled.div`
    display: flex;
    padding: 10px 0px;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`;
const Availablediv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
`;
const IconTextDiv = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 2px 0px;
    @media (max-width: 1050px) {
        margin: 10px 0px;
    }
`;
const ExpiresOn = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 0px;
`;

const IconText = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    white-space: nowrap;
    font-size: 14px;
    line-height: 14px;
    margin: 0px;
    margin-left: 4px;
`;

const StatusDivContainer = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 1400px) {
        flex-direction: column;
        align-items: start;
        margin-bottom: 5px;
    }
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
    @media (max-width: 1200px) {
        margin-bottom: 2px;
    }
    @media (max-width: 900px) {
        width: 130px;
    }
`;
