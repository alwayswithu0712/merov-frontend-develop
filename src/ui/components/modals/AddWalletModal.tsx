import { Form, Modal, notification, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Blockchain } from '../../../typings/blockchain';
import StringValidator from '../../../helpers/validators/StringValidator';
import merovService from '../../../services/merov';
import { supportedBlockchains } from '../../../services/blockchain';
import { ICreateWallet } from '../../../typings/wallet';
import SelectCustom from '../inputs/SelectCustom';
import Button, { SIZE, VARIANT as BTN_VARIANT } from '../buttons/Button';
import Input from '../inputs/Input';
import Title from '../Title';
import { useCompatibilityAntdForm } from '../../../hooks/useCompatibilityAntdForm';

interface AddWalletModalProps {
    addWalletModal: boolean;
    onCloseAddWalletModal: Function;
    addNewWallet: Function;
}

const initialErrorFields = {
    walletName: false,
    chain: false,
    sellerAddress: false,
};

export default function AddWalletModal({ addWalletModal, onCloseAddWalletModal, addNewWallet }: AddWalletModalProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [address, setWallet] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [chain, setChain] = useState<Blockchain>();
    const { WalletValidator } = StringValidator();
    const [form] = Form.useForm();

    const { errors, handleOnFinishFormErrors, handleSetError } = useCompatibilityAntdForm<typeof initialErrorFields>(initialErrorFields);

    const onCloseModal = async () => {
        onCloseAddWalletModal();
        form.resetFields();
    };

    const handleChangeBlockchain = (chain: Blockchain) => {
        setChain(chain);
    };

    const addWallet = async () => {
        const newWallet: ICreateWallet = { address, chain, name };
        setIsLoading(true);
        try {
            await merovService.secureApi().postWallet(newWallet);
            await addNewWallet(newWallet);
            notification.open({
                message: 'Wallet created!',
                className: 'success',
            });
        } catch (error) {
            notification.open({
                message: 'Error adding Wallet!',
                className: 'error',
            });
        } finally {
            setIsLoading(false);
            form.resetFields();
            onCloseModal();
        }
    };

    return (
        <Modal width="692px" visible={addWalletModal} onCancel={onCloseModal} footer={false} className="add-address-modal">
            <div className="row add-wallet-modal">
                <Form
                    form={form}
                    name="basic"
                    size="large"
                    onFinish={addWallet}
                    onFinishFailed={handleOnFinishFormErrors}
                    layout="vertical"
                    className="form-add-wallet"
                >
                    <Title text="Add New Wallet" className="mb-6 text-3xl" />
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Name is required',
                            },
                        ]}
                        name="walletName"
                        validateTrigger="onChange"
                        wrapperCol={{ span: 24 }}
                    >
                        <Input
                            id="walletName"
                            key="walletName"
                            label="Wallet Name"
                            placeholder="Enter Wallet Name"
                            onChange={(e: any) => {
                                handleSetError('walletName', false);
                                setName(e.target.value);
                            }}
                            value={name}
                            hasError={errors.walletName}
                        />
                    </Form.Item>
                    <Form.Item
                        name="chain"
                        validateTrigger="onChange"
                        className="mb-8"
                        wrapperCol={{
                            span: 24,
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Blockchain is required',
                            },
                        ]}
                    >
                        <SelectCustom
                            label="Network"
                            onChange={(e: any) => handleChangeBlockchain(e)}
                            className="select_custom"
                            placeholder="Select Blockchain"
                        >
                            {supportedBlockchains.map((item) => (
                                <Select.Option key={item}>
                                    <div className="form-item-row">{item}</div>
                                </Select.Option>
                            ))}
                        </SelectCustom>
                    </Form.Item>
                    <Form.Item
                        name="sellerAddress"
                        validateTrigger="onChange"
                        wrapperCol={{ span: 24 }}
                        rules={[
                            {
                                validator: (e, a) => WalletValidator(a, chain, handleSetError),
                            },
                        ]}
                    >
                        <Input
                            disabled={!chain}
                            id="sellerAddress"
                            key="sellerAddress"
                            label="Wallet Address"
                            placeholder="Enter Wallet Address"
                            onChange={(e: any) => {
                                setWallet(e.target.value);
                            }}
                            value={address}
                            hasError={errors.sellerAddress}
                        />
                    </Form.Item>
                    <ButtonsDiv>
                        <Button
                            variant={BTN_VARIANT.SECONDARY}
                            onClick={onCloseModal}
                            type="reset"
                            size={SIZE.MEDIUM}
                            customStyle="width: 100%;"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            loading={isLoading}
                            variant={BTN_VARIANT.PRIMARY}
                            type="submit"
                            size={SIZE.MEDIUM}
                            customStyle="width: 100%;"
                        >
                            Add Wallet
                        </Button>
                    </ButtonsDiv>
                </Form>
            </div>
        </Modal>
    );
}

const ButtonsDiv = styled.div`
    display: flex;
    margin-top: 36px;
    gap: 16px;
`;
