import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { notification } from 'antd';
import merovService from '../../../../services/merov';
import Button, { SIZE, VARIANT } from '../../../components/buttons/Button';
import Modal from '../../../components/modals/Modal';
import { Permission } from '../../../../typings/permissions';
import { isOwnerOverAdmin } from '../../../../helpers/permissions/isOwnerOverAdmin';

interface RemoveMemberProps {
    visible: boolean;
    setVisible: (state: boolean) => void;
    memberId: string;
    setUserDeleted: any;
}

export default function RemoveMember({ visible, setVisible, memberId, setUserDeleted }: RemoveMemberProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingData, setisLoadingData] = useState<boolean>(true);
    const [canDelete, setCanDelete] = useState<boolean>(true);

    const fetchMember = async () => merovService.secureApi().getMemberById(memberId);
    const { data: member, mutate: update } = useSWR(`/organizations/me/member/${memberId}`, fetchMember);

    useEffect(() => {
        update();
    }, [memberId]);

    useEffect(() => {
        if (!member || !visible) return;
        setCanDelete(isOwnerOverAdmin(member.permissions as Permission[]));
        setisLoadingData(false);
    }, [member, memberId, visible]);

    const onCloseModal = () => {
        setVisible(false);
        setisLoadingData(true);
    };

    const deleteAddressSelected = async () => {
        setIsLoading(true);
        try {
            await merovService.secureApi().deleteMember(memberId);
        } catch (error) {
            notification.open({
                message: 'Troubles to delete member!',
                className: 'error',
            });
            return false;
        }
        notification.open({
            message: 'Member deleted!',
            className: 'success',
        });
        setUserDeleted((prevState: boolean) => !prevState);
        setIsLoading(false);
        setVisible(false);
    };

    return (
        <Modal shouldOpen={visible} className="p-2 w-96">
            <div className="w-full">
                <h6>
                    {isLoadingData
                        ? 'Loading...'
                        : canDelete
                        ? 'Are you sure you want to delete this member'
                        : "You don't have permission to delete this user."}
                </h6>
                {!isLoadingData && (
                    <div className="flex w-full gap-3">
                        <div className="mt-2 w-full">
                            <Button className="w-full" size={SIZE.SMALL} variant={VARIANT.TERTIARY} onClick={onCloseModal}>
                                {canDelete ? 'No' : 'Cancel'}
                            </Button>
                        </div>
                        {canDelete && (
                            <div className="mt-2 w-full">
                                <Button loading={isLoading} className="w-full" size={SIZE.SMALL} onClick={deleteAddressSelected}>
                                    Yes
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
}
