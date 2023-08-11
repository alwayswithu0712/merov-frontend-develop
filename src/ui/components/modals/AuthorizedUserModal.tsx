import React from 'react';
import { Modal } from 'antd';
import Button, { SIZE, VARIANT } from '../buttons/Button/index';
import { createSardineTab } from '../../../helpers/sardine';

interface AuthorizedUserModalProps {
    stateModal: boolean;
    setStateModal: (state: boolean) => void;
    onCancel: () => void;
    canVerify: boolean;
    text: string;
}

export default function AuthorizedUserModal({ stateModal, setStateModal, onCancel, text, canVerify }: AuthorizedUserModalProps) {
    const handleCloseModal = async (e: React.MouseEvent<HTMLElement> | null = null) => {
        onCancel();
        if (e) e.preventDefault();
        setStateModal(false);
    };

    const handleCreateSardine = () => {
        if (!canVerify) return;
        createSardineTab();
    };

    return (
        <Modal width="400px" visible={stateModal} onCancel={handleCloseModal} footer={false}>
            <div className="row">
                <h6>{text}</h6>
                <div className="w-full flex justify-center gap-2 mt-2">
                    <Button className="w-full" size={SIZE.SMALL} variant={VARIANT.TERTIARY} onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button disabled={!canVerify} className="w-full" size={SIZE.SMALL} onClick={handleCreateSardine} bold>
                        Verify
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
