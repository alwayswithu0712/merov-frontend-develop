import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button, { SIZE, VARIANT } from '../../../components/buttons/Button';

const ChatHeaderProduct = ({ product, isBuyer }) => {
    if (!product || !isBuyer) return null;

    return (
        <>
            <ProductDiv>
                <ImagetextDiv>
                    <ProductImage src={product.images[0]} />
                    <ProductTitle>{product?.title}</ProductTitle>
                </ImagetextDiv>
                <Button
                    onClick={() => {
                        Router.push(`/products/${product.id}`);
                    }}
                    size={SIZE.SMALL}
                    variant={VARIANT.TERTIARY}
                >
                    Product page
                </Button>
            </ProductDiv>
        </>
    );
};

export default ChatHeaderProduct;

const ProductImage = styled.img`
    width: 40px;
    border-radius: 5px;
    height: 32px;
    margin-right: 10px;
`;

const ProductTitle = styled.h1`
    font-weight: 400;
    font-size: 12px;
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    width: 250px;
`;

const ProductDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: black;
    padding: 2%;
    height: 79px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-top: none;
    border-bottom: none;
`;
const ImagetextDiv = styled.div`
    display: flex;
    align-items: center;
`;
