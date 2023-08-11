import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import MyAccount from './MyAccount';
import { useMerovUser } from '../../../hooks/useMerovUser';
import Button, { SIZE } from '../buttons/Button';
import AccountAvatar, { VARIANT as PROFILE_VARIANT } from '../AccountAvatar';
import COLORS from '../../foundation/colors';

function MobileMenu() {
    const user = useMerovUser();
    const dispatch = useDispatch();
    const [isMyAccountOpen, setIsMyAccountOpen] = useState<boolean>(false);

    const handleCloseMenu = () => {
        dispatch({ type: 'MOBILE_MENU_CLOSE' });
    };

    const handleSellProduct = async () => {
        await router.push('/products/create');
        handleCloseMenu();
    };

    return (
        <>
            <div className="mobile-menu overflow-y-scroll ">
                <div className="mobile-menu-backdrop" onClick={() => handleCloseMenu()}></div>

                <div className="mobilemenu__body">
                    <div className={`row h-full bg-[${COLORS.LIGHTDARK}]`}>
                        <div className={`col-2 close-col bg-[${COLORS.LIGHTDARK}] `}>
                            <div onClick={() => handleCloseMenu()} className="mobilemenu__close">
                                <i className="ri-close-fill"></i>
                            </div>
                        </div>
                        <div className="col-10 mobile-menu-data ">
                            {user.account ? (
                                <>
                                    <div className="row mobile-menu-user-data " onClick={handleCloseMenu}>
                                        <AccountAvatar
                                            name={user.account.name}
                                            avatarUrl={user.account.avatarUrl}
                                            variant={PROFILE_VARIANT.HORIZONTAL}
                                            href={'/account/profile'}
                                            imageSize={40}
                                            isMobileMenu={true}
                                            showName
                                            animatePhoto
                                        />
                                        <div className="col-12 mobile-menu-border-margin">
                                            <div className="mobile-menu-border col-12"></div>
                                        </div>
                                    </div>
                                    <div className="col-12 mobile-menu-margin">
                                        <Button onClick={handleSellProduct} size={SIZE.SMALL} className="col-12">
                                            Sell a product
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <Button onClick={handleSellProduct} size={SIZE.SMALL} className="col-12">
                                        Sign in
                                    </Button>

                                    <div className="mobile-menu-register-row">
                                        <div className="header-register-text">Don´t have an account?</div>
                                        <a className="header-register-register" href={'/signup'}>
                                            Register
                                        </a>
                                    </div>
                                </div>
                            )}
                            <div className="mobilemenu__content ">
                                <div onClick={() => handleCloseMenu()} className="mobile-links-item">
                                    <Link href={`/`} passHref>
                                        <a>Home</a>
                                    </Link>
                                </div>
                                <div onClick={() => handleCloseMenu()} className="mobile-links-item">
                                    <Link href={`/browse`} passHref>
                                        <a>Browse</a>
                                    </Link>
                                </div>
                                <div onClick={() => handleCloseMenu()} className="mobile-links-item">
                                    <Link href={`/resources`} passHref>
                                        <a>Resources</a>
                                    </Link>
                                </div>
                                {user.id && (
                                    <div
                                        className="mobile-links-account-item"
                                        onClick={() => setIsMyAccountOpen((prevState) => !prevState)}
                                    >
                                        <MyAccount user={user}/>
                                    </div>
                                )}
                                {user.id && (
                                    <LogoutDiv isMyAccountOpen={isMyAccountOpen}>
                                        <div onClick={user.logout}>
                                            <div className="mobile-links-item ">Logout</div>
                                        </div>
                                    </LogoutDiv>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MobileMenu;

const LogoutDiv = styled('div')(
    (props: { isMyAccountOpen: boolean }) => `
    ${
        !props.isMyAccountOpen &&
        `     
        position: fixed;
        bottom: 10px;

        `
    };
`,
);
