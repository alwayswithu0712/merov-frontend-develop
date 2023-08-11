import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import Router from 'next/router';
import { useFormik } from 'formik';
import { useMerovUser } from '../../../hooks/useMerovUser';
import { usePurchaseValidator } from '../../../hooks/usePurchaseValidator';
import { Product } from '../../../typings/product';
import Detail from '../../components/Detail';
import { Chat } from '../../../typings/chat';
import merovService from '../../../services/merov';
import { DeliveryAddress } from '../../../typings/deliveryAddress';
import AddAddressModal from '../../components/modals/AddAddressModal';
import MainLayout from '../../layouts/MainLayout';

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

interface ProductProps {
    product: Product;
}

export default function ProductView({ product }: ProductProps) {
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

    const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
    const [modalAddress, setModalAddress] = useState<boolean>(false);
    const [isBuyButtonDisabled, setIsBuyButtonDisabled] = useState<boolean>(false);
    const user = useMerovUser();

    const isPurchaseValid = usePurchaseValidator();

    const purchaseProduct = async (values) => {
        if (!isPurchaseValid || isBuyButtonDisabled) return;
        if (!user.id) {
            Router.push(`/api/auth/login?redirect=/products/${product.id}`);
        }
        const newOrder = {
            productId: product.id,
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
        if (user.id) {
            const chat: Chat = await merovService.secureApi().postCreateProductChat(product.id);
            Router.push(`/account/inbox/${chat.id}?hideList=true&&hideSidebar=true`);
        } else {
            Router.push(`/api/auth/login?redirect=/products/${product.id}`);
        }
    };

    const getAddresses = async () => {
        try {
            const data = await merovService.secureApi().getAddresses();
            if (data) {
                setAddresses(data);
            } else {
                notification.open({
                    message: 'Failed to fetch address',
                    className: 'error',
                });
            }
        } catch (err) {
            notification.open({
                message: 'Failed to fetch address',
                className: 'error',
            });
        }
    };

    useEffect(() => {
        if (user.id) {
            getAddresses();
        }
    }, [user.id]);

    return (
        <MainLayout headTitle={product.title}>
            <Detail
                account={product.seller}
                imagesCarousel={product.images}
                handleChatClick={user.accountId && user.accountId !== product.seller.id ? handleChatClick : null}
                textTitle={product.title}
                tableData={[
                    { title: 'Condition', text: product.condition || '' },
                    { title: 'Category', text: `${product.category?.name} > ${product.subcategory?.name}` },
                    { title: 'Blockchain', text: product.chain },
                ]}
                descriptionData={{
                    title: 'About this item',
                    text: product.description,
                }}
                idProductForRelatedProducts={product.id}
                inputPriceData={{
                    disabled: true,
                    value: product.price,
                    currencyData: {
                        currency: product.currency,
                        price: +product.price,
                    },
                }}
                inputAmountData={{
                    disabled: !user.accountId || user.accountId === product.seller.id,
                    value: formik.values.quantity,
                    label: 'Amount',
                    placeholder: 'Amount',
                    onChange: (value: number) => {
                        formik.setFieldValue('quantity', value);
                    },
                    min: 1,
                    max: product.stock,
                    avaliable: product.stock,
                }}
                inputShippingAddressData={{
                    disabled: !user.accountId || user.accountId === product.seller.id,
                    value: formik.values.deliveryAddressId,
                    error: formik.touched.deliveryAddressId ? formik.errors.deliveryAddressId : '',
                    customValue: formik.values.deliveryAddressId,
                    onChange: (option) => {
                        formik.setFieldValue('deliveryAddressId', option.value);
                    },
                    options: [
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
                    ],
                }}
                rightFirstButton={{
                    disabled:
                        !user.accountId ||
                        isBuyButtonDisabled ||
                        product.stock === 0 ||
                        formik.values.quantity === 0 ||
                        user.accountId === product.seller.id ||
                        !isPurchaseValid,
                    loading: isBuyButtonDisabled,
                    onClick: formik.submitForm,
                    children: 'BUY',
                }}
                showVerifyIdentity={!user.accountId || (user.accountId !== product.seller.id && !isPurchaseValid)}
            />
            <AddAddressModal
                addMode={true}
                deliveryAddress={null}
                visible={modalAddress}
                setVisible={() => {
                    formik.setFieldValue('deliveryAddressId', '');
                    getAddresses();
                    setModalAddress(false);
                }}
            />
        </MainLayout>
    );
}
