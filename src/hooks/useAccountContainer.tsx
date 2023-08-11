import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useMerovUser } from './useMerovUser';
import merovService from '../services/merov';
import { User } from '../typings/user';
import { usePermissionVerifier } from './usePermissionVerifier';

const useAccountContainer = (user: User): UseAccountConntainer => {
    const { update } = useMerovUser();
    const [userData, setUserData] = useState<User>(user);
    const { hasPermissions } = usePermissionVerifier();

    useEffect(() => {
        setUserData(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.firstName, user.lastName, user.account, user.email]);

    const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>, nameField: string): void => {
        const { value } = e.target;
        if (nameField !== 'firstName' && nameField !== 'lastName') {
            setUserData((prevUserData) => ({ ...prevUserData, [nameField]: value }));
        } else if (/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(value) || value === '') {
            setUserData((prevUserData) => ({ ...prevUserData, [nameField]: value }));
        } else {
            setUserData((prevUserData) => ({ ...prevUserData }));
        }
    };

    const handleDatePicker = (date: any): void => {
        const birthday: Date = new Date(date);
        const cloneUserData: User = { ...userData };
        setUserData({ ...cloneUserData, dateOfBirth: birthday });
    };

    const handleSaveChanges = async (): Promise<boolean> => {
        const changes = {
            dateOfBirth: userData.dateOfBirth,
            lastName: userData.lastName!.trim(),
            firstName: userData.firstName!.trim(),
            phone: userData.phone,
        };

        try {
            if (hasPermissions()) {
                await merovService.secureApi().updateAccount({ avatarUrl: userData.account.avatarUrl });
            }
            await merovService.secureApi().updateUser(changes);
            await update();
            return true;
        } catch (error) {
            const errorMessage = error.response.data.data.target[0] || '';
            notification.open({
                message: 'Troubles to complete profile!',
                description:
                    errorMessage === 'phone'
                        ? "Can't complete the profile! Phone was already verified"
                        : 'There was a problem updating your profile. Please contact support.',
                className: 'error',
            });
            return false;
        }
    };

    const tableProps = {
        firstName: {
            id: 'firstName',
            key: 'firstName',
            placeholder: 'Enter Name',
            value: userData.firstName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeUser(e, 'firstName'),
        },
        phone: {
            id: 'phone',
            key: 'phone',
            placeholder: 'Enter Phone',
            value: userData.phone,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeUser(e, 'phone'),
        },
        lastName: {
            id: 'lastName',
            key: 'lastName',
            placeholder: 'Enter Last Name',
            value: userData.lastName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeUser(e, 'lastName'),
        },
        email: {
            id: 'email',
            key: 'email',
            placeholder: 'Enter Email',
            value: userData.email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeUser(e, 'email'),
        },
    };

    return {
        handleSaveChanges,
        userData,
        setUserData,
        tableProps,
        handleDatePicker,
    };
};

export default useAccountContainer;

export type UseAccountConntainer = {
    handleSaveChanges: () => Promise<boolean>;
    userData: User;
    setUserData: (User) => void;
    tableProps: {
        firstName: InputProps;
        phone: InputProps;
        lastName: InputProps;
        email: InputProps;
    };
    handleDatePicker: (date: any) => void;
};
type InputProps = {
    id: string;
    key: string;
    placeholder: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
