import { useCallback, useState } from 'react';
import Auth0 from 'auth0-js';
import { useRouter } from 'next/router';
import { notification } from 'antd';

type Data = {
    addOrganization: boolean;
    businessName: string;
    city: string;
    confirmPassword: string;
    country: string;
    email: string;
    password: string;
    referral?: string;
    state: string;
    street: string;
    taxpayerNumber: string;
    username: string;
    website?: string;
    zipcode: string;
};

const useSignupContainer = ({ values, setFieldValue, errors, touched, setTouched }, customRedirect?: string) => {
    const router = useRouter();
    const [error, setError] = useState<string>('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSignUp = async (data: Data) => {
        const auth0 = new Auth0.WebAuth({
            domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL as string,
            clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
            redirectUri: customRedirect || (process.env.NEXT_PUBLIC_AUTH0_BASE_URL as string),
            scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE as string,
            responseType: 'token id_token',
        });

        const address = {
            country: data.country,
            city: data.city,
            state: data.state.trim(),
            street: data.street,
            postcode: data.zipcode,
        };
        const organization = {
            name: data.businessName,
            taxId: data.taxpayerNumber,
            address: JSON.stringify(address),
            website: data.website,
        };
        auth0.signup(
            {
                connection: 'Username-Password-Authentication',
                email: data.email,
                password: data.password,
                username: data.username,
                userMetadata: {
                    referral: data.referral ?? undefined,
                    organization: data.addOrganization ? JSON.stringify(organization) : undefined,
                },
            },
            (err) => {
                if (err) {
                    const messageError = err.code === 'user_exists' ? 'The email provided is in use already.' : (err.description as string);

                    setError(messageError);
                    notification.error({
                        message: 'Error',
                        description: `${messageError}`,
                    });
                } else {
                    router.push(`/verify`);
                    setError('');
                }
            },
        );
    };

    const tablePropsSignup = {
        username: {
            id: 'username',
            key: 'username',
            label: 'Username',
            placeholder: 'Enter Username',
            value: values.username,
            onChange: (e) => {
                setTouched({ ...touched, username: true });
                setFieldValue('username', e.target.value);
            },
            hasError: touched.username && !!errors.username,
            errors: errors?.username,
            touched: touched.username,
        },
        email: {
            id: 'email',
            key: 'email',
            label: 'Email',
            placeholder: 'Enter Email ',
            value: values.email,
            onChange: (e) => {
                setTouched({ ...touched, email: true });
                setFieldValue('email', e.target.value);
            },
            hasError: touched.email && !!errors.email,
            errors: errors?.email,
            touched: touched.email,
        },
        password: {
            id: 'password',
            key: 'password',
            label: 'Password',
            placeholder: 'Enter Password',
            value: values.password,
            onChange: (e) => {
                setTouched({ ...touched, password: true });
                setFieldValue('password', e.target.value);
            },
            hasError: () => touched.password && !!errors.password,
            showRequirements: true,
            touched: touched.password,
            errors: errors?.password,
            name: 'password',
        },
        confirmPassword: {
            id: 'confirmPassword',
            key: 'confirmPassword',
            label: 'Confirm Password',
            placeholder: 'Confirm Password',
            value: values.confirmPassword,
            onChange: (e) => {
                setTouched({ ...touched, confirmPassword: true });
                setFieldValue('confirmPassword', e.target.value);
            },
            hasError: () => touched.confirmPassword && !!errors.confirmPassword,
            errors: errors?.confirmPassword,
            touched: touched.confirmPassword,
            name: 'confirmPassword',
        },
        referral: {
            id: 'referral',
            key: 'referral',
            label: 'Referral',
            placeholder: 'Enter Referral',
            value: values.referral,
            onChange: (e) => {
                setTouched({ ...touched, referral: true });
                setFieldValue('referral', e.target.value);
            },
            hasError: touched.referral && !!errors.referral,
            errors: errors?.referral,
            touched: touched.referral,
        },
        businessName: {
            id: 'businessName',
            key: 'businessName',
            label: 'Name',
            placeholder: 'Enter Business Name',
            value: values.businessName,
            onChange: (e) => {
                setTouched({ ...touched, businessName: true });
                setFieldValue('businessName', e.target.value);
            },
            hasError: touched.businessName && !!errors.businessName,
            errors: errors?.businessName,
            touched: touched.businessName,
        },
        country: {
            id: 'country',
            key: 'country',
            label: 'Country',
            placeholder: 'Enter Country ',
            value: values.country,
            onChange: (e) => {
                setTouched({ ...touched, country: true });
                setFieldValue('country', e.target.value);
            },
            hasError: touched.country && !!errors.country,
            errors: errors?.country,
            touched: touched.country,
        },
        street: {
            id: 'street',
            key: 'street',
            label: 'Street',
            placeholder: 'Enter Street',
            value: values.street,
            onChange: (e) => {
                setTouched({ ...touched, street: true });
                setFieldValue('street', e.target.value);
            },
            hasError: touched.street && !!errors.street,
            errors: errors?.street,
            touched: touched.street,
        },
        city: {
            id: 'city',
            key: 'city',
            label: 'City',
            placeholder: 'Enter City',
            value: values.city,
            onChange: (e) => {
                setTouched({ ...touched, city: true });
                setFieldValue('city', e.target.value);
            },
            hasError: touched.city && !!errors.city,
            touched: touched.city,
            errors: errors?.city,
        },
        state: {
            id: 'state',
            key: 'state',
            label: 'State',
            placeholder: 'Enter State',
            value: values.state,
            onChange: (e) => {
                setTouched({ ...touched, state: true });
                setFieldValue('state', e.target.value);
            },
            hasError: touched.referral && !!errors.state,
            errors: errors?.state,
            touched: touched.state,
        },
        zipcode: {
            id: 'zipcode',
            key: 'zipcode',
            label: 'Zipcode',
            placeholder: 'Enter Zipcode',
            value: values.zipcode,
            onChange: (e) => {
                setTouched({ ...touched, zipcode: true });
                setFieldValue('zipcode', e.target.value);
            },
            hasError: touched.referral && !!errors.zipcode,
            errors: errors?.zipcode,
            touched: touched.zipcode,
        },
        taxpayerNumber: {
            id: 'taxpayerNumber',
            key: 'taxpayerNumber',
            label: 'Taxpayer Number',
            placeholder: 'Enter Taxpayer Number',
            value: values.taxpayerNumber,
            onChange: (e) => {
                setTouched({ ...touched, taxpayerNumber: true });
                setFieldValue('taxpayerNumber', e.target.value);
            },
            hasError: touched.taxpayerNumber && !!errors.taxpayerNumber,
            errors: errors?.taxpayerNumber,
            touched: touched.taxpayerNumber,
        },
        website: {
            id: 'website',
            key: 'website',
            label: 'Website',
            placeholder: 'Enter Website',
            value: values.website,
            onChange: (e) => {
                setTouched({ ...touched, website: true });
                setFieldValue('website', e.target.value);
            },
            hasError: touched.website && !!errors.website,
            errors: errors?.website,
            touched: touched.website,
        },
    };

    const handleSelectStreet = useCallback(
        (formattedAddress: any) => {
            const countryData = formattedAddress.address_components?.find((item: any) =>
                item.types.includes('country') ? item.long_name : false,
            );
            const stateData = formattedAddress.address_components?.find((item: any) =>
                item.types.includes('administrative_area_level_1') ? item.long_name : false,
            );
            const cityData = formattedAddress.address_components?.find((item: any) =>
                item.types.includes('locality') ? item.long_name : false,
            );
            const postCodeData = formattedAddress.address_components?.find((item: any) =>
                item.types.includes('postal_code') ? item.long_name : false,
            );

            tablePropsSignup.country.onChange({ target: { value: countryData?.long_name } });

            tablePropsSignup.state.onChange({ target: { value: stateData?.long_name } });

            tablePropsSignup.zipcode.onChange({ target: { value: postCodeData?.long_name } });

            tablePropsSignup.city.onChange({ target: { value: cityData?.long_name } });

            tablePropsSignup.street.onChange({ target: { value: formattedAddress.formatted_address } });
        },
        [values.city, values.country, values.state, values.zipcode],
    );

    return {
        error,
        setError,
        tablePropsSignup,
        handleSelectStreet,
        handleSignUp,
    };
};

export default useSignupContainer;
