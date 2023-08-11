import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import CloseLogo from '../../../../../assets/icons/CloseLogo';
import AddWalletModal from '../../../../components/modals/AddWalletModal';
import COLORS from '../../../../foundation/colors';
import RemoveWallet from '../../modals/RemoveWallet';
import merovService from '../../../../../services/merov';
import Button, { SIZE, VARIANT } from '../../../../components/buttons/Button';

const WalletsInfo = () => {
    const [removeModalState, setRemoveModalState] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>('');

    const [addWalletModal, setAddWalletModal] = useState<boolean>(false);

    const { data: wallets, mutate: update } = useSWR('/account/me/wallets', merovService.secureApi().getMyWallets);

    if (!wallets) {
        return null;
    }

    const onCloseAddWalletModal = () => {
        setAddWalletModal(false);
    };

    return (
        <Container>
            <Width>
                <TitleAndButtonDiv>
                    <Title>My Wallets</Title>
                    <Button onClick={() => setAddWalletModal(true)} loading={addWalletModal} size={SIZE.SMALL} variant={VARIANT.SECONDARY}>
                        Add Wallet
                    </Button>
                </TitleAndButtonDiv>
                {wallets.map((wallet, index) => (
                    <PerosnalInfoDiv key={index} className="animate__animated animate__fadeIn animate__faster">
                        <WidthBox>
                            {index === 0 ? (
                                <div className="mb-5">
                                    <AddressNamegreen>Primary Wallet</AddressNamegreen> - <WalletName>“{wallet.name}”</WalletName>
                                </div>
                            ) : (
                                <div className="mb-5">
                                    <WalletName>“{wallet.name}”</WalletName>
                                </div>
                            )}
                            <TextIconDiv>
                                <WalletAddressBold>{wallet.address}</WalletAddressBold>
                            </TextIconDiv>
                            <div>
                                <WalletInfo>Network:</WalletInfo> <WalletInfoBold>{wallet.chain}</WalletInfoBold>
                            </div>
                        </WidthBox>
                        <div
                            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => {
                                setRemoveModalState(true);
                                setDeleteId(wallet.id);
                            }}
                        >
                            <CloseLogo />
                            <IconText>Remove</IconText>
                        </div>
                    </PerosnalInfoDiv>
                ))}
            </Width>
            <RemoveWallet
                deleteWallet={() => update()}
                removeModalState={removeModalState}
                setRemoveModalState={setRemoveModalState}
                id={deleteId}
            />
            <AddWalletModal
                addWalletModal={addWalletModal}
                onCloseAddWalletModal={onCloseAddWalletModal}
                addNewWallet={() => update()}
            ></AddWalletModal>
        </Container>
    );
};

export default WalletsInfo;

const Title = styled.h2`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 0px;
`;
const WalletName = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
`;
const AddressNamegreen = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: ${COLORS.GREEN};
`;
const WalletInfo = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
`;
const WalletInfoBold = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 27px;
`;
const WalletAddressBold = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 27px;
    margin: 0px;
    @media (max-width: 950px) {
        max-width: 70%;
        word-wrap: break-word;
    }
    @media (max-width: 800px) {
        max-width: 90%;
        word-wrap: break-word;
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const TextIconDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;
const TitleAndButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;
const Width = styled.div`
    width: 70%;
    @media (max-width: 1150px) {
        width: 80%;
    }
    @media (max-width: 1050px) {
        width: 90%;
    }
    @media (max-width: 800px) {
        width: 100%;
    }
`;
const WidthBox = styled.div`
    width: 100%;
    @media (max-width: 800px) {
        width: 90%;
    }
`;
const PerosnalInfoDiv = styled.div`
    display: flex;
    border: 2px solid #2e2e2e;
    width: 100%;
    padding: 4%;
    border-radius: 5px;
    margin: 20px 0px;
    align-items: center;
`;
const IconText = styled.h2`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 0px;
    margin-left: 10px;
`;
