import moment from 'moment';
import React, { useMemo } from 'react';
import { testingDays } from '../config/product';
import { numbersOnlyWithNDecimals } from '../helpers/clearInputNumbers';

const intFields = ['stock', 'maxTestingTime', 'quantity', 'maxTestingTime'];
const useUploadProductContainer = (itemData: any, setItemData: (data: any) => void) => {
    const handleChangeItemData = (e, nameField) => {
        const cloneItemData = { ...itemData };

        if (nameField === 'expirationDate') {
            setItemData({ ...cloneItemData, [nameField]: e });
        } else {
            const { value } = e.target;

            if (intFields.includes(nameField)) {
                setItemData({ ...cloneItemData, [nameField]: Number(value) });
            } else {
                setItemData({ ...cloneItemData, [nameField]: value });
            }
        }
    };
    const tableProps = useMemo(
        () => ({
            data: [
                {
                    id: 'title',
                    key: 'title',

                    placeholder: 'Enter Title',
                    value: itemData.title,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeItemData(e, 'title');
                    },
                },
                {
                    id: 'price',
                    key: 'price',
                    label: 'Price',
                    placeholder: 'Add Price',
                    value: itemData.price,
                    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'price');
                    },
                    onKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length >= 12) e.preventDefault();
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'price');
                    },
                },
                {
                    id: 'stock',
                    key: 'stock',
                    label: 'Stock',
                    placeholder: 'Stock',
                    value: itemData.stock,
                    step: '1',
                    min: '0',
                    onKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length >= 4) e.preventDefault();
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeItemData(e, 'stock'),
                },
                {
                    id: 'sellerAddress',
                    key: 'sellerAddress',
                    label: 'Seller Wallet',
                    placeholder: 'Enter Seller Wallet',
                    value: itemData.sellerAddress,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeItemData(e, 'sellerAddress'),
                },
                {
                    id: 'shippingCost',
                    key: 'shippingCost',
                    label: 'Shipping cost',
                    placeholder: 'Shipping cost',
                    value: itemData.shippingCost,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeItemData(e, 'shippingCost'),
                },
                {
                    id: 'quantity',
                    key: 'quantity',
                    label: 'Quantity',
                    placeholder: 'Quantity',
                    value: Number(itemData.quantity),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeItemData(e, 'quantity'),
                },
                {
                    id: 'sharedWith',
                    key: 'sharedWith',
                    label: 'Share with',
                    placeholder: 'share with',
                    value: itemData.sharedWith,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeItemData(e, 'sharedWith'),
                },
                {
                    id: 'maxTestingTime',
                    key: 'maxTestingTime',
                    label: 'Testing Time',
                    placeholder: '1 day',
                    value: itemData.maxTestingTime,
                    onKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (+e.target.value >= testingDays) e.preventDefault();
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeItemData(e, 'maxTestingTime'),
                },
                {
                    id: 'e',
                    key: 'expirationDate',
                    label: 'Expiration date',
                    placeholder: 'Tomorrow',
                    disabledDate: (currentDate) => !moment(currentDate).isAfter(),
                    value: itemData.expirationDate,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeItemData(e, 'expirationDate'),
                },
                {
                    id: 'height',
                    key: 'height',
                    label: 'Height',
                    placeholder: 'Add Height',
                    value: itemData.height,
                    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'height');
                    },
                    onKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length >= 6) e.preventDefault();
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'height');
                    },
                },
                {
                    id: 'length',
                    key: 'length',
                    label: 'Length',
                    placeholder: 'Add Length',
                    value: itemData.length,
                    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'length');
                    },
                    onKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length >= 6) e.preventDefault();
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'length');
                    },
                },
                {
                    id: 'width',
                    key: 'width',
                    label: 'Width',
                    placeholder: 'Add Width',
                    value: itemData.width,
                    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'width');
                    },
                    onKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length >= 6) e.preventDefault();
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'width');
                    },
                },
                {
                    id: 'weight',
                    key: 'weight',
                    label: 'Weight',
                    placeholder: 'Add Weight',
                    value: itemData.weight,
                    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }
                        handleChangeItemData(e, 'weight');
                    },
                    onKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length >= 6) e.preventDefault();
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const numberOnlyNDecimals = numbersOnlyWithNDecimals(e.target.value, 3);
                        if (numberOnlyNDecimals.changeValue) {
                            e.target.value = numberOnlyNDecimals.newValue;
                        }

                        handleChangeItemData(e, 'weight');
                    },
                },
            ],
        }),
        [itemData, handleChangeItemData],
    );

    return {
        tableProps,
    };
};

export default useUploadProductContainer;
