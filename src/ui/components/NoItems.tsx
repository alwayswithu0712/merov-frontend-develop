import React from 'react';
import styled from 'styled-components';
import MerovLogo from '../../assets/icons/MerovLogo';

const NoItems = ({ title, description }) => (
    <>
        <MerovLogo />
        <NoItemsTitle>{title}</NoItemsTitle>
        <NoItemsDescription>{description}</NoItemsDescription>
    </>
);

export default NoItems;

const NoItemsTitle = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    margin: 10px 0px;
`;

const NoItemsDescription = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin: 0px;
    margin-bottom: 10px;
    opacity: 0.6;
`;
