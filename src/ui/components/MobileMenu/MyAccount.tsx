import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CartLogo from '../../../assets/icons/CartLogo';
import ClockLogo from '../../../assets/icons/ClockLogo';
import HandLogo from '../../../assets/icons/HandLogo';
import InboxLogo from '../../../assets/icons/InboxLogo';
import NotificationLogo from '../../../assets/icons/NotificationLogo';
import OfferLogo from '../../../assets/icons/OfferLogo';
import SettingsLogo from '../../../assets/icons/SettingsLogo';
import UserLogo from '../../../assets/icons/UserLogo';
import UsersLogo from '../../../assets/icons/UsersLogo';
import { usePermissionVerifier } from '../../../hooks/usePermissionVerifier';
import { Permission } from '../../../typings/permissions';
import { IUser } from '../../../hooks/useMerovUser';

export default function MyAccount({ user }: { user: IUser }) {
    const [show, setShow] = useState<boolean>(false);
    const { hasPermissions } = usePermissionVerifier([Permission.Orders, Permission.Chats, Permission.Products, Permission.Offers]);
    const dispatch = useDispatch();

    const links = [
        {
            title: 'Profile',
            path: '/account/profile',
            icon: <UserLogo width="22" height="22" color={'white'} />,
            isValidForRender: true,
        },
        {
            title: 'Products',
            path: '/account/products',
            icon: <HandLogo width="22" height="22" />,
            isValidForRender: hasPermissions(Permission.Products),
        },
        {
            title: 'Sales',
            path: '/account/sales/active',
            icon: <CartLogo width="22" height="22" />,
            isValidForRender: hasPermissions(Permission.Orders),
        },
        {
            title: 'Purchases',
            path: '/account/purchases/active',
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

    const closeMenu = () => {
        dispatch({ type: 'MOBILE_MENU_CLOSE' });
    };

    const handleShow = () => {
        setShow(!show);
    };

    return (
        <>
            <div onClick={handleShow} className="mobile-account">
                My Account
                {show ? <i className="ri-arrow-up-s-fill arrow-icon"></i> : <i className="ri-arrow-down-s-fill arrow-icon"></i>}
            </div>
            {show &&
                links
                    .filter((link: any) => link.isValidForRender)
                    .map((link) => (
                        <div key={link.path} onClick={closeMenu} className="mobile-account-links-item">
                            <i className="mobile-account-icon">{link.icon}</i>
                            <Link href={link.path} passHref>
                                <a>{link.title}</a>
                            </Link>
                        </div>
                    ))}
        </>
    );
}
