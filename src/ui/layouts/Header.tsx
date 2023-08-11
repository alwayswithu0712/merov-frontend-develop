import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { MOBILE_MENU_OPEN, MOBILE_MENU_CLOSE } from '../../store/mobileMenu/types';
import { useMerovUser } from '../../hooks/useMerovUser';
import SigninDropdown from './SigninDropDown';
import NotificationLogo from '../../assets/icons/NotificationLogo';
import { RootState } from '../../store/root/rootReducer';
import Button, { SIZE } from '../components/buttons/Button';
import AccountAvatar, { VARIANT as PROFILE_VARIANT } from '../components/AccountAvatar';
import merovService from '../../services/merov';
import { BackendEvents } from '../../typings/notification';

function Header() {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useMerovUser();

    const { unread } = useSelector((state: RootState) => state.notifications);

    const headerLinks = [
        { name: 'home', route: '/' },
        { name: 'browse', route: '/browse' },
        { name: 'resources', route: '/resources' },
    ];

    const handleCloseMenu = () => {
        dispatch({ type: MOBILE_MENU_CLOSE });
    };

    const handleOpenMenu = () => {
        dispatch({ type: MOBILE_MENU_OPEN });
    };

    useEffect(() => {
        const eventSource = merovService.secureApi().listenEvents(user.id, (data) => {
            if (data?.type === BackendEvents.SardineDocumentVerification) {
                Router.replace('/account/profile');
            }
        });

        return () => {
            eventSource.close();
        };
    }, [user.id]);

    const links = headerLinks.map((header: { name: string; route: string }, index: number) => (
        <Link key={index} href={header.route} passHref>
            <a onClick={handleCloseMenu} className={`dropdown-item ${router.pathname === header.route ? 'header-text-decor' : ''}`}>
                {header.name}
            </a>
        </Link>
    ));

    return (
        <header className="z-20 header ">
            <div className="header-container">
                <div className="header-content aic jcsb">
                    <div style={{ zIndex: '10', backgroundColor: 'transparent' }} className="header_logo">
                        <img onClick={() => router.push(`/`)} src="/images/logoV2.png"></img>
                    </div>
                    <div style={{ zIndex: '10' }} className="header_links aic jcsb">
                        <div className="display-header aic jcsb">{links}</div>

                        <div className="aic display-header">{!user.id && <SigninDropdown />}</div>
                        {user.account && (
                            <>
                                <AccountAvatar
                                    name={user.account.name}
                                    avatarUrl={user.account.avatarUrl}
                                    variant={PROFILE_VARIANT.HORIZONTAL}
                                    href={'/account/profile'}
                                    imageSize={40}
                                    showName
                                />
                                <Link href="/account/notifications" passHref>
                                    <a className="flex pointer mx-5">
                                        <NotificationLogo width="22" height="22" />
                                        {unread.length > 0 && <RedDot />}
                                    </a>
                                </Link>
                            </>
                        )}
                        <div className="hidden sm:block">
                            <Link href="/products/create" passHref>
                                <a>
                                    <Button size={SIZE.MEDIUM}>Sell a product</Button>
                                </a>
                            </Link>
                        </div>
                        <i onClick={handleOpenMenu} className="ri-menu-line display-mobile-menu"></i>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

const RedDot = styled.div`
    background: #e64747;
    width: 7px;
    height: 7px;
    border-radius: 20px;
    margin-left: -8px;
    margin-top: 13px;
`;
