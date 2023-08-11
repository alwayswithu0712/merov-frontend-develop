import React from 'react';
import styled from 'styled-components';
import { Product } from '../../typings/product';
import COLORS from '../foundation/colors';
import StringEng from '../../helpers/localization/en';

interface ProductProps {
    product: Product;
}

export default function ShareOfferCard({ product }: ProductProps) {
    return (
        <AllDiv>
            <Shareable>{StringEng.youAre}</Shareable>
            <ImageContainer>
                <Image src={product.images[0]} />
                <div>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductDescription> {product.description}</ProductDescription>
                    {/* <ShipmentFrom>
                        {StringEng.shipmentFrom}:{product.shippingFromStreet}
                    </ShipmentFrom> */}
                </div>
            </ImageContainer>
        </AllDiv>
    );
}

const AllDiv = styled.div`
    justify-content: center;
    text-align: center;
    width: 75%;
    border: 1px solid ${COLORS.BORDERGREY};
    padding: 1% 4% 4% 4%;
    max-height: 500px;
    @media (max-width: 800px) {
        width: 90%;
    }
`;
const Shareable = styled.h1`
    font-family: Poppins;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    max-height: 235px;
    margin: 5% 0px;
`;
const ImageContainer = styled.div`
    background: ${COLORS.DARKGREY}
    padding: 4%;
    display: flex;
    width: 80%;
`;
const Image = styled.img`
    width: 50%;
    max-height: 178px;
    border-radius: 2px;
`;
const ProductTitle = styled.h2`
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    margin-left: 10%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const ProductDescription = styled.h2`
    font-family: Poppins;
    color: ${COLORS.GREY};
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    margin-left: 10%;
    text-align: start;
    max-height: 100px;
    overflow: hidden;
`;

// const ShipmentFrom = styled.h3`
//     font-family: Poppins;
//     color: ${COLORS.GREEN};
//     font-style: normal;
//     font-weight: 400;
//     font-size: 12px;
//     line-height: 14px;
//     margin-left: 10%;
//     text-align: start;
//     max-height: 100px;
//     overflow: hidden;
// `;
