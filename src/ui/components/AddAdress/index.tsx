/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useEffect, useMemo, useState } from 'react';
import { AutoComplete as AutoCompleteAnt, Form } from 'antd';
import AutoComplete from 'react-google-autocomplete';
import styled from 'styled-components';
import StringValidator from '../../../helpers/validators/StringValidator';
import { countries } from '../../../services/location';
import { addAddressPropsType } from '../../../hooks/useAddressContainer';
import Button, { SIZE, VARIANT as BTN_VARIANT } from '../buttons/Button';
import Input from '../inputs/Input';
import {clearInputNumbersForPhone} from '../../../helpers/clearInputNumbers';
import { useCompatibilityAntdForm } from '../../../hooks/useCompatibilityAntdForm';
import { DeliveryAddress } from '../../../typings/deliveryAddress';

export type PurchaseProps = {
    submitButtonText: string;
    useAdressObject: addAddressPropsType;
    postOrder: any;
    onSubmitEdit: () => {};
    addressPostedId: string;
    addresses: DeliveryAddress[];
    deliveryAddress?: DeliveryAddress;
    countryState?: string;
    setCountryState?: Function;
};

enum FORM_FIELDS {
    NAME = 'name',
    COUNTRY = 'country',
    STATE = 'state',
    PHONE = 'phone',
    POSTCODE = 'postcode',
    CITY = 'city',
    STREET = 'street',
}

const initialErrorFields = {
    name: false,
    country: false,
    state: false,
    phone: false,
    postcode: false,
    city: false,
    street: false,
};

