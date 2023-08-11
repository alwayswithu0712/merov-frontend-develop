import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import Router from 'next/router';
import merovService from '../../../services/merov';
import SelectCustom from '../../components/inputs/SelectCustom';
import { DeliveryAddress } from '../../../typings/deliveryAddress';
import { SardineDocumentVerifyRequest } from '../../../typings/sardine';
import AddAddressModal from '../../components/modals/AddAddressModal';
import Input from '../../components/inputs/Input';
import MerovLogo from '../../../assets/icons/MerovLogo';
import Button from '../../components/buttons/Button';
import Title from '../../components/Title';
import { User } from '../../../typings/user';
import { countries } from '../../../services/location';
import { useCompatibilityAntdForm } from '../../../hooks/useCompatibilityAntdForm';
import { createSardineTab } from '../../../helpers/sardine';
import { BackendEvents } from '../../../typings/notification';
import { usePermissionVerifier } from '../../../hooks/usePermissionVerifier';
import { Permission } from '../../../typings/permissions';

const initialErrorFields = {
    firstName: false,
    lastName: false,
    address: false,
};

type Props = {
    user: User;
    addresses: DeliveryAddress[];
};

type IdentityVerificationForm = {
    firstName: string;
    lastName: string;
    nationality: string;
    address: any;
};

const IdentityVerificationView = ({ user, addresses: addressesData }: Props) => {
    const [form] = Form.useForm();
    const { errors, handleSetError, handleOnFinishFormErrors } = useCompatibilityAntdForm<typeof initialErrorFields>(initialErrorFields);

    const [modalAddress, setModalAddress] = useState<boolean>(false);
    const [formData, setFormData] = useState<IdentityVerificationForm>({
        firstName: user.firstName!,
        lastName: user.lastName!,
        nationality: '',
        address: null,
    });
    const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<DeliveryAddress[]>(addressesData);

    useEffect(() => {
        const eventSource = merovService.secureApi().listenEvents(user.id, (data) => {
            if (data?.type === BackendEvents.SardineDocumentVerification) {
                Router.replace('/account/profile');
            }
        });

        return () => {
            eventSource.close();
        };
    }, [user.id]);

    const { hasPermissions } = usePermissionVerifier([Permission.Addresses]);

    const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>, nameField: string): void => {
        const { value } = e.target;
        if (/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(value) || value === '') {
            handleSetError(nameField, false);
            setFormData((prevUserData) => ({ ...prevUserData, [nameField]: value }));
        } else {
            setFormData((prevUserData) => ({ ...prevUserData }));
        }
    };

    const getAddresses = async (): Promise<void> => {
        try {
            const data = await merovService.secureApi().getAddresses();
            setAddresses(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreatIdentityVerification = async (): Promise<void> => {
        if (isSubmittingForm) return;
        setIsSubmittingForm(true);
        const dataToSend: SardineDocumentVerifyRequest = {
            firstName: formData.firstName,
            lastName: formData.firstName,
            address: {
                street1: formData.address.street,
                city: formData.address.city,
                region: formData.address.state,
                postalCode: formData.address.postcode,
                countryCode: countries.filter((country) => formData.address.country === country.name)[0].iso2,
            },
        };
        const isTabCreated = await createSardineTab(dataToSend);
        if (!isTabCreated) setIsSubmittingForm(false);
    };

    const handleChangeAddress = (e, option): void => {
        form.validateFields(['address']);
        if (option.value === 'addNewAddress') {
            setModalAddress(true);
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            address: {
                ...option.address,
                value: option?.value,
                label: option?.label,
            },
        }));
    };

    return (
        <section className="signup_page">
            <IconDiv>
                <MerovLogo color={'#47e6b6'} />
            </IconDiv>
            <IconDiv className="mb-6 mt-2">
                <Title text="Verify your Identity" className="text-3xl" />
            </IconDiv>
            <Form
                fields={[
                    {
                        name: ['firstName'],
                        value: formData.firstName,
                    },
                    {
                        name: ['lastName'],
                        value: formData.lastName,
                    },
                    {
                        name: ['address'],
                        value: formData.address,
                    },
                ]}
                form={form}
                onFinish={handleCreatIdentityVerification}
                onFinishFailed={handleOnFinishFormErrors}
                className="form_custom"
            >
                <Form.Item
                    name="firstName"
                    label="First Name"
                    validateTrigger="onSubmit"
                    rules={[{ required: true, message: 'First Name is required!' }]}
                >
                    <Input
                        id="firstName"
                        key="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        hasError={errors.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeUser(e, 'firstName')}
                    />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    validateTrigger="onSubmit"
                    rules={[{ required: true, message: 'Last Name is required!' }]}
                >
                    <Input
                        id="lastName"
                        key="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        hasError={errors.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeUser(e, 'lastName')}
                    />
                </Form.Item>
                <Form.Item name="address" validateTrigger="onChange" rules={[{ required: true, message: 'Address is required!' }]}>
                    <SelectCustom
                        label={'Address'}
                        className="select_custom"
                        placeholder="Select an address"
                        name="address"
                        value={formData.address}
                        onChange={(e: string, option: { name: DeliveryAddress }) => handleChangeAddress(e, option)}
                        options={[
                            ...(addresses
                                ? addresses.map((address: DeliveryAddress) => ({
                                      value: address.street,
                                      address,
                                      label: `${address.country}, ${address.city},  ${address.street}`,
                                  }))
                                : []),
                            ...(hasPermissions(Permission.Addresses)
                                ? [
                                      {
                                          value: 'addNewAddress',
                                          label: 'Add Address',
                                      },
                                  ]
                                : []),
                        ]}
                    />
                </Form.Item>

                <div className="w-full flex justify-center">
                    <Button disabled={isSubmittingForm} loading={isSubmittingForm} type="submit" className="w-full sm:w-48">
                        Verify
                    </Button>
                </div>
            </Form>
            <AddAddressModal
                addMode={true}
                deliveryAddress={formData.address}
                visible={modalAddress}
                setVisible={() => {
                    getAddresses();
                    setModalAddress(false);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        address: null,
                    }));
                }}
            />
        </section>
    );
};

export default IdentityVerificationView;

const IconDiv = styled.div`
    display: flex;
    justify-content: center;
`;
