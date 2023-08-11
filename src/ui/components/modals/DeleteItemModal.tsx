import { Modal, notification } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import merovService from '../../../services/merov';
import Button, { SIZE, VARIANT } from '../buttons/Button/index';

interface RemoveAddressProps {
    stateModal: boolean;
    setStateModal: (state: boolean) => void;
    onDeleteCallback?: () => Promise<void>;
    id: string;
}

export default function DeleteItemsModal({ stateModal, setStateModal, id, onDeleteCallback }: RemoveAddressProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const onCloseModal = async (event) => {
        event.preventDefault();
        setStateModal(false);
    };

    const deleteProductSelected = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await merovService.secureApi().deleteProduct(id);
            if (onDeleteCallback) onDeleteCallback();
            router.push('/account/products');
        } catch (error) {
            notification.open({
                message: 'Changes not saved ',
                description: `${error.response.data.message ?? 'Error deleting product!'}`,
                className: 'error',
            });
        } finally {
            setIsLoading(false);
            setStateModal(false);
        }
    };

    return (
        <Modal width="400px" visible={stateModal} onCancel={onCloseModal} footer={false}>
            <div className="row">
                <h6>Are you sure you want to delete this product?</h6>
                <div className="col-6 mt-2">
                    <Button className="col-12" size={SIZE.SMALL} variant={VARIANT.TERTIARY} onClick={onCloseModal}>
                        No
                    </Button>
                </div>
                <div className="col-6 mt-2">
                    <Button loading={isLoading} className="col-12" size={SIZE.SMALL} onClick={deleteProductSelected}>
                        Yes
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
