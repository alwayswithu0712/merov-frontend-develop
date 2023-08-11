import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from './Header';
import PageHead from './PageHead';
import Footer from './Footer';
import MobileMenu from '../components/MobileMenu';

interface LayoutProps {
    headTitle?: string;
    children?: React.ReactNode;
    pageClass?: string;
    width?: string;
    account?: boolean;
}

interface IOpen {
    mobileMenu: {
        open: boolean;
    };
}
const MainLayout = ({ headTitle, children }: LayoutProps) => {
    const open = useSelector((state: IOpen) => state.mobileMenu.open);

    return (
        <>
            <PageHead headTitle={headTitle} />
            {open && <MobileMenu />}
            <Parent>
                <Header />
                <Main>{children}</Main>
                <Footer />
            </Parent>
        </>
    );
};

const Parent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Main = styled.div`
    margin-top: 86px;
    display: flex;
    flex-grow: 1;

    @media (max-width: 767px) {
        margin-top: 0px;
    }
`;

export default MainLayout;
