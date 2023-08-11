import { notification } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import StringValidator from '../../../../helpers/validators/StringValidator';
import merovService from '../../../../services/merov';
import Button, { VARIANT } from '../../../components/buttons/Button';
import CheckboxCustom from '../../../components/inputs/CheckboxCustom';
import Input from '../../../components/inputs/Input';
import Modal from '../../../components/modals/Modal';
import Title from '../../../components/Title';
import { permissionsData } from './permissions';

export type AddMemberProps = {
    visible: boolean;
    setVisible: Function;
};

export default function AddMember({ visible, setVisible }: AddMemberProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const { EmailValidator } = StringValidator();

    const validate = async (values) => {
        const errors: { email?: string } = {};

        if (values.email.length === 0) {
            errors.email = 'Email is required';
        } else {
            try {
                await EmailValidator(values.email);
            } catch (error) {
                errors.email = error.message;
            }
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            admin: false,
            products: false,
            chats: false,
            orders: false,
            offers: false,
            wallets: false,
            addresses: false,
            account: false,
        },
        validate,
        onSubmit: (values) => {
            addMember(values);
        },
        validateOnChange: false,
    });

    useEffect(() => {
        formik.resetForm();
    }, [visible]);

    const addMember = async (values) => {
        const data = values;
        setLoading(true);

        const email = data.email;
        delete data.email;
        const permissions = Object.keys(data)
            .filter((k) => data[k])
            .map(String);

        try {
            await merovService.secureApi().postInvitation({ email, permissions });
            formik.resetForm();
        } catch (error) {
            notification.open({
                message: 'Troubles add member!',
                className: 'error',
            });
            return false;
        } finally {
            setIsAdmin(false);
        }
        notification.open({
            message: 'Invitation sent!',
            className: 'success',
        });
        setLoading(false);
        setVisible(false);
    };

    const setAdmin = () => {
        if (!formik.values.admin) {
            setIsAdmin(true);
            formik.setValues({
                email: formik.values.email,
                admin: true,
                products: false,
                chats: false,
                orders: false,
                offers: false,
                wallets: false,
                addresses: false,
                account: false,
            });
        } else {
            setIsAdmin(false);
            formik.setFieldValue('admin', false);
        }
    };

    return (
        <Modal shouldOpen={visible} className="w-11/12 md:w-[40rem] z-40  relative">
            <Title text={'Add New Member'} className="text-2xl m-0 leading-none" showLeftLine />
            <div className="mt-8 z-40  relative ">
                <div className="rounded-lg w-full ">
                    <Input
                        className="mt-4"
                        placeholder="Enter email"
                        label={'Email'}
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.setFieldValue('email', e.target.value);
                        }}
                        type="email"
                        hasError={!!formik.errors.email}
                    />
                    {formik.errors.email && (
                        <div className="mt-1">
                            <span className="text-red-600">{formik.errors.email}</span>
                        </div>
                    )}

                    <div className="text-lg mt-4 font-medium">Permissions</div>
                    <div className="mb-8 mt-4">
                        {Object.keys(permissionsData).map((item) => (
                            <div key={item} className="flex my-2">
                                <CheckboxCustom
                                    name="item"
                                    disabled={item !== 'admin' && isAdmin}
                                    className="offer-product-form-inline"
                                    checked={formik.values[item]}
                                    onChange={() => {
                                        if (item === 'admin') {
                                            setAdmin();
                                        } else {
                                            formik.setFieldValue(item, !formik.values[item]);
                                        }
                                    }}
                                />
                                <div className="ml-2 flex">
                                    <div className={`mr-2 ${item !== 'admin' && isAdmin ? 'text-stone-400' : ''}`}>
                                        {permissionsData[item].name}{' '}
                                    </div>
                                    <div className="text-stone-600">
                                        {' - '} {permissionsData[item].description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex  gap-4">
                        <Button className="w-full" variant={VARIANT.SECONDARY} onClick={() => setVisible(false)}>
                            Cancel
                        </Button>

                        <Button onClick={formik.submitForm} className="w-full" loading={loading} variant={VARIANT.PRIMARY}>
                            Add member
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
