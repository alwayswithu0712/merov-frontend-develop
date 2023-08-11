import React, { useContext, useState } from 'react';
import { notification } from 'antd';
import Router from 'next/router';
import { useFormik } from 'formik';
import { Order, OrderStatus } from '../../../../typings/order';
import Detail from '../../../components/Detail';
import { OrderContext } from '../../../../context/OrderContext';
import merovService from '../../../../services/merov';
import DisputeOrderModal from '../modals/DisputeOrderModal';
import { createTable } from '../helper/table';
import { toShortString } from '../../../../helpers/wallet';
import { handleChatClick } from '../helper/handleChat';

const validate = (values) => {
    const errors: { trackingNumber?: string } = {};

    if (!values.trackingNumber) {
        errors.trackingNumber = 'Tracking code is required';
    }
    return errors;
};

export default function OrderPaid({ order, isSeller }: { order: Order; isSeller: boolean }) {
    const [isShippingLoading, setIsShippingLoading] = useState<boolean>(false);
    const [areButtonsDisabled, setAreButtonsDisabled] = useState<boolean>(false);
    const [isDisputeLoading, setIsDisputeLoading] = useState<boolean>(false);
    const [isDisputeModalOpen, setIsDisputeModalOpen] = useState<boolean>(false);

    const setOrder = useContext(OrderContext);

    const formik = useFormik({
        initialValues: {
            trackingNumber: '',
        },
        validate,
        onSubmit: (values) => {
            handleUpdateShippingStatus(values);
        },
    });

    const handleUpdateShippingStatus = async (values): Promise<void> => {
        setIsShippingLoading(true);
        setAreButtonsDisabled(true);
        try {
            const updatedOrder = await merovService.secureApi().updateOrder(order.id, {
                trackingNumber: values.trackingNumber,
                status: OrderStatus.Shipped,
            });
            setOrder(updatedOrder);
        } catch (error) {
            notification.open({
                message: 'Error',
                description: 'Error updating order',
                duration: 2,
                className: 'error',
            });
        } finally {
            setIsShippingLoading(false);
            setAreButtonsDisabled(false);
        }
    };

    const onDisputeButtonClick = async (disputeReason: string) => {
        setIsDisputeLoading(true);
        setAreButtonsDisabled(true);
        try {
            const updatedOrder = await merovService.secureApi().updateOrder(order.id, {
                status: OrderStatus.Disputed,
                disputeReason,
            });
            setOrder(updatedOrder);
        } catch (error) {
            notification.open({
                message: 'Error',
                description: 'Error disputing the order',
                duration: 2,
                className: 'error',
            });
        } finally {
            setAreButtonsDisabled(false);
            setIsDisputeLoading(false);
            setIsDisputeModalOpen(false);
        }
    };

    return (
        <>
            <DisputeOrderModal
                shouldOpen={isDisputeModalOpen}
                onCloseModal={() => setIsDisputeModalOpen(false)}
                onSubmitDispute={onDisputeButtonClick}
                cancelButton={{ disabled: areButtonsDisabled }}
                acceptButton={{ loading: isDisputeLoading, disabled: areButtonsDisabled }}
            />
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
                textTitle={isSeller ? `The escrow wallet has been funded. ` : `Escrow wallet has been funded. `}
                textSubTitle={isSeller ? `Please ship the order as agreed` : "You'll be notified when the order has shipped."}
                handleChatClick={!isSeller ? () => handleChatClick(order.chatId) : null}
                tableData={createTable(order)}
                inputData={
                    isSeller
                        ? {
                              label: 'Please provide shipment tracking',
                              value: formik.values.trackingNumber,
                              onChange: (e) => {
                                  formik.setFieldValue('trackingNumber', e.target.value);
                              },
                              error: formik.touched.trackingNumber ? formik.errors.trackingNumber : '',
                          }
                        : null
                }
                inputWallet={
                    !isSeller
                        ? {
                              defaultValue: toShortString(order.escrowAddress),
                              valueToCopy: order.escrowAddress,
                              disabled: true,
                          }
                        : null
                }
                inputTotalData={
                    !isSeller
                        ? {
                              disabled: true,
                              value: order.total,
                              currencyData: {
                                  currency: order.currency,
                                  price: +order.total,
                              },
                          }
                        : null
                }
                rightFirstButton={
                    isSeller
                        ? {
                              children: 'UPDATE SHIPPING STATUS',
                              onClick: () => {
                                  formik.submitForm();
                              },
                              loading: isShippingLoading,
                              disabled: areButtonsDisabled,
                          }
                        : null
                }
                rightSecondButton={
                    !isSeller
                        ? {
                              children: 'Dispute this item',
                              onClick: () => {
                                  setIsDisputeModalOpen(true);
                              },
                              disabled: areButtonsDisabled,
                          }
                        : null
                }
                showContactUs
            />
        </>
    );
}
