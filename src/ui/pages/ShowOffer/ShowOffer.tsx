import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import StringEng from '../../../helpers/localization/en';
import CopyLogo from '../../../assets/icons/CopyLogo';
import { Offer } from '../../../typings/order';
import Button, { SIZE, VARIANT } from '../../components/buttons/Button';
import Currency from '../../components/Currency';
import { copyToClipboard } from '../../../helpers/copyToClipboard';
import Title from '../../components/Title';

interface OfferProps {
    offer: Offer;
}

export default function ShowOffer({ offer }: OfferProps) {
    const router = useRouter();

    const handleViewOfer = async () => {
        await router.push(`/offers/${offer.id}`);
    };

    return (
        <MainLayout headTitle="Single Product" pageClass={'dashboard'}>
            <AllDiv>
                <div className="container flex justify-center flex-col mb-16">
                    <Container>
                        <Title text={StringEng.offerCreated} className="text-3xl" />
                        <ImageContainer>
                            <Image src={offer.product.images[0]} />
                            <div className="mt-2 ml-4">
                                <ProductTitle>{offer.product.title}</ProductTitle>
                                <Currency price={offer.price} currency={offer.currency} showImage showPrice showConversion />
                            </div>
                        </ImageContainer>

                        <ShareLink>{StringEng.shareLink}</ShareLink>
                        <UrlDiv onClick={() => copyToClipboard(offer.url)}>
                            <Url>{offer.url}</Url>
                            <CopyButton>
                                <CopyLogo height={22} width={22} />
                                <CopySpan>{StringEng.copy}</CopySpan>
                            </CopyButton>
                        </UrlDiv>
                        <div className="row justify-content-center gap-4 mt-8 mb-32 md:mt-24">
                            <Button
                                onClick={handleViewOfer}
                                variant={VARIANT.SECONDARY}
                                size={SIZE.MEDIUM}
                                className="col-12 col-md-5 col-lg-4"
                            >
                                {StringEng.viewOfer}
                            </Button>
                        </div>
                    </Container>
                </div>
            </AllDiv>
        </MainLayout>
    );
}

const AllDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 780px;
    margin: auto;
    justify-content: center;
    text-align: center;
    @media (max-width: 800px) {
        width: 90%;
    }
`;
const ImageContainer = styled.div`
    display: flex;
    border-radius: 5px;
    border: 1px solid #181a1c;
    max-width: 550px;
    margin: auto;
    margin-top: 64px;
`;
const Image = styled.img`
    max-width: 274px;
    width: 50%;
`;
const ShareLink = styled.h3`
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    margin-top: 32px;
`;

const ProductTitle = styled.h3`
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
`;
const UrlDiv = styled.div`
    border: 1px solid white;
    border-radius: 100px;
    padding: 8px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    margin: auto;
    width: fit-content;
`;
const Url = styled.h4`
    margin: 0px;
    width: 85%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 40px;
    color: #47e6b6;
    margin-left: 8px;
    margin-right: 16px;
`;

const CopyButton = styled.div`
    display: flex;
`;

const CopySpan = styled.span`
    margin-left: 10px;
`;
