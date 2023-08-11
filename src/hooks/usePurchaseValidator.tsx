import { useEffect, useState } from 'react';
import { STATUS } from '../typings/user';
import { useMerovUser } from './useMerovUser';

export function usePurchaseValidator(): boolean {
    const [isPurchaseValid, setIsPurchaseValid] = useState<boolean>(true);
    const user = useMerovUser();

    useEffect(() => {
        setIsPurchaseValid(user.idVerificationStatus === STATUS.Full);
    }, [user]);

    return isPurchaseValid;
}
