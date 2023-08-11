import React, { useState } from 'react';
import { toShortString } from '../../../../../helpers';
import { Wallet } from '../../../../../typings/wallet';
import RemoveWallet from '../../modals/RemoveWallet';

interface AccountWalletsProps {
    id: string;
    wallet: Wallet;
    deleteWallet: Function;
}

export default function AccountWallets({ deleteWallet, id, wallet }: AccountWalletsProps) {
    const [removeModalState, setRemoveModalState] = useState<boolean>(false);

    return (
        <>
            <div className="address-data col-10 wallets-card-padding">
                {toShortString(wallet.address)} ({wallet.chain})
            </div>
            <div className="wallet-data col-2 address-btn-edit">
                <i onClick={() => setRemoveModalState(true)} className="ri-delete-bin-6-fill address-card-remove-img"></i>
            </div>

            <RemoveWallet
                deleteWallet={deleteWallet}
                removeModalState={removeModalState}
                setRemoveModalState={setRemoveModalState}
                id={id}
            />
        </>
    );
}
