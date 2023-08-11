import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Formik } from 'formik';
import { notification } from 'antd';
import Button, { VARIANT } from '../../../components/buttons/Button';
import CheckboxCustom from '../../../components/inputs/CheckboxCustom';
import Input from '../../../components/inputs/Input';
import Modal from '../../../components/modals/Modal';
import Title from '../../../components/Title';
import merovService from '../../../../services/merov';
import { permissionsData } from './permissions';
import { isOwnerOverAdmin } from '../../../../helpers/permissions/isOwnerOverAdmin';
import { Permission } from '../../../../typings/permissions';

export type EditMemberProps = {
    visible: boolean;
    setVisible: Function;
    memberId: string;
};

export default function EditMember({ memberId, visible, setVisible }: EditMemberProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [memberPermissions, setMemberPermissions] = useState<{ [key: string]: boolean } | null>(null);

    const fetchMember = async () => merovService.secureApi().getMemberById(memberId);

    const { data: member, mutate: update } = useSWR(`/organizations/me/member/${memberId}`, fetchMember);

    useEffect(() => {
        update();
    }, [memberId]);

    const updateMember = async (values) => {
        setLoading(true);
        const permissions = Object.keys(values)
            .filter((k) => values[k])
            .map(String);

        try {
            await merovService.secureApi().updateMember(permissions, memberId);
        } catch (error) {
            notification.open({
                message: 'Troubles to update member!',
                className: 'error',
            });
            return false;
        } finally {
            setIsAdmin(false);
        }
        notification.open({
            message: 'Member updated!',
            className: 'success',
        });
        update();
        setLoading(false);
        setVisible(false);
    };

    useEffect(() => {
        if (!visible) {
            setMemberPermissions(null);
        }
    }, [visible]);

    useEffect(() => {
        if (!member || !visible) return;
        setMemberPermissions(member.permissions.reduce((a, v) => ({ ...a, [v]: true }), {}));
        setCanEdit(isOwnerOverAdmin(member.permissions as Permission[]));
    }, [member, memberId, visible]);

    return (
        <Modal shouldOpen={visible} className={`w-11/12 ${canEdit ? 'md:w-[40rem]' : 'md:w-96'} z-40 relative`}>
            <Title text={'Edit Member'} className="text-2xl m-0 leading-none" showLeftLine />
            <div className="mt-8 z-40  relative ">
                {member && memberPermissions !== null ? (
                    canEdit ? (
                        <Formik
                            initialValues={{
                                admin: false,
                                products: false,
                                chats: false,
                                orders: false,
                                offers: false,
                                wallets: false,
                                addresses: false,
                                account: false,
                                ...memberPermissions,
                            }}
                            onSubmit={(values) => {
                                updateMember(values);
                            }}
                        >
                            {(formik) => {
                                const setAdmin = () => {
                                    if (!formik.values.admin) {
                                        setIsAdmin(true);
                                        formik.setValues({
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
                                    <form className="rounded-lg w-full" onSubmit={formik.handleSubmit}>
                                        <Input
                                            className="mt-4"
                                            placeholder="Enter first name"
                                            label={'First Name'}
                                            value={member.firstName}
                                            disabled
                                        />
                                        <Input
                                            className="mt-4"
                                            placeholder="Enter last name"
                                            label={'Last Name'}
                                            value={member.lastName}
                                            disabled
                                        />

                                        <Input
                                            className="mt-4"
                                            placeholder="Enter status"
                                            label={'Status'}
                                            value={member.idVerificationStatus}
                                            disabled
                                        />

                                        <Input className="mt-4" placeholder="Enter email" label={'Email'} value={member.email} disabled />
                                        <Input className="mt-4" placeholder="Enter phone" label={'Phone'} value={member.phone} disabled />
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
                                                        <div className={`mr-2 ${item !== 'admin' && isAdmin ? 'text-stone-600' : ''}`}>
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

                                            <Button type="submit" className="w-full" loading={loading} variant={VARIANT.PRIMARY}>
                                                Update
                                            </Button>
                                        </div>
                                    </form>
                                );
                            }}
                        </Formik>
                    ) : (
                        <>
                            <h4>You don&apos;t have permission to edit this user.</h4>
                            <div className="mt-4 flex">
                                <Button className="w-full m-auto" variant={VARIANT.TERTIARY} onClick={() => setVisible(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </>
                    )
                ) : (
                    <>
                        <h4>Loading...</h4>
                        <div className="mt-4 flex">
                            <Button className="w-52 m-auto" variant={VARIANT.TERTIARY} onClick={() => setVisible(false)}>
                                Cancel
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}
