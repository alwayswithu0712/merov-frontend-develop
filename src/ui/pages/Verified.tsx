import React from 'react';

import styled from 'styled-components';

import Router from 'next/router';
import MainLayout from '../layouts/MainLayout';
import MerovLogo from '../../assets/icons/MerovLogo';
import Button, { SIZE } from '../components/buttons/Button';

const Verified = () => (
    <MainLayout headTitle="Complete Profile" pageClass={'dashboard'}>
        <section style={{ margin: '50px auto' }} className="verify">
            <IconDiv>
                <MerovLogo color={'#47e6b6'} />
            </IconDiv>
            <IconDiv>
                <Title>Your account was verified</Title>
            </IconDiv>
            <IconDiv>
                <SubTitle>Thank you for joining Merov!</SubTitle>
            </IconDiv>
            <IconDiv>
                <SubTitle> You can now start buying and selling on marketplace</SubTitle>
            </IconDiv>
            <IconDiv>
                <div
                    onClick={() => {
                        Router.push('/api/auth/login');
                    }}
                    style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                >
                    <Button size={SIZE.MEDIUM} className="col-12">
                        Log In
                    </Button>
                </div>
            </IconDiv>
        </section>
    </MainLayout>
);

export default Verified;

const IconDiv = styled.div`
    display: flex;
    justify-content: center;
`;
export const BirthdayDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
`;

export const Label = styled.label`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: white;
    margin-bottom: 10px;
`;
export const ButtonsDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
export const ButtonText = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
`;
export const AvatarText = styled.h3`
    margin-bottom: 15px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
`;
export const ButtonTextColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;
export const ImageDiv = styled.img`
    width: 75px;
    height: 85px;
    border-radius: 50px;
`;
export const AvatarButonDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    justify-content: center;
    width: 50%;
`;
export const Error = styled.h3`
    margin-bottom: 15px;
    font-family: 'Poppins';
    color: red;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
`;
