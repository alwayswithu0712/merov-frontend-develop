import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import CloseLogo from '../../../../../assets/icons/CloseLogo';
import ShareOfferLogo from '../../../../../assets/icons/ShareOfferLogo';
import PencilLogo from '../../../../../assets/icons/PencilLogo';
import { Product } from '../../../../../typings/product';
import Currency from '../../../../components/Currency';
import COLORS from '../../../../foundation/colors';
import DeleteItemsModal from '../../../../components/modals/DeleteItemModal';
import ProductOptionsDropdown from '../../../../components/cards/ProductOptionsDropdown';
import { useMobile } from '../../../../../hooks/useMobile';

type Props = {
    product: Product;
    isEditable: boolean;
    onChangePrivacy: (product: Product) => Promise<void>;
};

const ProductListItem = ({ product, isEditable, onChangePrivacy }: Props) => {
    const [stateModal, setStateModal] = useState<boolean>(false);

    const mobile = useMobile();
    const router = useRouter();

    const isEditDisabled = product.activeOrdersCount > 0;
    const isShareOfferDisabled = !product.approved;
    const isRemoveDisabled = product.activeOrdersCount > 0;

    const handleEditProduct = () => {
        router.push(`/products/${product.id}/edit`);
    };

    const handleShareOffer = () => {
        router.push(`/products/${product.id}/offer/create`);
    };

    const handleDeleteProduct = () => setStateModal(true);

    return (
        <ProductDiv>
            <LeftDiv>
                {mobile ? (
                    <>
                        <div style={{ width: '95%' }}>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <ProductImage src={product.images[0]} />
                                <TextCurrencyDiv>
                                    <Title>{product.title}</Title>

                                    <Currency price={product.price} currency={product.currency} showImage showPrice showConversion />
                                </TextCurrencyDiv>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <Availablediv>
                                    <Available>
                                        Available Stock <Stock>{product.stock}</Stock>
                                    </Available>
                                </Availablediv>
                                <StatusDivContainer>
                                    {!product.approved && <StatusDivCompleted>In review</StatusDivCompleted>}
                                    {product.activeOrdersCount > 0 && (
                                        <StatusDivCompleted>
                                            {product.activeOrdersCount === 1
                                                ? `${product.activeOrdersCount} Open order `
                                                : `${product.activeOrdersCount} Open orders`}
                                        </StatusDivCompleted>
                                    )}
                                </StatusDivContainer>
                            </div>
                        </div>

                        {isEditable && (
                            <ThreeDots>
                                <ProductOptionsDropdown
                                    product={product}
                                    openDeleteModal={() => setStateModal(true)}
                                    onChangePrivacy={onChangePrivacy}
                                />
                            </ThreeDots>
                        )}
                    </>
                ) : (
                    <>
                        <ProductImage src={product.images[0]} />
                        <TextCurrencyDiv>
                            <StatusDivContainer>
                                <Title>{product.title}</Title>
                            </StatusDivContainer>
                            <Currency price={product.price} currency={product.currency} showImage showPrice showConversion />
                            <div className="flex justify-between mt-2">
                                {!product.approved && <StatusDivInProgress>In review</StatusDivInProgress>}
                                {product.activeOrdersCount > 0 && (
                                    <StatusDivCompleted>
                                        {product.activeOrdersCount === 1
                                            ? `${product.activeOrdersCount} Open order `
                                            : `${product.activeOrdersCount} Open orders`}
                                    </StatusDivCompleted>
                                )}
                            </div>
                        </TextCurrencyDiv>
                    </>
                )}
            </LeftDiv>

            <Divider />

            <RightDiv>
                <Availablediv>
                    <Available>
                        Available Stock <Stock>{product.stock}</Stock>
                    </Available>
                </Availablediv>

                {isEditable && (
                    <Icons>
                        <IconTextDiv
                            onClick={!isEditDisabled ? handleEditProduct : () => {}}
                            style={{ marginLeft: '2px', opacity: `${isEditDisabled ? 0.5 : 1}`, cursor: `${isEditDisabled ?? 'auto'}` }}
                        >
                            <PencilLogo color={!isEditDisabled ? COLORS.GREEN : 'white'} />
                            <IconText style={{ color: `${!isEditDisabled ? COLORS.GREEN : 'white'}` }}>Edit</IconText>
                        </IconTextDiv>

                        <IconTextDiv
                            onClick={!isShareOfferDisabled ? handleShareOffer : () => {}}
                            style={{ opacity: `${isShareOfferDisabled ? 0.5 : 1}` }}
                        >
                            <ShareOfferLogo />
                            <IconText>Share Offer</IconText>
                        </IconTextDiv>

                        <IconTextDiv
                            onClick={!isRemoveDisabled ? handleDeleteProduct : () => {}}
                            style={{ opacity: `${isRemoveDisabled ? 0.5 : 1}` }}
                        >
                            <CloseLogo color={COLORS.GREEN} />
                            <IconText>Remove</IconText>
                        </IconTextDiv>
                    </Icons>
                )}
                <DeleteItemsModal stateModal={stateModal} setStateModal={setStateModal} id={product?.id} />
            </RightDiv>
        </ProductDiv>
    );
};

