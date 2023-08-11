import React, { useState } from 'react';
import { Modal, notification } from 'antd';
import merovService from '../../../../services/merov';
import Button, { SIZE, VARIANT } from '../../../components/buttons/Button';

interface RemoveAddressProps {
    removeModalState: boolean;
    setRemoveModalState: (state: boolean) => void;
    id: string;
    deleteAddress: Function;
}

export default function RemoveAddress({ removeModalState, setRemoveModalState, id, deleteAddress }: RemoveAddressProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onCloseModal = () => {
        setRemoveModalState(false);
    };

    const deleteAddressSelected = async () => {
        setIsLoading(true);
        try {
            await merovService.secureApi().deleteAddress(id);
            deleteAddress(id);
            notification.open({
                message: 'Address deleted!',
                description: 'Address deleted successfully',
                className: 'success',
            });
        } catch (error) {
            notification.open({
                message: 'Changes not saved ',
                description: 'Address don´t deleted!',
                className: 'error',
            });
        } finally {
            setIsLoading(false);
            setRemoveModalState(false);
        }
    };

    return (
        <Modal width="400px" visible={removeModalState} onCancel={onCloseModal} footer={false}>
            <div className="row">
                <h6>Are you sure you want to delete this address?</h6>
                <div className="col-6 mt-2">
                    <Button className="col-12" size={SIZE.SMALL} variant={VARIANT.TERTIARY} onClick={onCloseModal}>
                        No
                    </Button>
                </div>
                <div className="col-6 mt-2">
                    <Button loading={isLoading} className="col-12" size={SIZE.SMALL} onClick={deleteAddressSelected}>
                        Yes
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
