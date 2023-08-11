/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { notification } from 'antd';
import merovService from '../../../services/merov';
import useAddressContainer from '../../../hooks/useAddressContainer';
import AddAdress from '../AddAdress';
import Title from '../Title';
import { DeliveryAddress } from '../../../typings/deliveryAddress';
import Modal from './Modal/index';

export type AddAddressModalProps = {
    visible: boolean;
    addMode?: boolean;
    deliveryAddress: DeliveryAddress | null;
    setVisible: (state: boolean) => void;
    createAddress?: Function;
    editAddress?: Function;
};

export default function AddAddressModal({
    deliveryAddress,
    createAddress,
    addMode,
    visible,
    setVisible,
    editAddress,
}: AddAddressModalProps) {
    const [addressPostedID, setAddressPostedID] = useState<string>('');
    const useAdressObject = useAddressContainer(setVisible, setAddressPostedID);
    const [countryState, setCountryState] = useState<string>('');
    const { addressData, onCloseModal } = useAdressObject;

    const onSubmitEdit = async () => {
        try {
            if (!addMode && deliveryAddress) {
                const sendData = { ...addressData };
                delete sendData.updatedAt;
                delete sendData.userId;
                delete sendData.createdAt;
                delete sendData.accountId;
                delete sendData.id;

                const resp = await merovService.secureApi().updateAddress(deliveryAddress.id, sendData);
                onCloseModal();
                notification.open({
                    message: 'Changes saved!',
                    description: 'Changes saved',
                    className: 'success',
                });
                setVisible(false);
                if (editAddress) editAddress(resp);
            }
            onCloseModal();
        } catch (error: any) {
            notification.open({
                message: 'Changes not saved!',
                description: 'Changes not saved',
                className: 'error',
            });
        }
    };

    return (
        <Modal shouldOpen={visible} className="w-11/12 md:w-[40rem] z-40  relative">
            <Title text={addMode ? 'Add New Address' : 'Edit Address'} className="text-2xl m-0 leading-none" showLeftLine />

            <div className="mt-8 z-40  relative ">
                <AddAdress
                    createAddress={createAddress}
                    onSubmitEdit={onSubmitEdit}
                    countryState={countryState}
                    setCountryState={setCountryState}
                    deliveryAddress={deliveryAddress}
                    submitButtonText={addMode ? 'Add address' : 'Edit Address'}
                    useAdressObject={{
                        ...useAdressObject,
                        onSubmit: async () => useAdressObject.onSubmit(true),
                    }}
                />
            </div>
        </Modal>
    );
}
