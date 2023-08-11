import React from 'react';
import styled from 'styled-components';
import { NotificationText } from './NotificationText';

const NotificationsCard = ({ notification }) => (
    <CardDiv className='animate__animated animate__fadeIn animate__faster'>
        <NotificationText notification={notification} />
    </CardDiv>
);

export default NotificationsCard;

const CardDiv = styled.div`
    display: flex;
    background: #121212;
    width: 100%;
    align-items: center;
    border: 1px solid #2e2e2e;
    border-radius: 5px;
    padding: 15px;
    margin: 10px;
`;
