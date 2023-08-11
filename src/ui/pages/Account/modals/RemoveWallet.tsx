import React, { useState } from 'react';
import { Modal, notification } from 'antd';
import merovService from '../../../../services/merov';
import Button, { SIZE, VARIANT } from '../../../components/buttons/Button';

interface RemoveAddressProps {
    removeModalState: boolean;
    setRemoveModalState: (state: boolean) => void;
    id: string;
    deleteWallet: Function;
}

export default function RemoveWallet({ removeModalState, setRemoveModalState, id, deleteWallet }: RemoveAddressProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onCloseModal = () => {
        setRemoveModalState(false);
    };

    const deleteWalletSelected = async () => {
        setIsLoading(true);
        try {
            await merovService.secureApi().deleteWallet(id);
            notification.open({
                message: 'Wallet deleted!',
                description: 'Wallet deleted successfully',
                className: 'success',
            });
            await deleteWallet(id);
        } catch (error) {
            notification.open({
                message: 'Changes not saved ',
                description: 'Wallet don´t deleted!',
                className: 'error',
            });
        } finally {
            setRemoveModalState(false);
            setIsLoading(false);
        }
    };

    return (
        <Modal footer={false} width="400px" visible={removeModalState} onCancel={onCloseModal}>
            <div className="row">
                <h6>Are you sure you want to delete this wallet?</h6>
                <div className="col-6 mt-2">
                    <Button className="col-12" size={SIZE.SMALL} variant={VARIANT.TERTIARY} onClick={onCloseModal}>
                        No
                    </Button>
                </div>
                <div className="col-6 mt-2">
                    <Button loading={isLoading} className="col-12" size={SIZE.SMALL} onClick={deleteWalletSelected}>
                        Yes
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
