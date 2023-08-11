import { Form, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import moment from 'moment';
import styled from 'styled-components';
import useSWR from 'swr';
import { supportedCurrencies } from '../../../services/blockchain';
import { Visibility } from '../../../typings/visibility';
import { ICreateOffer, Product } from '../../../typings/product';
import NumberValidator from '../../../helpers/validators/NumberValidator';
import SelectCustom from '../../components/inputs/SelectCustom';
import DatePickerCustom from '../../components/inputs/DatePickerCustom';
import CheckboxCustom from '../../components/inputs/CheckboxCustom';
import useUploadProductContainer from '../../../hooks/useUploadProductContainer';
import CurrenciesData from '../../../data/currencies';
import COLORS from '../../foundation/colors';
import StringEng from '../../../helpers/localization/en';
import { Wallet } from '../../../typings/wallet';
import * as walletHelper from '../../../helpers/wallet';
import AddWalletModal from '../../components/modals/AddWalletModal';
import merovService from '../../../services/merov';
import Button, { SIZE, VARIANT as BTN_VARIANT } from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import InputCurrency from '../../components/inputs/InputCurrency';
import { Currency } from '../../../typings/currency';
import { useCompatibilityAntdForm } from '../../../hooks/useCompatibilityAntdForm';
import { clearInputNumbers } from '../../../helpers/clearInputNumbers';

interface ProductProps {
    product: Product;
}

const initialErrorFields = {
    price: false,
    quantity: false,
    currency: false,
    shippingCost: false,
    maxTestingTime: false,
    visibility: false,
    sharedWith: false,
    expirationDate: false,
    wallet: false,
};

export default function OfferDetails({ product }: ProductProps) {
    const initialOfferValue: ICreateOffer = {
        productId: product.id,
        price: product.price,
        currency: product.currency,
        chain: product.chain,
        quantity: 1,
        expirationDate: moment().add(7, 'days'),
        maxTestingTime: product.maxTestingTime || 1,
        sellerAddress: product.sellerAddress,
        shippingCost: +product.shippingCost,
        sharedWith: '',
        visibility: Visibility.Public,
    };

    const { errors, handleOnFinishFormErrors, handleSetError } = useCompatibilityAntdForm<typeof initialErrorFields>(initialErrorFields);

    const [offer, setOffer] = useState<ICreateOffer>(
        !sessionStorage.getItem(`offer-edit-${product.id}`)
            ? initialOfferValue
            : (JSON.parse(sessionStorage.getItem(`offer-${product.id}`)!) as ICreateOffer),
    );

    const handleSetOfferState = (value: ICreateOffer) => {
        sessionStorage.setItem(`offer-${product.id}`, JSON.stringify(value));
        setOffer(value);
    };

    useEffect(() => () => {
        if (sessionStorage.getItem(`offer-edit-${product.id}`)) {
            sessionStorage.removeItem(`offer-edit-${product.id}`);
        }
    });

    const { data: exchangeRate } = useSWR(offer.currency, (c) => merovService.api.getPrice(c));

    const { data: wallets, mutate: updateWallets } = useSWR('/wallets', merovService.secureApi().getMyWallets);

    const [addWalletModal, setAddWalletModal] = useState<boolean>(false);

    const [form] = Form.useForm();
    const { checkPrice, checkStock, checkText, checkTestingDays, checkShippingPrice } = NumberValidator();
    const { tableProps } = useUploadProductContainer(offer, handleSetOfferState);

    const handleChangeData = (e, nameField) => {
        const cloneUserData = { ...offer };
        handleSetOfferState({ ...cloneUserData, [nameField]: e });
    };

    const addNewWallet = async () => {
        await updateWallets();
    };

    const handleContinue = () => {
        if (sessionStorage.getItem(`offer-edit-${product.id}`)) {
            sessionStorage.removeItem(`offer-edit-${product.id}`);
        }
        sessionStorage.setItem(`offer-${product.id}`, JSON.stringify(offer));
        Router.push(`/products/${product.id}/offer/preview`);
    };

    const handleChangeWallet = (value: string) => {
        if (value !== 'Add Wallet') {
            handleChangeData(value, 'sellerAddress');
        }
    };

    const onCloseAddWalletModal = () => {
        setAddWalletModal(false);
        if (offer.sellerAddress && offer.chain) {
            form.setFieldsValue({ wallet: walletHelper.toShortStringWithChain(offer.sellerAddress, offer.chain) });
        }
    };

    const handleCancel = async () => {
        await Router.push(`/account/products`);
    };

    if (!exchangeRate || !wallets || !offer) {
        return null;
    }

    return (
        <AllDiv>
            <Form
                form={form}
                fields={[
                    {
                        name: ['price'],
                        value: offer.price,
                    },
                    {
                        name: ['quantity'],
                        value: offer.quantity,
                    },
                    {
                        name: ['currency'],
                        value: offer.currency,
                    },
                    {
                        name: ['shippingCost'],
                        value: offer.shippingCost,
                    },
                    {
                        name: ['maxTestingTime'],
                        value: offer.maxTestingTime,
                    },
                    {
                        name: ['visibility'],
                        value: offer.visibility,
                    },
                    {
                        name: ['sharedWith'],
                        value: offer.sharedWith,
                    },
                    {
                        name: ['expirationDate'],
                        value: moment(offer.expirationDate),
                    },
                    {
                        name: ['wallet'],
                        value: walletHelper.toShortStringWithChain(offer.sellerAddress, offer.chain),
                    },
                ]}
                name="basic"
                size="large"
                onFinish={handleContinue}
                onFinishFailed={handleOnFinishFormErrors}
                layout="vertical"
            >
                <div
                    style={{
                        background: COLORS.ALMOSTBLACK,
                        border: '1px solid #1F2123',
                        padding: '3%',
                    }}
                >
                    <FirstDiv>
                        <div className=" w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 md:gap-8 grid-flow-row-dense justify-center">
                            <Form.Item
                                name="wallet"
                                validateTrigger="onChange"
                                className="col-span-1"
                                rules={[{ required: true, message: 'Wallet is required!' }]}
                            >
                                <SelectCustom
                                    onChange={(e: any) => handleChangeWallet(e)}
                                    className="select_custom "
                                    placeholder="Select Wallet"
                                    label="Wallet Address"
                                    dropdownRender={(menu: any) => (
                                        <>
                                            {menu}
                                            <a onClick={() => setAddWalletModal(true)} className="condition-add">
                                                Add Wallet
                                            </a>
                                        </>
                                    )}
                                >
                                    {wallets?.map((wallet: Wallet, index: number) => (
                                        <Select.Option key={index} value={wallet.address}>
                                            <div className="upload-walletDropdown">
                                                {walletHelper.toShortStringWithChain(wallet.address, wallet.chain)}
                                            </div>
                                        </Select.Option>
                                    ))}
                                </SelectCustom>
                            </Form.Item>
                            <Form.Item
                                name="currency"
                                validateTrigger="onChange"
                                className="col-span-1"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Currency is required',
                                    },
                                ]}
                            >
                                <SelectCustom
                                    onChange={(e: any) => handleChangeData(e, 'currency')}
                                    className="select_custom"
                                    placeholder="Select Currency"
                                    label="Currency"
                                    value={offer.currency}
                                >
                                    {supportedCurrencies(offer.chain)
                                        .map((item) => item.name)
                                        .map((currency) => (
                                            <Select.Option value={currency} key={currency}>
                                                <div className="uploadForm-img-currency-row">
                                                    <div className="uploadForm-img-currency">{CurrenciesData[currency].getImg()}</div>
                                                    <div>{currency}</div>
                                                </div>
                                            </Select.Option>
                                        ))}
                                </SelectCustom>
                            </Form.Item>
                        </div>
                        {/* </FormRowContainer> */}

                        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 md:gap-8 grid-flow-row-dense justify-center">
                            <Form.Item
                                name="price"
                                validateTrigger="onChange"
                                className="col-span-1"
                                rules={[
                                    {
                                        validator: (e, a) => checkPrice(a, form.getFieldValue('currency') as Currency),
                                    },
                                ]}
                            >
                                <InputCurrency
                                    {...tableProps.data[1]}
                                    currencyData={{ currency: offer.currency, price: offer.price }}
                                    hasError={form.getFieldError('price').length > 0}
                                />
                            </Form.Item>

                            <Form.Item
                                name="shippingCost"
                                validateTrigger="onChange"
                                className="col-span-1"
                                rules={[
                                    {
                                        validator: (e, a) => checkShippingPrice(a),
                                    },
                                ]}
                            >
                                <InputCurrency
                                    {...tableProps.data[4]}
                                    currencyData={{ currency: offer.currency, price: offer.shippingCost }}
                                    hasError={form.getFieldError('shippingCost').length > 0}
                                />
                            </Form.Item>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-8 grid-flow-row-dense justify-center">
                            <Form.Item
                                name="quantity"
                                validateTrigger="onChange"
                                className="col-span-1"
                                rules={[
                                    {
                                        validator: (e, a) => checkStock(a, product, 'quantity', handleSetError),
                                    },
                                ]}
                            >
                                <Input type='text' onKeyDown={clearInputNumbers} {...tableProps.data[5]} hasError={errors.quantity} />
                            </Form.Item>
                            <Form.Item
                                name="maxTestingTime"
                                validateTrigger="onChange"
                                className="col-span-1"
                                rules={[
                                    {
                                        validator: (e, a) => checkTestingDays(a, 'max', undefined, handleSetError),
                                    },
                                ]}
                            >
                                <Input type="number" {...tableProps.data[7]} hasError={errors.maxTestingTime} />
                            </Form.Item>
                        </div>
                        <div className="row">
                            <CheckBoxContainer className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                <CheckBoxDiv>
                                    <CheckboxCustom
                                        onChange={() =>
                                            handleChangeData(
                                                offer.visibility === Visibility.Private ? Visibility.Public : Visibility.Private,
                                                'visibility',
                                            )
                                        }
                                        name="visibility"
                                        className="offer-product-form-inline"
                                        checked={offer.visibility === Visibility.Private}
                                        defaultChecked={offer.visibility === Visibility.Private}
                                    />
                                </CheckBoxDiv>

                                <PrivateDiv>
                                    <OfferPrivateText>{StringEng.setOffer}</OfferPrivateText>
                                    <OfferPublicLaterText>({StringEng.youCanset})</OfferPublicLaterText>
                                </PrivateDiv>
                            </CheckBoxContainer>
                            <Form.Item
                                name="expirationDate"
                                className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-5 md:mt-0"
                                validateTrigger="onChange"
                                rules={[{ required: true, message: 'Expiration is required!' }]}
                            >
                                <DatePickerCustom {...tableProps.data[8]} className="offer-product-form-inline" />
                            </Form.Item>
                        </div>

                        {offer.visibility === Visibility.Private && (
                            <Form.Item
                                name="sharedWith"
                                validateTrigger="onChange"
                                className="col-12"
                                rules={[
                                    {
                                        validator: (e, a) => checkText(a, 'sharedWith', handleSetError),
                                    },
                                ]}
                            >
                                <Input type="text" {...tableProps.data[6]} hasError={errors.sharedWith} />
                            </Form.Item>
                        )}
                        <hr style={{ color: '#444647' }} />
                        <div className="text-center">
                            <TotalCost>
                                Total:{' '}
                                <NumberAndCurrency>
                                    {Number(offer.price) + Number(offer.shippingCost)} {offer.currency}
                                </NumberAndCurrency>
                            </TotalCost>
                        </div>
                    </FirstDiv>
                </div>
                <ButtonsDiv>
                    <Button variant={BTN_VARIANT.TERTIARY} size={SIZE.MEDIUM} onClick={handleCancel} className="col-4">
                        {StringEng.cancel}
                    </Button>
                    <Button type="submit" variant={BTN_VARIANT.SECONDARY} size={SIZE.MEDIUM} className="col-4">
                        {StringEng.continue}
                    </Button>
                </ButtonsDiv>
            </Form>
            <AddWalletModal
                addWalletModal={addWalletModal}
                onCloseAddWalletModal={onCloseAddWalletModal}
                addNewWallet={addNewWallet}
            ></AddWalletModal>
        </AllDiv>
    );
}

const AllDiv = styled.div`
    flex-direction: column;
    max-width: 780px;
    width: 100%;
    align-items: center;
    @media (max-width: 800px) {
        width: 90%;
    }
`;

const FirstDiv = styled.div`
    justify-content: center;
    width: 100%;
`;

const TotalCost = styled.h2`
    font-family: Poppins;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 27px;
    margin: 5% 0px;
`;
const NumberAndCurrency = styled.span`
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: ${COLORS.GREEN};
`;
const CheckBoxContainer = styled.div`
    display: flex;
    text-align: start;
    vertical-align: super;
`;
const CheckBoxDiv = styled.div`
    display: inline-block;
    margin-left: 10px;
    margin-top: 40px;
`;

const PrivateDiv = styled.div`
    margin-left: 30px;
    display: inline-block;
    margin-top: 30px;
`;

const OfferPrivateText = styled.div`
    margin: 2px 0px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${COLORS.WHITE};
`;
const OfferPublicLaterText = styled.div`
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${COLORS.LIGHTGREY};
`;

const ButtonsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 16px;
    align-items: center;
    margin: 30px;
    margin-top: 6rem;
`;
