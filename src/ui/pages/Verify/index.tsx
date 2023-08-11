import React from 'react';
import styled from 'styled-components';
import MerovLogo from '../../../assets/icons/MerovLogo';
import MainLayout from '../../layouts/MainLayout';

const Verify = () => (
    <MainLayout headTitle="Complete Profile" pageClass={'dashboard'}>
        <section style={{ margin: '142px auto' }} className="verify">
            <IconDiv>
                <MerovLogo color={'#47e6b6'} />
            </IconDiv>
            <IconDiv>
                <Title>Verify your email address</Title>
            </IconDiv>
            <IconDiv>
                <SubTitle>To confirm your email address, please click on the link in the email we sent you</SubTitle>
            </IconDiv>
        </section>
    </MainLayout>
);

export default Verify;

const IconDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const Title = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const SubTitle = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    width: 45%;
`;
