import { Menu, Dropdown } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import CloseLogo from '../../../assets/icons/CloseLogo';
import PencilLogo from '../../../assets/icons/PencilLogo';
import ShareOfferLogo from '../../../assets/icons/ShareOfferLogo';
import ThreeBgLogo from '../../../assets/icons/ThreeDotsBg';
import LockOpenLogo from '../../../assets/icons/LockOpenLogo';
import COLORS from '../../foundation/colors';
import { Product } from '../../../typings/product';
import LockCloseLogo from '../../../assets/icons/LockCloseLogo';

type Props = {
    product: Product;
    openDeleteModal: () => void;
    onChangePrivacy: (product: Product) => Promise<void>;
};

export default function ProductOptionsDropdown(props: Props) {
    const { product, openDeleteModal, onChangePrivacy } = props;

    const router = useRouter();

    const handleEditProduct = () => {
        router.push(`/products/${product.id}/edit`);
    };

    const handleShareOffer = () => {
        router.push(`/products/${product.id}/offer/create`);
    };

    const handleDeleteProduct = openDeleteModal;

    const isEditDisabled = product.activeOrdersCount > 0;
    const isShareOfferDisabled = !product.approved;
    const isRemoveDisabled = product.activeOrdersCount > 0;
    const canChangePrivacy = product.activeOrdersCount === 0;

    const getMenuItems = () => {
        const items: ItemType[] = [
            {
                key: 'edit',
                label: (
                    <div
                        key={'edit'}
                        onClick={!isEditDisabled ? handleEditProduct : () => {}}
                        style={{ display: 'flex', alignItems: 'center', opacity: `${isEditDisabled ? 0.5 : 1}` }}
                    >
                        <PencilLogo color={COLORS.GREEN} />
                        <GreenTooltipText>Edit</GreenTooltipText>;
                    </div>
                ),
            },
            {
                key: 'share-offer',
                label: (
                    <div
                        onClick={!isShareOfferDisabled ? handleShareOffer : () => {}}
                        style={{ display: 'flex', alignItems: 'center', opacity: `${isShareOfferDisabled ? 0.5 : 1}` }}
                    >
                        <ShareOfferLogo />
                        <TooltipText>Share offer</TooltipText>
                    </div>
                ),
            },
            {
                key: 'remove',
                label: (
                    <div
                        key={'remove'}
                        onClick={!isRemoveDisabled ? handleDeleteProduct : () => {}}
                        style={{ display: 'flex', alignItems: 'center', opacity: `${isRemoveDisabled ? 0.5 : 1}` }}
                    >
                        <CloseLogo color={'white'} />
                        <TooltipText>Remove</TooltipText>
                    </div>
                ),
            },
            {
                key: 'public-private',
                label: (
                    <div
                        key={'public-private'}
                        onClick={() => {
                            /* eslint-disable no-unused-expressions */
                            canChangePrivacy && onChangePrivacy(product);
                        }}
                        style={{ display: 'flex', alignItems: 'center', opacity: `${canChangePrivacy ? 1 : 0.5}` }}
                    >
                        {product.published ? <LockCloseLogo color={'white'} /> : <LockOpenLogo color={'white'} />}
                        <TooltipText>{product.published ? 'Set as private' : 'Set as public'}</TooltipText>
                    </div>
                ),
            },
        ];
        return items;
    };

    const menu = <Menu items={getMenuItems()} className={'offer-dropdown-container-account'}></Menu>;

    return (
        <Dropdown overlay={menu} placement={'bottomRight'}>
            <DotsDiv
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <ThreeBgLogo height={30} width={30} />
            </DotsDiv>
        </Dropdown>
    );
}

const DotsDiv = styled.div`
    cursor: pointer;
`;

const TooltipText = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    margin: 0px;
    margin-left: 10px;

    line-height: 14px;
`;

const GreenTooltipText = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    margin: 0px;
    margin-left: 10px;
    color: ${COLORS.GREEN};
    line-height: 14px;
`;
