import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { notification } from 'antd';
import { countries } from '../services/location';
import { DeliveryAddress } from '../typings/user';
import merovService from '../services/merov';

const templateAddress = {
    id: '',
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postcode: '',
    phone: '',
};

export interface addAddressPropsType {
    addressData: DeliveryAddress;
    countriesOptions: {
        value: string;
        label: string;
    }[];
    setAddressData: (value: any) => void;
    handleSelectCountry: (value: string) => void;
    handleChangeAddress: (
        value: string,
        option: {
            name: DeliveryAddress;
        },
    ) => void;
    handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>, nameField: string) => void;
    validAddressErrors: string[];
    handleSelectStreet: (formattedAddress: any) => void;
    onCloseModal: () => Promise<void>;
    onSubmit: (onlyAdd?: boolean) => Promise<void>;
    selectedOption: string;
    setSelectedOption: Function;
}
const useAddressContainer = (setOpenModal: Function, setAddressPostedID: Function): addAddressPropsType => {
    const [addressData, setAddressData] = useState<DeliveryAddress>(templateAddress);
    const [addressSelected, setAddressSelected] = useState<string>('');
    const [validAddressErrors, setValidAddressErrors] = useState<string[]>([]);
    const [countryState, setCountryState] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>();

    useEffect(() => {
        let timeout: any;

        if (validAddressErrors.length > 0) {
            timeout = setTimeout(() => {
                setValidAddressErrors([]);
                clearTimeout(timeout);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [validAddressErrors.length]);

    useEffect(() => {
        const cloneUserData: DeliveryAddress = { ...addressData };
        setAddressData({ ...cloneUserData, street: countryState });
    }, [countryState]);

    const addressFormData = useMemo(() => {
        const newValues = Object.values({
            name: addressData?.name,
            country: addressData?.country,
            state: addressData?.state,
            street: addressData?.street,
            city: addressData?.city,
            postcode: addressData?.postcode,
            phone: addressData?.phone,
        }).map((value: string | boolean | undefined) => value);
        return {
            values: { ...addressData },
            isValid: newValues.every((el: string | boolean | undefined) => el),
        };
    }, [addressData]);

    const checkAddressFieldValidation = (values: any) => {
        Object.entries(values).forEach(
            ([key, value]) =>
                !value && setValidAddressErrors((prevErrors: string[]) => (prevErrors.includes(key) ? prevErrors : [...prevErrors, key])),
        );
    };

    const handleChangeInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, nameField: string) => {
            const { value } = e.target;
            const cloneUserData: DeliveryAddress = { ...addressData };
            setAddressData({ ...cloneUserData, [nameField]: value });
            setValidAddressErrors(validAddressErrors.filter((error: string) => error !== nameField));
        },
        [addressData, validAddressErrors],
    );

    const handleChangeCountry = useCallback(
        (country: any) => {
            const cloneUserData: DeliveryAddress = { ...addressData };
            setAddressData({ ...cloneUserData, [country]: country });
            setValidAddressErrors(validAddressErrors.filter((error: string) => error !== country));
        },
        [addressData, validAddressErrors],
    );

    const handleChangeAddress = useCallback(
        (value: string, option: { name: DeliveryAddress; label: string }) => {
            setSelectedOption(option.label);
            const cloneUserData: DeliveryAddress = { ...addressData };
            if (value === 'addNewAddress') {
                setAddressData({
                    ...cloneUserData,
                    ...templateAddress,
                });
            } else {
                setAddressData({
                    ...cloneUserData,
                    id: option.name.id,
                    name: option.name.name,
                    country: option.name.country,
                    street: option.name.street,
                    city: option.name.city,
                    postcode: option.name.postcode,
                    state: option.name.state,
                    phone: option.name.phone,
                });
            }
            setAddressSelected(value);
            setValidAddressErrors([]);
        },
        [addressData],
    );

    const handleSelectCountry = useCallback(
        (value: string) => {
            const cloneUserData: DeliveryAddress = { ...addressData };
            setAddressData({
                ...cloneUserData,
                country: value || '',
            });
        },
        [addressData],
    );

    const handleSelectStreet = useCallback(
        (formattedAddress: any) => {
            const countryData = formattedAddress.address_components?.find((item: any) =>
                item.types.includes('country') ? item.long_name : false,
            );
            const stateData = formattedAddress.address_components?.find((item: any) =>
                item.types.includes('administrative_area_level_1') ? item.long_name : false,
            );
            const cityData = formattedAddress.address_components?.find((item: any) =>
                item.types.includes('locality') ? item.long_name : false,
            );
            const postCodeData = formattedAddress.address_components?.find((item: any) =>
                item.types.includes('postal_code') ? item.long_name : false,
            );

            setAddressData({
                ...addressData,
                city: cityData?.long_name,
                postcode: postCodeData?.long_name,
                state: stateData?.long_name,
                country: countryData?.long_name,
            });
            setCountryState(formattedAddress.formatted_address);
        },
        [addressData],
    );

    const onCloseModal = useCallback(async () => {
        setAddressSelected('');
        setOpenModal(false);
        setValidAddressErrors([]);
        setAddressData({ ...templateAddress });
    }, [setOpenModal]);

    const onSubmit = useCallback(async () => {
        if (addressFormData.isValid) {
            try {
                const address = {
                    name: addressData.name,
                    street: addressData.street,
                    city: addressData.city,
                    state: addressData.state,
                    country: addressData.country,
                    postcode: addressData.postcode,
                    phone: addressData.phone,
                };
                try {
                    const response = await merovService.secureApi().postAddress(address);
                    setAddressPostedID(response.id);
                    notification.open({
                        message: 'Changes saved!',
                        description: 'Changes saved',
                        className: 'success',
                    });
                    return response;
                } catch (error) {
                    notification.open({
                        message: 'Error!',
                        description: 'Error adding new address',
                        className: 'error',
                    });
                }
            } catch (e) {
                // console.error(e);
            }
        } else {
            checkAddressFieldValidation(addressFormData.values);
        }
        return false;
    }, [addressData, addressFormData, addressSelected, checkAddressFieldValidation, onCloseModal]);

    const countriesOptions = useMemo(() => countries && countries.map((country) => ({ value: country.name, label: country.name })), []);

    const addAddressProps = useMemo(
        () => ({
            addressData,
            countriesOptions,
            handleSelectCountry,
            handleChangeAddress,
            setAddressData,
            handleChangeInput,
            validAddressErrors,
            handleSelectStreet,
            onCloseModal,
            onSubmit,
            handleChangeCountry,
            selectedOption,
            setSelectedOption,
        }),
        [
            addressData,
            countriesOptions,
            handleChangeAddress,
            setAddressData,
            handleSelectCountry,
            handleChangeInput,
            validAddressErrors,
            onCloseModal,
            handleSelectStreet,
            onSubmit,
            handleChangeCountry,
            selectedOption,
            setSelectedOption,
        ],
    );

    return addAddressProps;
};

export default useAddressContainer;
