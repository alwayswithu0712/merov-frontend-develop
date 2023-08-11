import React, { useState } from 'react';
import { Form, notification } from 'antd';
import ResetLogo from '../../../../../assets/icons/ResetLogo';
import merovService from '../../../../../services/merov';
import {
    Label,
    BoxDivContainer,
    BoxDiv,
    PasswordsNotMatchTitle,
    IconTextDivPassword,
    IdentityText,
    Divider,
} from './SecurityComponents.styled';
import { AllDiv } from '../../Profile/ProfileComponents.styled';
import Button, { SIZE, VARIANT } from '../../../../components/buttons/Button';
import InputPassword from '../../../../components/inputs/InputPassword';
import UserInputs from '../../Profile/components/UserInputs';
import UserIdentityVerification from '../../Profile/components/UserIdentityVerification';
import UserLogo from '../../../../../assets/icons/UserLogo';
import { IUser, useMerovUser } from '../../../../../hooks/useMerovUser';

const Security = () => {
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [form] = Form.useForm();
    const [password, setPassword] = useState<string>('');
    const [secondPassword, setSecondPassword] = useState<string>('');
    const [secondPasswordError, setSecondPasswordError] = useState<boolean>(false);
    const user = useMerovUser() as IUser;

    const canSubmit = () => passwordMatch && secondPassword !== '';

    const submitResetPassword = async () => {
        if (canSubmit() && !isLoading) {
            setIsLoading(true);
            try {
                await merovService.secureApi().changePassword(password);
                notification.open({
                    message: 'Changes saved!',
                    description: 'Your password was succesfully changed!',
                    className: 'success',
                });
            } catch {
                notification.open({
                    message: 'Something went wrong!',
                    description: 'Your password hasn t changed',
                    className: 'error',
                });
            } finally {
                setIsLoading(false);
            }
        }
    };
    const handleChangeSecondPassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSecondPassword(value);
        if (password === value) {
            setPasswordMatch(true);
            setSecondPasswordError(false);
        } else {
            if (value) {
                setSecondPasswordError(true);
            }
            setPasswordMatch(false);
        }
    };
    const handleChangePassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);

        if (secondPassword && secondPassword !== value) {
            setPasswordMatch(false);
            setSecondPasswordError(true);
        }
        if (secondPassword === value) {
            setPasswordMatch(true);
            setSecondPasswordError(false);
        }
    };

    return (
        <BoxDivContainer>
            <BoxDiv>
                {user?.account?.organization && (
                    <div className="mb-8">
                        <AllDiv>
                            <IconTextDivPassword>
                                <UserLogo width="22" height="22" color={'#47E6B6'} />
                                <IdentityText>User Profile</IdentityText>
                            </IconTextDivPassword>
                            <Divider />
                            <div className="w-full  my-4">
                                <div className="animate__animated animate__fadeIn animate__faster">
                                    <UserInputs />
                                </div>
                            </div>
                        </AllDiv>
                        <UserIdentityVerification user={user} />
                    </div>
                )}

                <IconTextDivPassword>
                    <ResetLogo color={'#47E6B6'} width={22} height={22} />
                    <IdentityText>Password Reset</IdentityText>
                </IconTextDivPassword>
                <Divider />
                <Form form={form} onFinish={submitResetPassword}>
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 my-4">
                        <div>
                            <Label>New Password</Label>
                            <Form.Item
                                name="firstPassword"
                                validateTrigger="onSubmit"
                                rules={[
                                    { required: true, message: 'Password is required!' },
                                    {
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])\S{8,}$/,
                                        min: 8,
                                        message:
                                            'At least 8 characters, lower case letters, upper case letters, numbers and special characters (e.g. !@#$%^&*)',
                                    },
                                ]}
                            >
                                <InputPassword
                                    onChange={handleChangePassword}
                                    placeholder="Enter your password"
                                    name="firstPassword"
                                    showRequirements
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Label>Confirm Password</Label>
                            <Form.Item
                                name="secondPassword"
                                validateTrigger="onSubmit"
                                rules={[{ required: true, message: 'Password is required!' }]}
                            >
                                <InputPassword onChange={handleChangeSecondPassword} placeholder="Confirm Password" name="secondPassword" />
                            </Form.Item>
                        </div>
                    </div>
                    {secondPasswordError ? <PasswordsNotMatchTitle>Passwords do not match</PasswordsNotMatchTitle> : null}

                    <Button variant={VARIANT.PRIMARY} loading={isLoading} size={SIZE.MEDIUM} type="submit">
                        Reset Password
                    </Button>
                </Form>
            </BoxDiv>
        </BoxDivContainer>
    );
};

export default Security;
