import React from 'react';
import Input from '../../../components/inputs/Input';
import AddressInputs from './AddressInputs';

export default function OrganizationInputs({ tableProps, handleSelectStreet }) {
    return (
        <>
            <div className="rounded-lg w-full my-3">
                <Input {...tableProps.businessName} className="mt-4" />
                {tableProps.businessName?.errors && tableProps.businessName?.touched && (
                    <div className="mt-1">
                        <span className="text-red-600">{tableProps.businessName?.errors}</span>
                    </div>
                )}
                <AddressInputs tableProps={tableProps} handleSelectStreet={handleSelectStreet} />
                <Input {...tableProps.taxpayerNumber} className="mt-4" />
                {tableProps.taxpayerNumber?.errors && tableProps.taxpayerNumber?.touched && (
                    <div className="mt-1">
                        <span className="text-red-600">{tableProps.taxpayerNumber?.errors}</span>
                    </div>
                )}
                <Input {...tableProps.website} className="mt-4" />
                {tableProps.website?.errors && tableProps.website?.touched && (
                    <div className="mt-1">
                        <span className="text-red-600">{tableProps.website?.errors}</span>
                    </div>
                )}
            </div>
        </>
    );
}
