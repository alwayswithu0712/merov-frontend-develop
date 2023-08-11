import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import merovService from '../../../../services/merov';
import MainLayout from '../../../layouts/MainLayout';
import ChatSection from './ChatSection';
import AccountLayout from '../../../layouts/AccountLayout';

export default function Inbox() {
    const router = useRouter();

    const hideSidebar = Boolean(router.query.hideSidebar) || false;

    const { data: chats } = useSWR('/chats', merovService.secureApi().getChats, { refreshInterval: 5000 });

    if (!chats) {
        return null;
    }

    return !hideSidebar ? (
        <AccountLayout>
            <Grid container spacing={2} style={{ backgroundColor: '#121212', marginLeft: 0, paddingTop: '0px' }}>
                <Grid item xs={12} style={{ paddingLeft: 0 }}>
                    <ChatSection chats={chats} />
                </Grid>
            </Grid>
        </AccountLayout>
    ) : (
        <MainLayout headTitle="Chat">
            <AllContainer className="container">
                <ChatSection chats={chats} />
            </AllContainer>
        </MainLayout>
    );
}

const AllContainer = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 1050px) {
        flex-direction: column;
    }
`;
