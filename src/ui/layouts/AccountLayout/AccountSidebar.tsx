import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import HandLogo from '../../../assets/icons/HandLogo';
import CartLogo from '../../../assets/icons/CartLogo';
import ClockLogo from '../../../assets/icons/ClockLogo';
import InboxLogo from '../../../assets/icons/InboxLogo';
import NotificationLogo from '../../../assets/icons/NotificationLogo';
import SettingsLogo from '../../../assets/icons/SettingsLogo';
import COLORS from '../../foundation/colors';
import OfferLogo from '../../../assets/icons/OfferLogo';
import { RootState } from '../../../store/root/rootReducer';
import { useMerovUser, IUser } from '../../../hooks/useMerovUser';
import Button, { SIZE, VARIANT as BTN_VARIANT } from '../../components/buttons/Button';
import AccountAvatar, { VARIANT as PROFILE_VARIANT } from '../../components/AccountAvatar';
import UsersLogo from '../../../assets/icons/UsersLogo';
import { Permission } from '../../../typings/permissions';
import { usePermissionVerifier } from '../../../hooks/usePermissionVerifier';

const AccountSidebar = () => {
    const user = useMerovUser() as IUser;

    const { unread } = useSelector((state: RootState) => state.notifications);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { hasPermissions } = usePermissionVerifier([Permission.Orders, Permission.Chats, Permission.Products, Permission.Offers]);

    const menuItems = [
        {
            title: 'Products',
            path: '/account/products',
            icon: <HandLogo width="22" height="22" />,
            isValidForRender: hasPermissions(Permission.Products),
        },
        {
            title: 'Sales',
            path: '/account/sales/active',
            alternativePath: '/account/sales/completed',
            icon: <CartLogo width="22" height="22" />,
            isValidForRender: hasPermissions(Permission.Orders),
        },
        {
            title: 'Purchases',
            path: '/account/purchases/active',
            alternativePath: '/account/purchases/completed',
            icon: <ClockLogo width="22" height="22" />,
            isValidForRender: hasPermissions(Permission.Orders),
        },
        {
            title: 'Offers',
            path: '/account/offers/active',
            alternativePath: '/account/offers/expired',
            icon: <OfferLogo width="22" height="22" />,
            isValidForRender: hasPermissions(Permission.Offers),
        },
        {
            title: 'Members',
            path: '/account/members',
            icon: <UsersLogo width="22" height="22" />,
            isValidForRender: user.account && user.account.organization && hasPermissions(),
        },
        {
            title: 'Inbox',
            path: '/account/inbox',
            icon: <InboxLogo width="22" height="22" />,
            isValidForRender: hasPermissions(Permission.Chats),
        },
        {
            title: 'Notifications',
            path: '/account/notifications',
            icon: <NotificationLogo width="22" height="22" />,
            isValidForRender: true,
        },
        {
            title: 'Settings',
            path: '/account/settings',
            icon: <SettingsLogo width="22" height="22" />,
            isValidForRender: true,
        },
    ];

    const router = useRouter();

    const handleLogout = () => {
        if (isLoading) return;
        setIsLoading(true);
        user.logout();
    };

    if (!user.account) {
        return null;
    }

    return (
        <Parent>
            <AccountAvatar
                name={user.account.name}
                avatarUrl={user.account.avatarUrl}
                rating={user.account.rating}
                reviewCount={user.account.rating}
                variant={PROFILE_VARIANT.HORIZONTAL}
                href={'/account/profile'}
                imageSize={45}
                showName
                showStars
                animatePhoto
            />
            <ButtonContainer>
                <Button
                    size={SIZE.MEDIUM}
                    loading={isLoading}
                    onClick={handleLogout}
                    variant={BTN_VARIANT.QUATERNARY}
                    customStyle={'width: 100%;'}
                >
                    Logout
                </Button>
            </ButtonContainer>

            {menuItems
                .filter((item: any) => item.isValidForRender)
                .map((item, i) => (
                    <Link key={i} href={item.path} passHref>
                        <MenuItem selected={item.path === router.pathname || item.alternativePath === router.pathname}>
                            {item.icon}
                            <TabText>{item.title}</TabText>
                            {unread.length > 0 && item.title === 'Notifications' && <RedDot />}
                        </MenuItem>
                    </Link>
                ))}
        </Parent>
    );
};

export default AccountSidebar;

const Parent = styled.div`
    display: flex;
    position: sticky;
    padding: 0px 15px 0px 45px;
    flex-direction: column;
    width: 100%;
    top: 86px;
    left: 0;
    right: 0;
    transform: translate(0%, 0);

    @media (max-width: 800px) {
        display: none;
    }
`;

const RedDot = styled.div`
    background: #e64747;
    width: 5px;
    height: 5px;
    border-radius: 20px;
    margin-left: 5px;
`;

const ButtonContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
`;
const TabText = styled.h2`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    margin: 0px;
    margin-left: 10px;
    @media (max-width: 800px) {
        width: 80%;
    }
`;

const MenuItem = styled.a<{ selected: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 18px 0px 18px 15px;
    margin: 10px 0px;
    cursor: pointer;

    ${({ selected }) =>
        !selected &&
        `
        &:hover {
            border-radius: 8px;
            background: ${COLORS.BACKGROUNDGREY};
        }`}
    ${({ selected }) =>
        selected &&
        `
            background: ${COLORS.BACKGROUNDGREY};
        `}
`;
