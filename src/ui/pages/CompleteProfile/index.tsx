import React, { useEffect, useRef, useState } from 'react';
import { Form, Upload, UploadFile } from 'antd';
import styled from 'styled-components';
import ImgCrop from 'antd-img-crop';
import moment from 'moment';
import MainLayout from '../../layouts/MainLayout';
import MerovLogo from '../../../assets/icons/MerovLogo';
import merovService from '../../../services/merov';
import { useSardine } from '../../../hooks/useSardine';
import Input from '../../components/inputs/Input';
import DatePickerCustom from '../../components/inputs/DatePickerCustom';
import Button, { SIZE, VARIANT as BTN_VARIANT } from '../../components/buttons/Button';
import { clearInputNumbersForPhone } from '../../../helpers/clearInputNumbers';
import Title from '../../components/Title';
import StringValidator from '../../../helpers/validators/StringValidator';
import DateValidator from '../../../helpers/validators/DateValidator';
import { UseAccountConntainer } from '../../../hooks/useAccountContainer';
import { useMerovUser } from '../../../hooks/useMerovUser';
import { usePermissionVerifier } from '../../../hooks/usePermissionVerifier';

type Props = {
    sardineData: {
        customerId: string;
        sessionKey: string;
    };
    onSetShowSMS: (show: boolean) => void;
    userData: UseAccountConntainer['userData'];
    setUserData: UseAccountConntainer['setUserData'];
    tableProps: UseAccountConntainer['tableProps'];
    handleDatePicker: UseAccountConntainer['handleDatePicker'];
};

