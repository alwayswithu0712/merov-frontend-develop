import moment from 'moment';
import { Order, OrderStatus } from '../../../../typings/order';
import { TableProps } from '../../../components/Table';

export const createTable = (order: Order): TableProps['data'] => {
    const tableData = {
        orderId: { title: 'Order', text: order.id || '' },
        quantity: { title: 'Quantity', text: order.quantity || '' },
        shipsTo: {
            title: 'Ships to',
            text: order.shippingToStreet
                ? `${order.shippingToStreet}, ${order.shippingToCity}, ${order.shippingToCountry} ${order.shippingToPostcode}`.toLocaleUpperCase()
                : '',
        },
        inspectionTime: { title: 'Inspection time', text: order.maxTimeToDisputeInDays ? `${order.maxTimeToDisputeInDays} days` : '' },
        shippingTime: { title: 'Shipping time', text: order.maxShippingDurationInDays ? `${order.maxShippingDurationInDays} days` : '' },
        shippingCost: { title: 'Shipping cost', text: !Number.isNaN(order.shippingCost) ? `${order.shippingCost} ${order.currency}` : '' },
        condition: { title: 'Condition', text: order.product.condition },
        shippedOn: { title: 'Shipped on', text: order.shippedAt ? moment(order.shippedAt).format('ddd, MMM DD YYYY') : '' },
        trackingCode: { title: 'Tracking code', text: order.trackingNumber || '' },
        fundsReleaseOn: {
            title: 'Funds release on',
            text: order.shippedAt
                ? moment(order.shippedAt)
                      .add(order.maxShippingDurationInDays + order.maxTimeToDisputeInDays, 'days')
                      .format('ddd, MMM DD YYYY, hh:mm A')
                : '',
        },
        disputedOn: { title: 'Disputed on', text: order.disputedAt ? moment(order.disputedAt).format('ddd, MMM DD YYYY') : '' },
        disputedReason: { title: 'Dispute reason', text: order.disputeReason || '' },
    };

    const orderData: TableProps['data'] = [tableData.orderId, tableData.quantity, tableData.shipsTo];
    if (order.status === OrderStatus.Accepted || order.status === OrderStatus.Paid) {
        orderData.push(tableData.inspectionTime, tableData.shippingTime, tableData.shippingCost, tableData.condition);
    }
    if (
        order.status === OrderStatus.Shipped ||
        order.status === OrderStatus.Delivered ||
        order.status === OrderStatus.Completed ||
        order.status === OrderStatus.Closed ||
        order.status === OrderStatus.Disputed ||
        order.status === OrderStatus.EscrowPaymentFailed
    ) {
        orderData.push(
            tableData.inspectionTime,
            tableData.shippingTime,
            tableData.shippingCost,
            tableData.condition,
            tableData.shippedOn,
            tableData.trackingCode,
            tableData.fundsReleaseOn,
        );
        if (order.status === OrderStatus.Disputed) {
            orderData.push(tableData.disputedOn, tableData.disputedReason);
        }
    }
    return orderData;
};
