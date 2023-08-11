import { Modal } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Button, { SIZE, VARIANT } from '../../../components/buttons/Button';

interface RemoveAddressProps {
    stateModal: boolean;
    setStateModal: (state: boolean) => void;
    updateFunction: () => {};
}

export default function ConfirmUpdateModal({ stateModal, setStateModal, updateFunction }: RemoveAddressProps) {
    const onCloseModal = async (e) => {
        e.preventDefault();
        setStateModal(false);
    };

    return (
        <Modal width="600px" visible={stateModal} onCancel={onCloseModal} footer={false}>
            <AllDiv className="row">
                <Title>Confirm changes</Title>
                <SubTitle>
                    After editing, your product will have to be <SubTitleRemarked>reviewed again</SubTitleRemarked> before appearing on the
                    marketplace.
                </SubTitle>
                <ButtonsDiv>
                    <Button size={SIZE.MEDIUM} variant={VARIANT.TERTIARY} onClick={onCloseModal}>
                        Go Back
                    </Button>

                    <Button size={SIZE.MEDIUM} variant={VARIANT.PRIMARY} onClick={updateFunction}>
                        Confirm
                    </Button>
                </ButtonsDiv>
            </AllDiv>
        </Modal>
    );
}
const Title = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 22px;
    width: 100%;
    text-align: center;
    margin: 10px;
`;
const AllDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const ButtonsDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    gap: 16px;
`;
const SubTitle = styled.span`
    width: 80%;
    text-align: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    margin: 10px;
`;
const SubTitleRemarked = styled.span`
    width: 80%;
    text-align: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
`;
