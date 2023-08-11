import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { notification } from 'antd';
import styled from 'styled-components';
import MainLayout from '../../layouts/MainLayout';
import Title from '../../components/Title';
import MerovLogo from '../../../assets/icons/MerovLogo';
import Input from '../../components/inputs/Input';
import { clearInputNumbersForPhone } from '../../../helpers/clearInputNumbers';
import Button, { VARIANT, SIZE } from '../../components/buttons/Button';
import COLORS from '../../foundation/colors';
import UnstyledButton from '../../components/buttons/UnstyledButton';
import merovService from '../../../services/merov';
import { ProveStart, ProveFinish } from '../../../typings/prove';
import { UseAccountConntainer } from '../../../hooks/useAccountContainer';
import CheckboxCustom from '../../components/inputs/CheckboxCustom';
import { useMerovUser } from '../../../hooks/useMerovUser';
import { BackendEvents } from '../../../typings/notification';

enum VerificationMethod {
    OTP = 'otp',
    PROVE = 'prove',
}

type Props = {
    tableProps: UseAccountConntainer['tableProps'];
    onSetShowSMS: (show: boolean) => void;
    handleSaveChanges: UseAccountConntainer['handleSaveChanges'];
};

const ValidationSMS = ({ tableProps, onSetShowSMS, handleSaveChanges }: Props) => {
    let timerToResend;
    const [disabledInput, setDisabledInput] = useState<boolean>(true);
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [disabledResendButton, setDisabledResendButton] = useState<boolean>(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [method, setMethod] = useState<VerificationMethod | null>(null);
    const [inputCode, setInputCode] = useState<string>('');
    const user = useMerovUser();

    useEffect(() => {
        const eventSource = merovService.secureApi().listenEvents(user.id, (data) => {
            if (data?.type === BackendEvents.PhoneVerificationFinish) {
                Router.replace('/verify/completed');
            }
        });

        return () => {
            eventSource.close();
        };
    }, [user.id]);

    const handleSubmit = async (): Promise<void> => {
        if (method === VerificationMethod.OTP) {
            sendCode(inputCode);
        } else {
            sendVerification();
        }
    };

    const sendVerification = async (): Promise<void> => {
        setLoading(true);
        setDisabledButton(true);
        setDisabledResendButton(true);
        const changesSaved = await handleSaveChanges();
        try {
            if (changesSaved) {
                await sendSMSValidation();
            } else {
                setLoading(false);
                setDisabledButton(false);
            }
        } catch {
            notification.open({
                message: 'Troubles to send message!',
                description: 'Troubles to send message. Please try again later',
                className: 'error',
            });
            setLoading(false);
            setDisabledButton(false);
        }
    };

    const sendSMSValidation = async () => {
        const otp: ProveStart = await merovService.secureApi().postPhoneVerifyStart();
        if (otp.type === VerificationMethod.PROVE) {
            timerToResend = setTimeout(() => {
                setMethod(VerificationMethod.PROVE);
                setLoading(false);
                setDisabledButton(false);
            }, 180000);
        } else {
            setMethod(VerificationMethod.OTP);
            setDisabledInput(false);
            setLoading(false);
            setDisabledResendButton(false);
        }
    };

    const sendCode = async (inputCode: string): Promise<void> => {
        try {
            setLoading(true);
            setDisabledInput(true);
            setDisabledResendButton(true);
            setDisabledButton(true);
            const verifyResult: ProveFinish = await merovService.secureApi().postPhoneVerifyFinish(inputCode);
            if (verifyResult.isPhoneVerified) {
                Router.replace('/verify/completed');
            } else {
                notification.open({
                    message: 'Troubles to verify the code!',
                    description: 'Troubles to verify the code. Please try again',
                    className: 'error',
                });
            }
        } catch {
            notification.open({
                message: 'Troubles to verify the code!',
                description: 'Troubles to verify the code. Please try again later',
                className: 'error',
            });
        } finally {
            setLoading(false);
            setDisabledInput(false);
            setDisabledResendButton(false);
        }
    };

    useEffect(() => () => {
        if (timerToResend) clearTimeout(timerToResend);
    });

    useEffect(() => {
        if (method) {
            if (method === VerificationMethod.OTP && inputCode.length > 3) {
                setDisabledButton(false);
            } else {
                setDisabledButton(true);
            }
        }
    }, [inputCode]);

    return (
        <MainLayout headTitle="SMS Verification" pageClass={'dashboard'}>
            <section className="max-w-lg px-3 mt-14 mb-52 mx-auto">
                <div className="flex justify-center">
                    <MerovLogo color={'#47e6b6'} />
                </div>
                <div className="flex justify-center mt-2 mb-2">
                    <Title text="Phone Verification" className="text-3xl" />
                </div>
                <span className="flex text-base font-normal text-center mb-8 w-full justify-center">
                    {!method
                        ? 'We’ll send you a SMS to verify your phone numbe.'
                        : method === VerificationMethod.OTP
                        ? 'Please enter the code we sent to your phone number'
                        : 'We’ll send you a SMS with a link that you will need to click to verify your account.'}
                </span>
                <div>
                    {method !== VerificationMethod.OTP && (
                        <div className="flex justify-between mb-2">
                            <span className="font-medium flex select-none text-white">Phone number</span>
                            <NotYourPhoneText
                                onClick={() => {
                                    onSetShowSMS(false);
                                }}
                            >
                                Not your phone?
                            </NotYourPhoneText>
                        </div>
                    )}
                    <Input
                        type={method === VerificationMethod.OTP ? 'text' : 'tel'}
                        name={'phone'}
                        placeholder={method === VerificationMethod.OTP ? 'Enter code' : 'Enter Phone'}
                        value={method === VerificationMethod.OTP ? inputCode : tableProps.phone.value}
                        onChange={
                            method === VerificationMethod.OTP
                                ? (e: React.ChangeEvent<HTMLInputElement>) => setInputCode(e.target.value)
                                : tableProps.phone.onChange
                        }
                        disabled={disabledInput}
                        onKeyDown={(e) => method !== VerificationMethod.OTP && clearInputNumbersForPhone(e)}
                    />
                </div>
                {!method && (
                    <div className="w-full flex mt-3">
                        <CheckboxCustom
                            onChange={() => setIsTermsAccepted((prevState) => !prevState)}
                            name="visibility"
                            className="offer-product-form-inline"
                            checked={isTermsAccepted}
                            defaultChecked={false}
                        />
                        <p className="ml-3 mr-3 inline-block text-white text-sm">
                            I agree to receive Merov informational and transactional messages via text. Recurring automated transactional
                            messages will be sent to your mobile number. Standard message and data rates may apply.{' '}
                        </p>
                    </div>
                )}
                <div className="flex flex-col md:flex-row justify-center gap-2 mt-12">
                    {method === VerificationMethod.OTP && (
                        <Button
                            loading={loading}
                            disabled={disabledResendButton}
                            variant={VARIANT.SECONDARY}
                            size={SIZE.MEDIUM}
                            className="w-full max-w-none md:max-w-xs"
                            onClick={sendSMSValidation}
                        >
                            Resend sms
                        </Button>
                    )}
                    <Button
                        loading={loading}
                        disabled={disabledButton || !isTermsAccepted}
                        variant={VARIANT.PRIMARY}
                        size={SIZE.MEDIUM}
                        className="w-full max-w-none md:max-w-xs"
                        onClick={handleSubmit}
                    >
                        {method === VerificationMethod.PROVE ? 'Resend sms' : method === VerificationMethod.OTP ? 'Submit' : 'Send SMS'}
                    </Button>
                </div>
            </section>
        </MainLayout>
    );
};

export default ValidationSMS;

const NotYourPhoneText = styled(UnstyledButton)`
    color: ${COLORS.GREEN};

    &:hover {
        color: ${COLORS.GREEN};
        box-shadow: inset 0 -1px 0 ${COLORS.GREEN};
    }
`;
