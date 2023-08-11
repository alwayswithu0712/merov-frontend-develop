import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';
import MerovLogo from '../../../assets/icons/MerovLogo';
import Title from '../../components/Title';

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>();
    const [sent, setSent] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [form] = Form.useForm();
    const handleSendEmail = (): void => {
        axios
            .request({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
                headers: { 'content-type': 'application/json' },
                data: {
                    client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
                    email,
                    connection: 'Username-Password-Authentication',
                },
            })
            .then(() => {
                setSent(true);
            })
            .catch(() => {
                setError(true);
            });
    };
    if (sent) {
        return (
            <MainLayout headTitle="Forgot password" pageClass={'dashboard'}>
                <section className="signup_page">
                    <div style={{ height: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <LogoDiv>
                            <MerovLogo color={'#47e6b6'} />
                        </LogoDiv>
                        <Title text="We ve sent a recovery link" className="mb-8 text-3xl" />
                        <SubTitle>Please check your email</SubTitle>
                        <Description>
                            Did not receive the email? Check your <DescriptionStrong>spam folder</DescriptionStrong>, or try again later.
                        </Description>
                    </div>
                </section>
            </MainLayout>
        );
    }
    return (
        <MainLayout headTitle="Forgot password" pageClass={'dashboard'}>
            <section className="signup_page">
                <div style={{ height: '65vh', display: 'flex', flexDirection: 'column' }}>
                    <LogoDiv>
                        <MerovLogo color={'#47e6b6'} />
                    </LogoDiv>
                    <Title text="Recover Password" className="mb-8 text-3xl" />
                    <SubTitle>{`We´ll send an email with a recovery link to reset your password.`}</SubTitle>
                    <Form form={form} onFinish={handleSendEmail}>
                        <Form.Item
                            className="input_wrap text"
                            label="Your Email"
                            name="email"
                            validateTrigger="onSubmit"
                            rules={[
                                { required: true, message: 'Email is required!' },
                                {
                                    type: 'email',
                                    message: 'The input is not valid Email!',
                                },
                            ]}
                        >
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </Form.Item>
                        {error ? <ErrorText>This email is not associated with any account. Try another one.</ErrorText> : null}
                        <div className="panel_bottom aic jcsb">
                            <Button
                                style={{ width: '100%' }}
                                type="primary"
                                htmlType="submit"
                                className="btn btn-custom btn-primary ml-auto"
                            >
                                Send recovery link
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
        </MainLayout>
    );
};

export default ForgotPassword;

export const SubTitle = styled.h2`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: white;
    text-align: center;
    margin-bottom: 20px;
`;
export const Description = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    width: 60%;
    text-align: center;
`;
export const DescriptionStrong = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
`;
export const LogoDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;
export const ErrorText = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #ea4335;
`;