const AddAdress: FC<PurchaseProps> = ({
    submitButtonText,
    createAddress,
    onSubmitEdit,
    deliveryAddress,
    addresses,
    useAdressObject,
    postOrder,
}) => {
    const {
        addressData,
        countriesOptions,
        setAddressData,
        handleSelectCountry,
        onCloseModal,
        handleChangeInput,
        handleSelectStreet,
        onSubmit,
    } = useAdressObject;
    const [loading, setLoading] = useState<boolean>(false);
    const [optionsCountry, setOptionsCountry] = useState(countriesOptions);
    const { NameValidator, StreetValidator, StateValidator, PostCodeValidator, CityValidator, PhoneValidator } = StringValidator();
    const [form] = Form.useForm();

    const { errors, setErrors, handleOnFinishFormErrors, handleSetError } =
        useCompatibilityAntdForm<typeof initialErrorFields>(initialErrorFields);

    const country = useMemo(() => countries.find((country) => addressData?.country === country.name)?.iso2 || '', [addressData]);

    useEffect(() => {
        if (deliveryAddress?.id !== addressData?.id && submitButtonText !== 'Send to Seller') {
            setAddressData(deliveryAddress);
        }
    }, [deliveryAddress, addressData, setAddressData]);

    useEffect(() => {
        form.setFieldsValue(addressData);
    }, [addressData, form]);

    const onSearch = (value: string) => {
        setOptionsCountry(
            countriesOptions.filter((country) => country.label.toUpperCase().substring(0, value.length) === value.toUpperCase()),
        );
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (!addressData.id) {
            const resp = await onSubmit();
            if (postOrder) {
                await postOrder(resp.id);
            }
            if (createAddress) {
                createAddress(resp);
            }
            onCloseModal();
            setLoading(false);
        } else {
            const found = addresses.find((add) => add.id === addressData.id);
            if (found) {
                delete found.updatedAt;
                delete found.userId;
                delete found.createdAt;
            }
            if (JSON.stringify(found) === JSON.stringify(addressData)) {
                if (postOrder) {
                    await postOrder(addressData.id);
                }
                onCloseModal();
                setLoading(false);
            } else {
                const resp = await onSubmit();
                if (createAddress) {
                    createAddress(resp);
                }
                if (postOrder) {
                    await postOrder(resp.id);
                }
                onCloseModal();
                setLoading(false);
            }
        }
    };

    const handleOnCloseModal = () => {
        setErrors(initialErrorFields);
        form.resetFields();
        onCloseModal();
    };

    return (
        <Form
            form={form}
            className="row form"
            onFinish={submitButtonText === 'Edit Address' ? onSubmitEdit : handleSubmit}
            onFinishFailed={(e) => {
                handleOnFinishFormErrors(e, () => {
                    form.setFieldsValue(addressData);
                });
            }}
        >
            <Form.Item
                name={FORM_FIELDS.NAME}
                className="w-full"
                validateTrigger="onChange"
                rules={[
                    {
                        validator: (e, a) => NameValidator(a, FORM_FIELDS.NAME, handleSetError),
                    },
                ]}
            >
                <Input
                    label="Address Name"
                    value={addressData?.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeInput(e, FORM_FIELDS.NAME);
                    }}
                    placeholder="Enter address name"
                    hasError={errors.name}
                />
            </Form.Item>
            <Form.Item
                name={FORM_FIELDS.COUNTRY}
                className="w-full"
                validateTrigger="onChange"
                rules={[
                    {
                        required: true,
                        message: 'Country is required',
                    },
                ]}
            >
                <div className="input_custom">
                    <label className="aic input__label mb-7">Country</label>
                    <div className="aic input__wrap">
                        <AutoCompleteAnt
                            placeholder={"Select a country"}
                            value={addressData?.country || deliveryAddress?.country}
                            options={optionsCountry}
                            className="select_custom"
                            onSearch={onSearch}
                            onSelect={handleSelectCountry}
                            onChange={(value: string) => handleSelectCountry(value)}
                        />
                    </div>
                </div>
            </Form.Item>
            {addressData?.country ? (
                <Form.Item
                    name={FORM_FIELDS.STREET}
                    className="w-full"
                    validateTrigger="onChange"
                    rules={[
                        {
                            validator: (e, a) => StreetValidator(a),
                        },
                    ]}
                >
                    <div className="input_custom">
                        <label className="aic input__label mb-7">Street address</label>
                        <div className="aic input__wrap">
                            <AutoComplete
                                placeholder="Enter your street address"
                                options={{
                                    types: ['address'],
                                    componentRestrictions: { country },
                                }}
                                apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
                                onPlaceSelected={(place: any) => handleSelectStreet(place)}
                                defaultValue={addressData?.street}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'street')}
                            />
                        </div>
                    </div>
                </Form.Item>
            ) : (
                false
            )}
            <Form.Item
                name={FORM_FIELDS.CITY}
                className="w-full"
                validateTrigger="onChange"
                rules={[
                    {
                        validator: (e, a) => CityValidator(a, FORM_FIELDS.CITY, handleSetError),
                    },
                ]}
            >
                <Input
                    value={addressData?.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeInput(e, FORM_FIELDS.CITY);
                    }}
                    label="City"
                    placeholder="Enter city"
                    hasError={errors.city}
                />
            </Form.Item>
            <Form.Item
                name={FORM_FIELDS.STATE}
                className="w-full"
                validateTrigger="onChange"
                rules={[
                    {
                        validator: (e, a) => StateValidator(a, FORM_FIELDS.STATE, handleSetError),
                    },
                ]}
            >
                <Input
                    value={addressData?.state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeInput(e, FORM_FIELDS.STATE);
                    }}
                    label="State"
                    placeholder="Enter your state"
                    hasError={errors.state}
                />
            </Form.Item>
            <Form.Item
                name={FORM_FIELDS.POSTCODE}
                className="w-full"
                validateTrigger="onChange"
                rules={[
                    {
                        validator: (e, a) => PostCodeValidator(a, FORM_FIELDS.POSTCODE, handleSetError),
                    },
                ]}
            >
                <Input
                    value={addressData?.postcode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeInput(e, FORM_FIELDS.POSTCODE);
                    }}
                    label="Zip Code"
                    placeholder="Enter zip code"
                    hasError={errors.postcode}
                />
            </Form.Item>
            <Form.Item
                name={FORM_FIELDS.PHONE}
                className="w-full"
                validateTrigger="onChange"
                rules={[
                    {
                        validator: (e, a) => PhoneValidator(a, FORM_FIELDS.PHONE, handleSetError),
                    },
                ]}
            >
                <Input
                    type="tel"
                    onKeyDown={clearInputNumbersForPhone}
                    value={addressData?.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeInput(e, FORM_FIELDS.PHONE);
                    }}
                    label="Phone Number"
                    placeholder="Enter phone number"
                    hasError={errors.phone}
                />
            </Form.Item>
            <Form.Item>
                <ButtonsDiv>
                    <Button
                        variant={BTN_VARIANT.SECONDARY}
                        disabled={loading}
                        className="w-full"
                        size={SIZE.MEDIUM}
                        type="reset"
                        onClick={handleOnCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full"
                        variant={BTN_VARIANT.PRIMARY}
                        disabled={loading}
                        loading={loading}
                        size={SIZE.MEDIUM}
                        type="submit"
                    >
                        {submitButtonText}
                    </Button>
                </ButtonsDiv>
            </Form.Item>
        </Form>
    );
};

export default AddAdress;

const ButtonsDiv = styled.div`
    display: flex;
    margin-top: 20px;
    gap: 16px;
`;
