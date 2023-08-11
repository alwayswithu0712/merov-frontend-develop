import React, { useContext, useState } from 'react';
import Router from 'next/router';
import { useFormik } from 'formik';
import { notification } from 'antd';
import { Order, OrderStatus } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { usePurchaseValidator } from '../../../../hooks/usePurchaseValidator';
import { OrderContext } from '../../../../context/OrderContext';
import merovService from '../../../../services/merov';
import { createTable } from '../helper/table';
import { handleChatClick } from '../helper/handleChat';

const validate = (values) => {
    const errors: { shippingCost?: string; maxShippingDurationInDays?: string } = {};
    if (values.shippingCost === undefined) {
        errors.shippingCost = 'Shipping cost is required';
    }
    if (values.maxShippingDurationInDays === null) {
        errors.maxShippingDurationInDays = 'Shipping time is required';
    }
    return errors;
};

export default function OrderCreated({ order, isSeller }: { order: Order; isSeller: boolean }) {
    const formik = useFormik({
        initialValues: {
            shippingCost: order.shippingCost || 0,
            maxShippingDurationInDays: null,
        },
        validate,
        onSubmit: (values) => {
            handleAcceptOrder(values);
        },
    });
    const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false);
    const [isDeclineLoading, setIsDeclineLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const setOrder = useContext(OrderContext);
    const isPurchaseValid = usePurchaseValidator();

    const handleLoadingButton = (isLoadingDecline: boolean, isLoadingAccept: boolean): void => {
        setDisabled(isLoadingDecline || isLoadingAccept);
        setIsAcceptLoading(isLoadingAccept);
        setIsDeclineLoading(isLoadingDecline);
    };

    const handleAcceptOrder = async (values): Promise<void> => {
        if (!isPurchaseValid) return;
        handleLoadingButton(false, true);
        const { shippingCost, maxShippingDurationInDays } = values;
        try {
            const updatedOrder = await merovService.secureApi().updateOrder(order.id, {
                shippingCost: parseFloat(shippingCost),
                maxShippingDurationInDays,
                status: OrderStatus.Accepted,
            });

            setOrder(updatedOrder);
        } catch (error) {
            notification.open({
                message: 'Error!',
                description: 'Error updating order',
                className: 'error',
            });
        } finally {
            handleLoadingButton(false, false);
        }
    };

    const onDeclineButtonClick = async (): Promise<void> => {
        handleLoadingButton(true, false);
        try {
            const updatedOrder = await merovService.secureApi().updateOrder(order.id, {
                status: OrderStatus.Closed,
            });
            setOrder(updatedOrder);
        } catch (error) {
            notification.open({
                message: 'Error',
                description: error,
                duration: 2,
                className: 'error',
            });
        } finally {
            handleLoadingButton(false, false);
        }
    };

    return (
        <Detail
            account={isSeller ? order.buyer : order.seller}
            imagesCarousel={order.product.images}
            textLeft={order.product.title}
            leftFirstButton={{
                children: 'View Product',
                onClick: () => {
                    Router.push(`/products/${order.product.id}`);
                },
            }}
            textTitle={
                isSeller ? `@${order.buyer.name} tigerking has requested to purchase this item` : 'Your purchase has been requested'
            }
            textSubTitle={
                isSeller ? `Please review the offer carefully ` : 'We have notified the seller and will let you know if he accepts.'
            }
            handleChatClick={!isSeller ? () => handleChatClick(order.chatId) : null}
            tableData={createTable(order)}
            inputPriceData={{
                disabled: true,
                value: `${order.price || ''}`,
                currencyData: {
                    currency: order.currency,
                    price: +order.price,
                },
            }}
            inputShippingData={{
                disabled: !isSeller,
                value: formik.values.shippingCost,
                error: formik.touched.shippingCost ? formik.errors.shippingCost : '',
                currencyData: {
                    currency: order.currency,
                    price: +formik.values.shippingCost,
                },
                onChange: (e) => {
                    formik.setFieldValue('shippingCost', e.target.value);
                },
            }}
            inputTotalData={{
                disabled: true,
                value: `${isSeller ? order.total + +formik.values.shippingCost : order.total}`,
                currencyData: {
                    currency: order.currency,
                    price: +(isSeller ? order.total + +formik.values.shippingCost : order.total),
                },
            }}
            inputShippingDurationData={
                isSeller
                    ? {
                          disabled: false,
                          error: formik.touched.maxShippingDurationInDays ? formik.errors.maxShippingDurationInDays : '',
                          onChange: (option) => {
                              formik.setFieldValue('maxShippingDurationInDays', option.value);
                          },
                      }
                    : null
            }
            rightFirstButton={
                isSeller
                    ? {
                          children: 'ACCEPT',
                          onClick: () => {
                              formik.submitForm();
                          },
                          loading: isAcceptLoading,
                          disabled: disabled || !isPurchaseValid,
                      }
                    : null
            }
            rightSecondButton={
                isSeller
                    ? {
                          loading: isDeclineLoading,
                          disabled,
                          children: 'Decline',
                          onClick: onDeclineButtonClick,
                      }
                    : null
            }
            showContactUs
            showVerifyIdentity={isSeller && !isPurchaseValid}
        />
    );
}
