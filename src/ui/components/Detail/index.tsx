import React, { useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { DetailProps } from './type';
import COLORS from '../../foundation/colors';
import Button, { VARIANT as VARIANTBTN } from '../buttons/Button';
import Carousel from '../Carousel';
import UserButton from '../buttons/UserButton/index';
import IconButton from '../buttons/IconButton/index';
import Table, { VARIANT as VARIANTTABLE } from '../Table';
import Description from '../Description';
import InputCurrency from '../inputs/InputCurrency';
import InputSelect from '../inputs/InputSelect';
import InputQuantity from '../inputs/InputQuantity/index';
import InputCopy from '../inputs/InputCopy';
import ContactModal from '../../layouts/modals/ContactModal';
import UnstyledButton from '../buttons/UnstyledButton';
import ArrowLeftLogo from '../../../assets/icons/ArrowLeft';
import Input from '../inputs/Input';
import RelatedProducts from '../RelatedProducts';

const shippingDurationOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 7, label: '7' },
    { value: 10, label: '10' },
    { value: 14, label: '14' },
    { value: 30, label: '30' },
    { value: 60, label: '60' },
];

export default function Detail({
    imagesCarousel = [],
    textLeft,
    leftFirstButton,
    leftSecondButton,
    textTitle,
    textSubTitle,
    account,
    tableData = [],
    descriptionData,
    handleChatClick,
    inputData,
    inputPriceData,
    inputShippingData,
    inputShippingAddressData,
    inputServiceFeeData,
    inputTotalData,
    inputShippingDurationData,
    inputAmountData,
    inputWallet,
    rightFirstButton,
    rightSecondButton,
    showContactUs,
    idProductForRelatedProducts,
    showVerifyIdentity,
}: DetailProps): JSX.Element {
    const [contactModal, setContactModal] = useState<boolean>(false);

    return (
        <section className="p-2 md:py-12 md:px-24 block overflow-hidden mb-44 w-full">
            <div className="flex justify-start m-0 mb-4">
                <div className="flex items-center cursor-pointer" onClick={Router.back}>
                    <ArrowLeftLogo />
                    <div className="font-normal text-sm ml-4">Go back</div>
                </div>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap">
                <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:w-9/12">
                    <div className="flex flex-col">
                        {imagesCarousel.length > 0 && (
                            <div className="max-h-fit">
                                <div className="m-auto flex">
                                    <Carousel images={imagesCarousel} width={1000} height={1000} zoomImage className="m-auto" />
                                </div>
                            </div>
                        )}
                        {textLeft && <p className="text-2xl whitespace-nowrap text-ellipsis overflow-hidden my-2">{textLeft}</p>}
                        {leftFirstButton && (
                            <Button
                                loading={leftFirstButton.loading}
                                disabled={leftFirstButton.disabled}
                                variant={VARIANTBTN.TERTIARY}
                                bold
                                className="w-full mt-2"
                                onClick={leftFirstButton.onClick}
                            >
                                {leftFirstButton.children}
                            </Button>
                        )}
                        {leftSecondButton && (
                            <Button
                                loading={leftSecondButton.loading}
                                disabled={leftSecondButton.disabled}
                                variant={VARIANTBTN.TERTIARY}
                                bold
                                className="w-full mt-2"
                                onClick={leftSecondButton.onClick}
                            >
                                {leftSecondButton.children}
                            </Button>
                        )}
                    </div>
                    <div className="col-span-2 flex flex-col px-6">
                        {textTitle && <h1 className="text-4xl m-0 mt-4 lg:mt-0">{textTitle}</h1>}
                        {textSubTitle && <p className="m-0 mt-4 text-gray-300">{textSubTitle}</p>}
                        <div className={`flex justify-start ${textSubTitle ? 'mt-2' : 'mt-4'}`}>
                            <UserButton
                                className={`w-fit`}
                                variant={VARIANTBTN.SECONDARY}
                                href={`/seller/${account.name}`}
                                showAvatar
                                showName
                                showStars
                                account={{
                                    ...account,
                                }}
                            />
                            {handleChatClick && (
                                <IconButton
                                    variant={VARIANTBTN.SECONDARY}
                                    iconName={'chatIcon'}
                                    className="ml-2"
                                    onClick={handleChatClick}
                                />
                            )}
                        </div>
                        {tableData.length > 0 && <Table variant={VARIANTTABLE.HORIZONTAL} className="mt-4" data={tableData} />}
                        {descriptionData && <Description className="mt-4" title={descriptionData.title} text={descriptionData.text} />}
                    </div>
                </div>
                <InputsContainer className="rounded-lg w-full lg:w-3/12 px-4 pb-4 mt-6 lg:mt-0">
                    {inputData && (
                        <>
                            <Input
                                className="mt-4"
                                placeholder="Enter tracking code"
                                label={inputData.label}
                                value={inputData.value}
                                onChange={inputData.onChange}
                                hasError={!!inputData.error}
                            />
                            {inputData.error && (
                                <div className="mt-1">
                                    <span className="text-red-600">{inputData.error}</span>
                                </div>
                            )}
                        </>
                    )}
                    {inputPriceData && (
                        <InputCurrency
                            className="mt-4"
                            label="Price"
                            placeholder="Price"
                            value={inputPriceData.value}
                            disabled={inputPriceData.disabled}
                            currencyData={inputPriceData.currencyData}
                            addCopyButton
                        />
                    )}
                    {inputShippingData && (
                        <>
                            <InputCurrency
                                className="mt-4"
                                label="Shipping cost"
                                placeholder="Enter shipping cost"
                                value={`${inputShippingData.value}`}
                                disabled={inputShippingData.disabled}
                                hasError={!!inputShippingData.error}
                                onChange={inputShippingData.onChange}
                                currencyData={inputShippingData.currencyData}
                                addCopyButton
                            />
                            {inputShippingData.error && (
                                <div className="mt-1">
                                    <span className="text-red-600">{inputShippingData.error}</span>
                                </div>
                            )}
                        </>
                    )}
                    {inputServiceFeeData && (
                        <InputCurrency
                            className="mt-4"
                            label="Service Fee Cost"
                            placeholder="Write Service Fee Cost"
                            value={inputServiceFeeData.value}
                            disabled={inputServiceFeeData.disabled}
                            currencyData={inputServiceFeeData.currencyData}
                            addCopyButton
                        />
                    )}
                    {inputTotalData && (
                        <>
                            <div className="mt-4">
                                <span className="text-sm font-semibold">Total</span>
                            </div>
                            <InputCurrency
                                className="mt-2"
                                placeholder="Total"
                                disabled={inputTotalData.disabled}
                                value={inputTotalData.value}
                                currencyData={inputTotalData.currencyData}
                                addCopyButton
                            />
                        </>
                    )}
                    {inputShippingDurationData && (
                        <>
                            <InputSelect
                                className="mt-4"
                                label="When should the buyer expect its purchase?"
                                placeholder="Select shipping time"
                                onChange={inputShippingDurationData.onChange}
                                options={shippingDurationOptions}
                                disabled={inputShippingDurationData.disabled}
                                hasError={!!inputShippingDurationData.error}
                            />
                            {inputShippingDurationData.error && (
                                <div className="mt-1">
                                    <span className="text-red-600">{inputShippingDurationData.error}</span>
                                </div>
                            )}
                        </>
                    )}
                    {inputShippingAddressData && (
                        <>
                            <InputSelect
                                className="mt-4"
                                label="Ship to"
                                placeholder="Select ship address"
                                onChange={inputShippingAddressData.onChange}
                                value={inputShippingAddressData.value}
                                options={inputShippingAddressData.options}
                                disabled={inputShippingAddressData.disabled}
                                hasError={!!inputShippingAddressData.error}
                            />
                            {inputShippingAddressData.error && (
                                <div className="mt-1">
                                    <span className="text-red-600">{inputShippingAddressData.error}</span>
                                </div>
                            )}
                        </>
                    )}
                    {inputAmountData && (
                        <InputQuantity
                            className="mt-4"
                            label="Amount"
                            placeholder="Amount"
                            value={inputAmountData.value}
                            min={inputAmountData.min}
                            max={inputAmountData.max}
                            avaliable={inputAmountData.avaliable}
                            disabled={inputAmountData.disabled}
                            onChange={inputAmountData.onChange}
                        />
                    )}
                    {inputWallet && (
                        <InputCopy
                            disabled={inputWallet.disabled}
                            defaultValue={inputWallet.defaultValue}
                            valueToCopy={inputWallet.valueToCopy}
                            label="Escrow wallet"
                            className="mt-4 w-full"
                            name={'Escrow wallet'}
                            placeholder={''}
                        />
                    )}
                    {rightFirstButton && (
                        <Button
                            loading={rightFirstButton.loading}
                            disabled={rightFirstButton.disabled}
                            variant={VARIANTBTN.PRIMARY}
                            className={`w-full ${rightFirstButton.className ? rightFirstButton.className : 'mt-6'}`}
                            onClick={rightFirstButton.onClick}
                            onMouseEnter={rightFirstButton.onMouseEnter}
                            onMouseLeave={rightFirstButton.onMouseLeave}
                        >
                            {rightFirstButton.children}
                        </Button>
                    )}
                    {showVerifyIdentity && <p className="text-sm text-gray-300 mt-1">Please verify your identity to make this purchase.</p>}
                    {rightSecondButton && (
                        <Button
                            loading={rightSecondButton.loading}
                            disabled={rightSecondButton.disabled}
                            variant={VARIANTBTN.TERTIARY}
                            className={`w-full ${rightSecondButton.className ? rightSecondButton.className : 'mt-4'}`}
                            onClick={rightSecondButton.onClick}
                        >
                            {rightSecondButton.children}
                        </Button>
                    )}
                    {showContactUs && (
                        <div className={'mt-4'}>
                            <p className="m-0 text-sm">
                                Have a problem with the order?{' '}
                                <UnstyledButton onClick={() => setContactModal(true)} customStyle={`color: ${COLORS.GREEN}`}>
                                    Contact Us
                                </UnstyledButton>
                            </p>
                        </div>
                    )}
                </InputsContainer>
            </div>
            {idProductForRelatedProducts && <RelatedProducts productId={idProductForRelatedProducts} className="mt-16" />}
            <ContactModal contactModal={contactModal} setContactModal={setContactModal} />
        </section>
    );
}
const InputsContainer = styled('div')`
    height: fit-content;
    background-color: ${COLORS.ALMOSTBLACK};
    border: 1px solid ${COLORS.STROKEGREY};
`;
