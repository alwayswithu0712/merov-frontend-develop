import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useFormik } from 'formik';
import useSignupContainer from './hooks/useSignupContainer';
import MainLayout from '../../layouts/MainLayout';
import Button, { SIZE, VARIANT } from '../../components/buttons/Button';
import Title from '../../components/Title';
import CheckboxCustom from '../../components/inputs/CheckboxCustom';
import COLORS from '../../foundation/colors';
import OrganizationInputs from './form-elements/OrganizationInputs';
import Input from '../../components/inputs/Input';
import InputPassword from '../../components/inputs/InputPassword';
import { signupValidation } from './form-elements/validation';

const Signup = () => {
    const router = useRouter();
    const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
    const [haveInvitation, setHaveInvitation] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            referral: '',
            businessName: '',
            country: '',
            city: '',
            state: '',
            street: '',
            zipcode: '',
            taxpayerNumber: '',
            website: '',
            addOrganization: false,
        },
        validationSchema: signupValidation,
        onSubmit: (values) => {
            handleSignUp(values);
        },
    });

    const redirect = router.query.redirect ?? '';

    useEffect(() => {
        const referral = router.query.r ?? '';
        if (referral) {
            formik.setFieldValue('referral', referral);
            setHaveInvitation(true);
        }
    });

    const { error, tablePropsSignup, handleSignUp, handleSelectStreet } = useSignupContainer({ ...formik }, redirect as string);

    return (
        <MainLayout headTitle="Signup" pageClass={'dashboard'}>
            <section className="signup_page px-2 md:p-0">
                <Title text="Sign up" className="mb-6 text-3xl" />
                <h5 className="singup-login panel_top">
                    Already a member?{' '}
                    <Link href="/api/auth/login" passHref>
                        <a>Login</a>
                    </Link>
                </h5>
                <form onSubmit={(e) => formik.handleSubmit(e)} className="mt-8 z-40 ">
                    <div className="rounded-lg w-full my-3">
                        <Input {...tablePropsSignup.username} className="mt-4" />
                        {tablePropsSignup.username?.errors && tablePropsSignup.username?.touched && (
                            <div className="mt-1">
                                <span className="text-red-600">{tablePropsSignup.username?.errors}</span>
                            </div>
                        )}
                        <Input {...tablePropsSignup.email} className="mt-4" />
                        {tablePropsSignup.email?.errors && tablePropsSignup.email?.touched && (
                            <div className="mt-1">
                                <span className="text-red-600">{tablePropsSignup.email?.errors}</span>
                            </div>
                        )}
                        <InputPassword {...tablePropsSignup.password} className="mt-4" />
                        {tablePropsSignup.password?.errors && tablePropsSignup.password?.touched && (
                            <div className="mt-1">
                                <span className="text-red-600">{tablePropsSignup.password?.errors}</span>
                            </div>
                        )}
                        <InputPassword {...tablePropsSignup.confirmPassword} className="mt-4" />
                        {tablePropsSignup.confirmPassword?.errors && tablePropsSignup.confirmPassword?.touched && (
                            <div className="mt-1">
                                <span className="text-red-600">{tablePropsSignup.confirmPassword?.errors}</span>
                            </div>
                        )}
                        {!formik.values.addOrganization && (
                            <>
                                {' '}
                                <Input {...tablePropsSignup.referral} className="mt-4" />
                                {tablePropsSignup.referral?.errors && tablePropsSignup.referral?.touched && (
                                    <div className="mt-1">
                                        <span className="text-red-600">{tablePropsSignup.referral?.errors}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {!haveInvitation && (
                        <>
                            <div className="flex items-baseline">
                                <div className="flex my-2">
                                    <CheckboxCustom
                                        name="item"
                                        checked={formik.values.addOrganization}
                                        onChange={() => formik.setFieldValue('addOrganization', !formik.values.addOrganization)}
                                    />
                                </div>
                                <div className="inline ml-3 text-sm text-white">I´m owner of an organization</div>
                            </div>
                            {formik.values.addOrganization && (
                                <OrganizationInputs tableProps={tablePropsSignup} handleSelectStreet={handleSelectStreet} />
                            )}
                        </>
                    )}

                    <div role="alert" className="ant-form-item-explain-error">
                        {error}
                    </div>

                    <div className="w-full flex text-start align-super my-3">
                        <div className="flex">
                            <CheckboxCustom
                                onChange={() => setIsTermsAccepted((prevState) => !prevState)}
                                name="visibility"
                                className="offer-product-form-inline"
                                checked={isTermsAccepted}
                                defaultChecked={false}
                            />

                            <p className="ml-3 mr-3 inline-block text-white text-sm">
                                I have read Merov&apos;s{' '}
                                <Link href={'/privacy'} passHref>
                                    <LinkUnderline>Privacy Policy</LinkUnderline>
                                </Link>
                                ,{' '}
                                <Link href={'/commerce'} passHref>
                                    <LinkUnderline>Commerce Policy</LinkUnderline>
                                </Link>
                                , and I agree to the{' '}
                                <Link href={'/terms'} passHref>
                                    <LinkUnderline>Terms of Use</LinkUnderline>
                                </Link>
                                .
                            </p>
                        </div>
                        <div className="max-h-fit">
                            <Button disabled={!isTermsAccepted} type="submit" variant={VARIANT.PRIMARY} size={SIZE.MEDIUM}>
                                Register
                            </Button>
                        </div>
                    </div>
                </form>
            </section>
        </MainLayout>
    );
};

export default Signup;

const LinkUnderline = styled.a`
    color: ${COLORS.GREEN};
    text-decoration-line: underline;
    text-decoration-color: ${COLORS.GREEN};
`;
