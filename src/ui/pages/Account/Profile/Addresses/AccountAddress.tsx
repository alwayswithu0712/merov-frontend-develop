import React, { useState } from 'react';
import RemoveAddress from '../../modals/RemoveAddress';
import { DeliveryAddress } from '../../../../../typings/user';

interface AccountAddressProps {
    id: string;
    address: DeliveryAddress;
    handleEditAddress: (id: string) => void;
    deleteAddress: Function;
}

export default function AccountAddress({ deleteAddress, id, handleEditAddress, address }: AccountAddressProps) {
    const [removeModalState, setRemoveModalState] = useState<boolean>(false);

    return (
        <>
            <div className="card col-12 address-card-padding">
                <div style={{ fontWeight: '600' }} className="address-data col-12">
                    {address.name}
                </div>
                <div className="address-data col-12">{address.city}</div>
                <div className="address-data col-12">{address.state}</div>
                <div className="address-data col-12">{address.country}</div>
                <div className="address-data col-12">{address.street}</div>
                <div className="address-data col-12">{address.postcode}</div>
                <div className="address-data col-12">{address.phone}</div>
                <div className="col-12 address-card-icons address-card-btns">
                    <div className="address-data col-6 address-btn-edit">
                        <i onClick={() => handleEditAddress(id)} className="ri-edit-2-fill address-card-edit-img"></i>
                    </div>
                    <div className="address-data col-6 address-btn-edit">
                        <i onClick={() => setRemoveModalState(true)} className="ri-delete-bin-6-fill address-card-remove-img"></i>
                    </div>
                </div>
            </div>
            <RemoveAddress
                deleteAddress={deleteAddress}
                removeModalState={removeModalState}
                setRemoveModalState={setRemoveModalState}
                id={id}
            />
        </>
    );
}
