import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import PencilLogo from '../../../../../assets/icons/PencilLogo';
import CloseLogo from '../../../../../assets/icons/CloseLogo';
import AddAddressModal from '../../../../components/modals/AddAddressModal';
import COLORS from '../../../../foundation/colors';
import RemoveAddress from '../../modals/RemoveAddress';
import merovService from '../../../../../services/merov';
import Button, { SIZE, VARIANT } from '../../../../components/buttons/Button';
import { DeliveryAddress } from '../../../../../typings/deliveryAddress';

const DeliveryAddressInfo = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [deliveryAddressSelected, setDeliveryAddressSelected] = useState<DeliveryAddress | null>(null);
    const [removeModalState, setRemoveModalState] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);

    useEffect(() => {
        if (!visible) {
            setDeliveryAddressSelected(null);
        }
    }, [visible]);

    const { data: addresses, mutate: update } = useSWR('/accounts/me/address', merovService.secureApi().getAddresses);

    if (!addresses) {
        return null;
    }

    const handleEditAddress = async (id: string) => {
        setVisible(true);
        setDeliveryAddressSelected(addresses.find((address) => address.id === id));
    };
    const handleAddNewAddress = () => {
        setVisible(true);
        setAddMode(true);
    };

    return (
        <Container>
            <Width>
                <TitleAndButtonDiv>
                    <Title>My Addresses</Title>
                    <Button variant={VARIANT.SECONDARY} onClick={handleAddNewAddress} size={SIZE.SMALL}>
                        Add address
                    </Button>
                </TitleAndButtonDiv>
                {addresses.map((address, index) => (
                    <PerosnalInfoDiv key={index} className="animate__animated animate__fadeIn animate__faster">
                        <WidthDiv>
                            {index === 0 ? (
                                <AddressDiv>
                                    <AddressNamegreen>Primary Address</AddressNamegreen> - <AddressName>“{address.name}”</AddressName>
                                </AddressDiv>
                            ) : (
                                <AddressDiv>
                                    <AddressName>“{address.name}”</AddressName>
                                </AddressDiv>
                            )}

                            <TextIconDiv>
                                <AddressInfo>
                                    {address.state}, {address.country}, {address.postcode}
                                </AddressInfo>
                            </TextIconDiv>
                            <TextIconDiv>
                                <AddressInfoBold>{address.street}</AddressInfoBold>
                            </TextIconDiv>
                        </WidthDiv>
                        <Icons>
                            <div
                                style={{ marginLeft: '2px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => {
                                    handleEditAddress(address.id);
                                    setAddMode(false);
                                }}
                            >
                                <PencilLogo color={'grey'} />
                                <IconText>Edit</IconText>
                            </div>
                            <div
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => {
                                    setRemoveModalState(true);
                                }}
                            >
                                <CloseLogo />
                                <IconText>Remove</IconText>
                            </div>
                        </Icons>
                        <RemoveAddress
                            deleteAddress={() => update()}
                            removeModalState={removeModalState}
                            setRemoveModalState={setRemoveModalState}
                            id={address.id}
                        />
                    </PerosnalInfoDiv>
                ))}
            </Width>
            <AddAddressModal
                editAddress={() => update()}
                createAddress={() => update()}
                addMode={addMode}
                deliveryAddress={deliveryAddressSelected}
                visible={visible}
                setVisible={setVisible}
            />
        </Container>
    );
};

export default DeliveryAddressInfo;

const Title = styled.h2`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;

    line-height: 22px;
    margin: 0px;
`;
const AddressName = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
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
const AddressInfo = styled.h2`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    width: 100%;
    margin-bottom: 5px;
`;
const AddressInfoBold = styled.h2`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
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

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const WidthDiv = styled.div`
    width: 100%;
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
const PerosnalInfoDiv = styled.div`
    display: flex;
    border: 2px solid #2e2e2e;
    width: 100%;
    padding: 4%;
    border-radius: 5px;
    margin: 20px 0px;
`;
const Icons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;
const AddressDiv = styled.div`
    margin-bottom: 20px;
`;
