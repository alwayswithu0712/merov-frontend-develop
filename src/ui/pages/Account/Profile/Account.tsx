import React, { useMemo } from 'react';
import styled from 'styled-components';
import router from 'next/router';
import ProfileAccount from './ProfileAccount';
import DeliveryAddressInfo from './Addresses/DeliveryAddress';
import WalletsInfo from './Wallets/Wallets';
import ProfileOrganization from './ProfileOrganization';
import { IUser, useMerovUser } from '../../../../hooks/useMerovUser';
import { Permission } from '../../../../typings/permissions';
import { usePermissionVerifier } from '../../../../hooks/usePermissionVerifier';
import { Account as AccountType } from '../../../../typings/account';

const Account = ({ view }: { view: string }) => {
    const user = useMerovUser() as IUser;
    const { hasPermissions } = usePermissionVerifier([Permission.Addresses, Permission.Wallets]);

    const tabsTitle = {
        profile: { title: 'Profile', hasPermission: true },
        addresses: { title: 'Addresses', hasPermission: hasPermissions(Permission.Addresses) },
        wallets: { title: 'Wallets', hasPermission: hasPermissions(Permission.Wallets) },
    };

    const tabs = useMemo(
        () => (
            <Tabs>
                {Object.keys(tabsTitle).map((tab) => (
                    <>
                        {tabsTitle[tab].hasPermission && (
                            <Tab
                                key={tab}
                                onClick={() => {
                                    router.push(`/account/${tab}`, undefined, { shallow: true });
                                }}
                            >
                                {view === tab ? (
                                    <TitleSelected>{tabsTitle[tab].title}</TitleSelected>
                                ) : (
                                    <Title>{tabsTitle[tab].title}</Title>
                                )}
                            </Tab>
                        )}
                    </>
                ))}
            </Tabs>
        ),
        [view, hasPermissions],
    );

    const getView = useMemo(() => {
        if (user.account) {
            switch (view) {
                case 'profile': {
                    if (user.account.organization) return <ProfileOrganization account={user.account as Required<AccountType>} />;

                    return <ProfileAccount />;
                }
                case 'addresses': {
                    return <DeliveryAddressInfo />;
                }
                case 'wallets':
                    return <WalletsInfo />;

                default:
                    return null;
            }
        }
    }, [view, user]);

    if (!user.account) {
        return null;
    }

    return (
        <InnerDiv>
            {tabs}
            <div style={{ width: '100%' }}>{getView}</div>
        </InnerDiv>
    );
};
export default Account;

const TitleSelected = styled.h2`
    text-decoration-line: underline;
    text-decoration-color: #47e6b6;
    text-underline-offset: 15px;
    margin: 0% 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    line-height: 40px;
    color: #47e6b6;
    cursor: pointer;
`;
const Title = styled.h2`
    cursor: pointer;
    margin: 0% 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    line-height: 40px;
`;

const InnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const Tabs = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 30px;
`;

const Tab = styled.div`
    display: flex;
    align-items: flex-start;
`;
