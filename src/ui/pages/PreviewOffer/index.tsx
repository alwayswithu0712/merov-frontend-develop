import { notification } from 'antd';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import StringEng from '../../../helpers/localization/en';
import { useSessionState } from '../../../hooks/useSessionState';
import merovService from '../../../services/merov';
import { ICreateOffer, Product } from '../../../typings/product';
import MainLayout from '../../layouts/MainLayout';
import Button, { SIZE, VARIANT } from '../../components/buttons/Button';
import Title from '../../components/Title';
import Currency from '../../components/Currency';

interface ProductProps {
    product: Product;
}

export default function PreviewOffer({ product }: ProductProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [offer] = useSessionState<ICreateOffer>(`offer-${product.id}`);

    const handleEditOffer = useCallback(() => {
        sessionStorage.setItem(`offer-edit-${product.id}`, JSON.stringify({ shouldEdit: true }));
        router.push(`/products/${product.id}/offer/create`);
    }, [product.id, router]);

    const now = moment();
    const expDate = moment(offer?.expirationDate);

    if (!offer) {
        return Router.push(`/products/${product.id}/offer/create`);
    }

    const handleCreateOffer = async () => {
        setLoading(true);
        try {
            const offerToSend = { ...offer, shippingCost: Number(offer.shippingCost), price: Number(offer.price) };
            const response = await merovService.secureApi().postOffer(offerToSend);
            if (sessionStorage.getItem(`offer-edit-${product.id}`)) {
                sessionStorage.removeItem(`offer-edit-${product.id}`);
            }
            if (sessionStorage.getItem(`offer-${product.id}`)) {
                sessionStorage.removeItem(`offer-${product.id}`);
            }
            router.push(`/products/${product.id}/offer/${response.id}`);
        } catch (err) {
            notification.open({
                message: 'Error',
                description: 'Error creating offer',
                className: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout headTitle="Single Product" pageClass={'dashboard'}>
            <div className="container flex justify-center flex-col mb-16">
                <Container>
                    <Title text={StringEng.previewYour} className="text-3xl" />
                    <div className="justify-center grid grid-cols-1 sm:grid-cols-2 mt-12">
                        <div className="w-full flex justify-center md:justify-end">
                            <ProductImage src={product.images[0]} />
                        </div>
                        <TextDiv>
                            <ExpiresText>
                                {StringEng.expiresin} {`${expDate.diff(now, 'days')}d ${expDate.diff(now, 'hours') % 24}h`}
                            </ExpiresText>
                            <ProductTitle>{product.title}</ProductTitle>
                            <Cost>
                                <Currency price={product.price} currency={product.currency} showImage showPrice showConversion />
                            </Cost>
                            <ShipmentCost>{StringEng.shipmentCost}</ShipmentCost>
                            <Quantity>
                                {offer.quantity} {StringEng.available}
                            </Quantity>
                        </TextDiv>
                    </div>
                    <div className="row justify-center gap-4 mt-8 md:mt-32">
                        <Button
                            variant={VARIANT.TERTIARY}
                            size={SIZE.MEDIUM}
                            onClick={() => handleEditOffer()}
                            className="col-12 col-md-4 col-lg-3"
                        >
                            {StringEng.editOffer}
                        </Button>
                        <Button
                            loading={loading}
                            disabled={loading}
                            onClick={() => handleCreateOffer()}
                            variant={VARIANT.SECONDARY}
                            size={SIZE.MEDIUM}
                            className="col-12 col-md-4 col-lg-3"
                        >
                            {StringEng.createOffer}
                        </Button>
                    </div>
                </Container>
            </div>
        </MainLayout>
    );
}

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
const ProductImage = styled.img`
    width: 100%;
    max-width: 274px;
    max-height: 550px;
    border-radius: 4px;
`;
const ExpiresText = styled.h2`
    font-family: Poppins;
    color: #929292;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 12px;
    text-align: start;
    max-height: 100px;
    overflow: hidden;
    opacity: 0.8;
    width: 100%;
    padding: 0% 10% 0% 10%;
    margin-top: 16px;
`;

const ProductTitle = styled.h2`
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
    line-height: 25px;
    margin-left: 10%;
    margin: 0% 10% 3% 10%;
    text-align: start;
    @media (max-width: 600px) {
        white-space: none;
        overflow: none;
        text-overflow: none;
    }
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
`;
const Cost = styled.h3`
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    margin: 0% 10% 1% 10%;
    text-align: start;
    font-size: 14px;
    margin-bottom: 20px;
`;

const ShipmentCost = styled.h2`
    font-family: Poppins;
    color: #ffffff;
    font-style: normal;
    font-weight: 300;
    font-size: 11px;
    line-height: 15px;
    margin-left: 10%;
    text-align: start;
    max-height: 100px;
    overflow: hidden;
    margin: 0% 10% 1% 10%;
`;
const Quantity = styled.h2`
    font-family: Poppins;
    color: #929292;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 12px;
    margin-left: 10%;
    text-align: start;
    max-height: 100px;
    overflow: hidden;
    margin: 0% 10% 8% 10%;
`;

const TextDiv = styled.div`
    width: 100%;
    border-radius: 5px;
    border: 1px solid #181a1c;
`;
