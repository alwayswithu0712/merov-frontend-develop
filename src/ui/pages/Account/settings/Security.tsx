import React from 'react';
import styled from 'styled-components';
import Security from './Security/Security';

const Settings = () => (
    <Div>
        <TitleHeader>My Settings</TitleHeader>
        <Security />
    </Div>
);
export default Settings;

const Div = styled.div`
    flex-direction: column;
    width: 100%;
`;

const TitleHeader = styled.h3`
    font-family: 'Poppins';
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    margin: 0px;
`;
