import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useMobile } from '../../../hooks/useMobile';
import COLORS from '../../foundation/colors';
import MainLayout from '../MainLayout';
import AccountSidebar from './AccountSidebar';

const AccountLayout = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const mobile = useMobile();

    return (
        <MainLayout headTitle="Account">
            {!mobile && (
                <SidebarContainer>
                    <AccountSidebar />
                </SidebarContainer>
            )}
            <Content>{children}</Content>
        </MainLayout>
    );
};

export default AccountLayout;

const Content = styled.div`
    width: 100%;
    min-height: 900px;
    display: flex;
    flex-grow: 1;
    padding: 30px;
`;

const SidebarContainer = styled.div`
    width: 300px;
    min-width: 300px;
    height: 100%;
    background: ${COLORS.PANNELGREY};
    border-right: 1px solid rgba(255, 255, 255, 0.12);
`;
