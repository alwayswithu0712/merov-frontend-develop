import { Form, Input as AntdInput, Modal, notification, Select } from 'antd';
import React, { useState } from 'react';
import merovService from '../../../services/merov';
import SelectCustom from '../../components/inputs/SelectCustom';
import Button, { SIZE, VARIANT as BTN_VARIANT } from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import Title from '../../components/Title';
import { useCompatibilityAntdForm } from '../../../hooks/useCompatibilityAntdForm';

interface ContactModalProps {
    contactModal: boolean;
    setContactModal: Function;
}

const categories = [
    'I have a problem with a purchase',
    'I have a problem with a sale',
    'I want to know more about Merov',
    'Business Inquiries',
    'Other',
];

const initialErrorFields = {
    reason: false,
    name: false,
    email: false,
    description: false,
};

export default function ContactModal({ contactModal, setContactModal }: ContactModalProps) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const { errors, setErrors, handleSetError } = useCompatibilityAntdForm<typeof initialErrorFields>(initialErrorFields);

    const handleSendContact = async (value: any) => {
        if (loading) return;
        setLoading(true);
        try {
            await merovService.api.postContact(value);
            notification.open({
                message: 'Successful!',
                description: `Contact sent successfully!`,
                className: 'success',
            });
        } catch (error) {
            notification.open({
                message: 'Error!',
                description: error.message,
                className: 'error',
            });
        } finally {
            setLoading(false);
            onCloseModal();
        }
    };

    const onCloseModal = async () => {
        setContactModal(false);
        setErrors(initialErrorFields);
        form.resetFields();
    };

    function EmailValidator(email: string) {
        if (!email) {
            handleSetError('email', true);
            return Promise.reject(new Error(`Email is required!`));
        }
        // eslint-disable-next-line
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email)) {
            handleSetError('email', false);
            return Promise.resolve();
        }
        handleSetError('email', true);
        return Promise.reject(new Error(`Invalid Email!`));
    }

    function NameValidator(name: string) {
        if (name == null || name.length < 3 || name.length > 35) {
            handleSetError('name', true);
            return Promise.reject(new Error(`Name must have between 3 and 35 characters!`));
        }
        handleSetError('name', false);
        return Promise.resolve();
    }

    function DescriptionValidator(name: string) {
        if (name == null || name.length < 5 || name.length > 100) {
            return Promise.reject(new Error(`Description must have between 5 and 100 characters!`));
        }
        return Promise.resolve();
    }

    return (
        <Modal width="692px" visible={contactModal} onCancel={onCloseModal} footer={false} className="add-address-modal">
            <div className="row contact-modal add-wallet-modal">
                <Form form={form} name="basic" size="large" onFinish={handleSendContact} layout="vertical" className="form-add-wallet">
                    <Title text="Contact Form" className="mb-8 text-3xl" />
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Reason is required',
                            },
                        ]}
                        name="reason"
                        validateTrigger="onSubmit"
                        wrapperCol={{ span: 24 }}
                    >
                        <SelectCustom className="select_custom SelectrText" placeholder="Select Reason" label="Reason">
                            {categories.map((category: string) => (
                                <Select.Option key={category} value={category} className="SelectrText">
                                    <div className="form-item-row">{category}</div>
                                </Select.Option>
                            ))}
                        </SelectCustom>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        validateTrigger="onSubmit"
                        className="col-sm-12 col-md-12 col-lg-12 col-xl-12 "
                        style={{ display: 'inline-block' }}
                        wrapperCol={{
                            span: 24,
                        }}
                        rules={[
                            {
                                validator: (e, a) => NameValidator(a),
                            },
                        ]}
                    >
                        <Input max={'35'} min={'3'} label="Name" placeholder="Enter your Name" hasError={errors.name} customWeight="100" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        validateTrigger="onSubmit"
                        className="col-sm-12 col-md-12 col-lg-12 col-xl-12 "
                        style={{ display: 'inline-block' }}
                        wrapperCol={{
                            span: 24,
                        }}
                        rules={[
                            {
                                validator: (e, a) => EmailValidator(a),
                            },
                        ]}
                    >
                        <Input label="Email" placeholder="Enter your Email" hasError={errors.email} customWeight="100" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        validateTrigger="onSubmit"
                        className="input_custom"
                        rules={[
                            {
                                validator: (e, a) => DescriptionValidator(a),
                            },
                        ]}
                    >
                        <AntdInput.TextArea maxLength={200} minLength={10} className=" up-input input-txtArea-height " />
                    </Form.Item>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-10">
                        <Button
                            className="w-full"
                            variant={BTN_VARIANT.TERTIARY}
                            size={SIZE.SMALL}
                            onClick={() => {
                                onCloseModal();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant={BTN_VARIANT.PRIMARY} size={SIZE.SMALL} loading={loading} bold>
                            Send
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