const CompleteProfile = ({ onSetShowSMS, sardineData, userData, setUserData, tableProps, handleDatePicker }: Props) => {
    let updateSardineInterval;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { hasPermissions } = usePermissionVerifier();
    const { updateSardineConfig } = useSardine();
    const { logout } = useMerovUser();
    const [form] = Form.useForm();

    const { PhoneValidator } = StringValidator();
    const { AdultValidator } = DateValidator();

    const setSardine = () => {
        updateSardineConfig({
            ...sardineData,
            flow: 'COMPLETE_PROFILE',
        });
    };

    const isSardineSetUp = useRef<boolean>(true);
    useEffect(() => {
        if (isSardineSetUp.current && sardineData) {
            setSardine();
            updateSardineInterval = setInterval(() => {
                setSardine();
            }, 1620000);
            isSardineSetUp.current = false;
        }
    }, [sardineData]);

    useEffect(
        () => () => {
            if (updateSardineInterval) {
                clearInterval(updateSardineInterval);
            }
        },
        [],
    );

    const uploadFile = async (file: any): Promise<void> => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await merovService.secureApi().postImage(formData);

        const account = userData.account;
        account.avatarUrl = response.url;
        setUserData({ ...userData, account });
    };

    const onPreview = async (file: UploadFile): Promise<void> => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader: any = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src as string;
        const imgWindow = window.open(src) as Window;
        imgWindow.document.write(image.outerHTML);
    };

    const handleLogout = (): void => {
        if (isLoading) return;
        setIsLoading(true);
        logout();
    };

    return (
        <MainLayout headTitle="Complete Profile" pageClass={'dashboard'}>
            <section className="max-w-lg px-2 my-14 mx-auto">
                <div className="flex justify-center">
                    <MerovLogo color={'#47e6b6'} />
                </div>
                <IconDiv>
                    <Title text="Complete your profile" className="mb-8 mt-2 text-3xl" />
                </IconDiv>

                <Form
                    fields={[
                        {
                            name: ['firstName'],
                            value: userData?.firstName,
                        },
                        {
                            name: ['lastName'],
                            value: userData?.lastName,
                        },
                        {
                            name: ['phone'],
                            value: userData?.phone,
                        },
                        {
                            name: ['dateOfBirth'],
                            value: userData.dateOfBirth ? moment(userData.dateOfBirth) : '',
                        },
                        {
                            name: ['avatarUrl'],
                            value: userData.account.avatarUrl,
                        },
                    ]}
                    form={form}
                    onFinish={async () => {
                        window.scrollTo(0, 0);
                        onSetShowSMS(true);
                    }}
                    className="row form"
                >
                    {hasPermissions() && (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className="mt-5">
                            <Form.Item style={{ width: '50%', display: 'flex', justifyContent: 'center' }} name="avatarUrl">
                                <ButtonText>
                                    <ImageDiv src={userData?.account?.avatarUrl} />
                                    <ImgCrop onModalOk={uploadFile} rotate>
                                        <Upload className="avatar-uploader" name="avatar" onPreview={onPreview} showUploadList={false}>
                                            <AvatarButonDiv>
                                                <AvatarText>Avatar</AvatarText>
                                                <div
                                                    style={{
                                                        marginRight: '10px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                    className="btn btn-custom btn-secondary-transparent-thin-white"
                                                >
                                                    Upload Photo{' '}
                                                </div>
                                            </AvatarButonDiv>
                                        </Upload>
                                    </ImgCrop>
                                </ButtonText>
                            </Form.Item>
                        </div>
                    )}
                    <div>
                        <Label>First Name</Label>
                        <Form.Item name="firstName" validateTrigger="onSubmit" rules={[{ required: true, message: 'Name is required!' }]}>
                            <Input dataSardineId="firstName" {...tableProps.firstName} />
                        </Form.Item>
                    </div>
                    <div>
                        <Label>Last Name</Label>
                        <Form.Item
                            style={{ border: 'none !important' }}
                            name="lastName"
                            validateTrigger="onSubmit"
                            rules={[{ required: true, message: 'Last Name is required!' }]}
                        >
                            <Input dataSardineId="lastName" {...tableProps.lastName} />
                        </Form.Item>
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Form.Item
                            style={{ border: 'none !important' }}
                            name="phone"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    validator: (e, a) => PhoneValidator(a),
                                },
                            ]}
                        >
                            <Input dataSardineId="phone" type="tel" {...tableProps.phone} onKeyDown={clearInputNumbersForPhone} />
                        </Form.Item>
                    </div>
                    <div>
                        <BirthdayDiv>
                            <Label>Birth date</Label>
                            {/* @ts-ignore */}
                            <Form.Item
                                name="dateOfBirth"
                                validateTrigger="onSubmit"
                                rules={[
                                    { required: true, message: 'Birth date is required!' },
                                    {
                                        validator: (e, a) => AdultValidator(a),
                                    },
                                ]}
                            >
                                <DatePickerCustom
                                    onChange={(e) => {
                                        handleDatePicker(e);
                                    }}
                                    disabledDate={(current) => {
                                        const customDate = moment().format('MM/DD/YYYY');
                                        return current && current > moment(customDate, 'MM/DD/YYYY');
                                    }}
                                    dataSardineId="dateOfBirth"
                                    placeholder="Select your birthday"
                                />
                            </Form.Item>
                        </BirthdayDiv>
                        <div className="flex flex-col md:flex-row justify-center gap-2 mt-5">
                            <Button
                                size={SIZE.MEDIUM}
                                loading={isLoading}
                                onClick={handleLogout}
                                variant={BTN_VARIANT.SECONDARY}
                                className="w-full max-w-none md:max-w-xs"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant={BTN_VARIANT.PRIMARY}
                                size={SIZE.MEDIUM}
                                className="w-full max-w-none md:max-w-xs"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </Form>
            </section>
        </MainLayout>
    );
};

export default CompleteProfile;

const IconDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const BirthdayDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const Label = styled.label`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: white;
    margin-bottom: 10px;
`;

const ButtonText = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
`;
const AvatarText = styled.h3`
    margin-bottom: 15px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
`;

const ImageDiv = styled.img`
    width: 75px;
    height: 75px;
    border-radius: 50px;
`;
const AvatarButonDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    justify-content: center;
    width: 50%;
`;
