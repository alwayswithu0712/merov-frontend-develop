import React, { useState } from 'react';
import { notification } from 'antd';
import Router from 'next/router';
import { useFormik } from 'formik';
import useSWR from 'swr';
import { usePurchaseValidator } from '../../../hooks/usePurchaseValidator';
import Detail from '../../components/Detail';
import { Chat } from '../../../typings/chat';
import merovService from '../../../services/merov';
import { DeliveryAddress } from '../../../typings/deliveryAddress';
import AddAddressModal from '../../components/modals/AddAddressModal';
import MainLayout from '../../layouts/MainLayout';
import { Offer } from '../../../typings/offer';
import { User } from '../../../typings/user';

const validate = (values) => {
    const errors: { quantity?: string; deliveryAddressId?: string } = {};
    if (!values.quantity) {
        errors.quantity = 'Quantity is required';
    }
    if (!values.deliveryAddressId) {
        errors.deliveryAddressId = 'Shipping address is required';
    }
    return errors;
};

interface OfferProps {
    offer: Offer;
    user: User;
}

export default function OfferView({ offer, user }: OfferProps) {
    const formik = useFormik({
        initialValues: {
            quantity: 1,
            deliveryAddressId: '',
        },
        validate,
        onSubmit: (values) => {
            purchaseProduct(values);
        },
    });

    const [modalAddress, setModalAddress] = useState<boolean>(false);
    const [isBuyButtonDisabled, setIsBuyButtonDisabled] = useState<boolean>(false);

    const isPurchaseValid = usePurchaseValidator();

    const { data: addresses, mutate: update } = useSWR('/addresses', merovService.secureApi().getAddresses);

    const purchaseProduct = async (values) => {
        if (!isPurchaseValid || isBuyButtonDisabled) return;
        if (!user.id) {
            Router.push(`/api/auth/login`);
        }
        const newOrder = {
            productId: offer.product.id,
            offerId: offer.id,
            ...values,
        };
        setIsBuyButtonDisabled(true);

        try {
            const order = await merovService.secureApi().postOrder(newOrder);
            Router.push(`/orders/${order.id}`);
            notification.open({
                message: 'You have created an order successfully!',
                description: 'You can see this order in the purchases section',
                className: 'success',
            });
        } catch (error) {
            notification.open({
                message: 'Error!',
                description: 'Error creating order',
                className: 'error',
            });
        } finally {
            setIsBuyButtonDisabled(false);
        }
    };

    const handleChatClick = async () => {
        if (user.accountId) {
            const chat: Chat = await merovService.secureApi().postCreateProductChat(offer.product.id);
            Router.push(`/account/inbox/${chat.id}?hideList=true&&hideSidebar=true`);
        } else {
            Router.push(`/api/auth/login`);
        }
    };

    return (
        <MainLayout headTitle={offer.product.title}>
            <Detail
                account={offer.seller}
                imagesCarousel={offer.product.images}
                handleChatClick={user.accountId && user.accountId !== offer.seller.id ? handleChatClick : null}
                textTitle={offer.product.title}
                tableData={[
                    { title: 'Condition', text: offer.product.condition || '' },
                    { title: 'Blockchain', text: offer.product.chain },
                ]}
                descriptionData={{
                    title: 'About this item',
                    text: offer.product.description,
                }}
                idProductForRelatedProducts={offer.product.id}
                inputPriceData={{
                    disabled: true,
                    value: offer.price,
                    currencyData: {
                        currency: offer.currency,
                        price: +offer.price,
                    },
                }}
                inputAmountData={{
                    disabled: !user.accountId || user.accountId === offer.seller.id,
                    value: formik.values.quantity,
                    label: 'Amount',
                    placeholder: 'Amount',
                    onChange: (value: number) => {
                        formik.setFieldValue('quantity', value);
                    },
                    min: 1,
                    max: offer.product.stock,
                    avaliable: offer.product.stock,
                }}
                inputShippingAddressData={{
                    disabled: !user.accountId || user.accountId === offer.seller.id,
                    value: formik.values.deliveryAddressId,
                    error: formik.touched.deliveryAddressId ? formik.errors.deliveryAddressId : '',
                    customValue: formik.values.deliveryAddressId,
                    onChange: (option) => {
                        formik.setFieldValue('deliveryAddressId', option.value);
                    },
                    options: addresses
                        ? [
                              ...addresses.map((address: DeliveryAddress) => ({
                                  value: address.id,
                                  label: `${address.country}, ${address.city},  ${address.street}`,
                              })),
                              {
                                  value: 'Add Address',
                                  label: 'Add Address',
                                  notSelectable: true,
                                  onClick: () => setModalAddress(true),
                              },
                          ]
                        : [
                              {
                                  value: 'Add Address',
                                  label: 'Add Address',
                                  notSelectable: true,
                                  onClick: () => setModalAddress(true),
                              },
                          ],
                }}
                rightFirstButton={{
                    disabled:
                        !user.accountId ||
                        isBuyButtonDisabled ||
                        offer.product.stock === 0 ||
                        formik.values.quantity === 0 ||
                        user.accountId === offer.seller.id ||
                        !isPurchaseValid,
                    loading: isBuyButtonDisabled,
                    onClick: formik.submitForm,
                    children: 'BUY',
                }}
                showVerifyIdentity={!user.accountId || (user.accountId !== offer.seller.id && !isPurchaseValid)}
            />
            <AddAddressModal
                addMode={true}
                deliveryAddress={null}
                visible={modalAddress}
                setVisible={() => {
                    formik.setFieldValue('deliveryAddressId', '');
                    update();
                    setModalAddress(false);
                }}
            />
        </MainLayout>
    );
}
