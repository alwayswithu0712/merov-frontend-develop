import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUser, useMerovUser } from '../../../../hooks/useMerovUser';
import { Chat } from '../../../../typings/chat';
import { Account } from '../../../../typings/account';

const ChatListItem = ({ chat, handleClick, isSelected }: { chat: Chat; handleClick: Function; isSelected: boolean }) => {
    const user = useMerovUser() as IUser;

    const [seller, setSeller] = useState<Account | null>(null);
    const [buyer, setBuyer] = useState<Account | null>(null);

    useEffect(() => {
        if (user.accountId === chat.seller.id) {
            setBuyer(chat.buyer);
        } else {
            setSeller(chat.seller);
        }
    }, [chat.buyer, chat.seller, user.accountId]);

    const lastMessageCreatedAt = chat.lastMessage?.createdAt ? new Date(chat.lastMessage?.createdAt) : null;

    return (
        <AllDiv onClick={() => handleClick(chat)} style={{ background: isSelected ? '#181a1c' : 'black' }}>
            <Image src={seller?.avatarUrl || buyer?.avatarUrl} />
            <div style={{ width: '80%' }}>
                <UserName>@{seller?.name || buyer?.name}</UserName>
                <LastMessage>{chat.lastMessage?.message}</LastMessage>
            </div>
            <div>
                {lastMessageCreatedAt ? (
                    <DateText>
                        {lastMessageCreatedAt.getHours()}:{lastMessageCreatedAt.getMinutes()}
                    </DateText>
                ) : null}
                {chat.unreadMessageCount && chat.unreadMessageCount > 0 ? <UnreadCount>{chat.unreadMessageCount}</UnreadCount> : null}
            </div>
        </AllDiv>
    );
};

export default ChatListItem;

const AllDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: start;
    height: 80px;
    padding: 0px 20px;
    background: black;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50px;
`;

const UserName = styled.p`
    margin: 0px;
    font-size: 13px;
    line-height: 24px;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const UnreadCount = styled.div`
    width: 20px;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    background: #47e6b6;
    color: black;
`;
const LastMessage = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    opacity: 0.5;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const DateText = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 21px;
    opacity: 0.4;
`;
