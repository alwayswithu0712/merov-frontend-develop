import React from 'react';

import styled from 'styled-components';
import { Product } from '../../../typings/product';

import MainLayout from '../../layouts/MainLayout';
import OfferDetails from './OfferDetails';
import ShareOfferCard from './ShareOfferCard';
import StringEng from '../../../helpers/localization/en';
import Title from '../../components/Title';

interface ProductProps {
    product: Product;
}

export default function CreateOffer({ product }: ProductProps) {
    return (
        <MainLayout headTitle="New Offer" pageClass={'dashboard '}>
            <div className="container flex justify-center flex-col">
                <Title text={StringEng.createANew} className="text-3xl" />
                <Container className="mt-12 updateForm animate__animated animate__fadeIn animate__faster">
                    <ShareOfferCard product={product} />
                </Container>
                <Container className="updateForm animate__animated animate__fadeIn animate__faster">
                    <OfferDetails product={product} />
                </Container>
            </div>
        </MainLayout>
    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
`;