export default ProductListItem;

const ThreeDots = styled.div`
    position: 'absolute';
    top: '15px';
    right: '15px';
`;

const ProductDiv = styled.div`
    display: flex;
    min-width: 100%;
    background: #121212;
    margin: 20px 0px;
    align-items: center;
    border-radius: 4px;
    border: 2px solid #1f2123;
    height: 120px;
    @media (max-width: 900px) {
        min-width: 100%;
    }
`;
const LeftDiv = styled.div`
    display: flex;
    min-width: 50%;
    padding: 0% 2%;
    background: #121212;
    border-radius: 5px;
    border-radius-right: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
    align-items: center;
    @media (max-width: 900px) {
        min-width: 100%;
    }
`;
const RightDiv = styled.div`
    display: flex;
    min-width: 50%;
    padding: 0% 2%;
    height: 100%;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background: #121212;
    @media (max-width: 900px) {
        display: none;
        min-width: 100%;
    }
`;
const Divider = styled.div`
    border: 1px solid #3d3c3f;
    height: 100%;
    padding: 0px;
    @media (max-width: 900px) {
        display: none;
    }
`;
const ProductImage = styled.img`
    max-width: 140px;
    max-height: 80px;
    min-width: 140px;
    min-height: 80px;
    border-radius: 5px;

    @media (max-width: 900px) {
        max-height: 60px;
        min-height: 60px;
        max-width: 60px;
        min-width: 60px;
    }
`;
const Title = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    max-width: 350px;
    min-width: 200px;
    font-size: 18px;
    line-height: 27px;
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    @media (max-width: 1400px) {
        margin-bottom: 5px;
    }
`;
const Available = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin: 0px;
    @media (max-width: 900px) {
        width: 80%;
    }
`;
const Stock = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
`;

const TextCurrencyDiv = styled.div`
    display: flex;
    width: 100%;

    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    padding: 0px 4%;
    justify-content: space-between;
    @media (max-width: 900px) {
        width: 90%;
        padding: 0px 4%;
        margin-bottom: 5px;
    }
`;
const Icons = styled.div`
    display: flex;
    padding: 10px 0px;

    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`;
const Availablediv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
`;
const IconTextDiv = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 2px 0px;
`;
const IconText = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    white-space: nowrap;
    font-size: 14px;
    line-height: 14px;
    margin: 0px;
    margin-left: 4px;
`;

const StatusDivContainer = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
    @media (max-width: 1400px) {
        flex-direction: column;
        align-items: start;
        margin-bottom: 5px;
    }
`;
const StatusDivCompleted = styled.div`
    height: 20px;
    background: #09261d;
    padding: 0px 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #47e6b6;
    border-radius: 50px;
    text-align: center;
    width: fit-content;
    @media (max-width: 1200px) {
        margin-bottom: 2px;
    }
    @media (max-width: 900px) {
        width: 130px;
    }
`;
const StatusDivInProgress = styled.div`
    height: 20px;
    background: #262318;
    padding: 0px 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #ffc51c;
    border-radius: 50px;
    text-align: center;
    width: fit-content;
    @media (max-width: 1200px) {
        margin-bottom: 2px;
    }
    @media (max-width: 900px) {
        width: 130px;
    }
`;
