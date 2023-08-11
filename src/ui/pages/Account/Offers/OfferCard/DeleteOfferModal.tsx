import { Modal, notification } from 'antd';
import React, { useState } from 'react';
import merovService from '../../../../../services/merov';
import Button, { SIZE, VARIANT } from '../../../../components/buttons/Button';

interface Props {
    stateModal: boolean;
    setStateModal: (state: boolean) => void;
    id: string;
    onUpdateOffers: () => void;
}

export default function DeleteOfferModal({ stateModal, setStateModal, id, onUpdateOffers }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onCloseModal = () => {
        setStateModal(false);
    };

    const deleteOfferSelected = async () => {
        setIsLoading(true);
        try {
            await merovService.secureApi().deleteOffer(id);
            onUpdateOffers();
        } catch (error) {
            notification.open({
                message: 'Changes not saved ',
                description: `${error.response.data.message ?? 'Error deleting offer!'}`,
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
                <h6>Are you sure you want to delete this offer?</h6>
                <div className="col-6 mt-2">
                    <Button className="col-12" size={SIZE.SMALL} variant={VARIANT.TERTIARY} onClick={onCloseModal}>
                        No
                    </Button>
                </div>
                <div className="col-6 mt-2">
                    <Button loading={isLoading} className="col-12" size={SIZE.SMALL} onClick={deleteOfferSelected}>
                        Yes
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
