import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { Chat } from '../../../../typings/chat';
import ChatListItem from './ChatListItem';

const ChatList = ({ chatId, chats, handleClick }: { chatId?: string; chats: Chat[]; handleClick: Function }) => {
    const size = useWindowSize();

    return (
        <>
            <ChatListDiv>
                <Title>Chats</Title>
            </ChatListDiv>
            {chats.length ? null : <ListContainer>No chats yet</ListContainer>}
            <ChatsContainer>
                {chats.map((chat) => (
                    <ChatListItem
                        key={chat.id}
                        chat={chat}
                        handleClick={handleClick}
                        isSelected={size.width > 1250 && chat.id === chatId}
                    ></ChatListItem>
                ))}
            </ChatsContainer>
        </>
    );
};
export default ChatList;

const ChatListDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: start;
    height: 65px;
    padding: 0px 20px;
    background: #161616;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-right: none;
    border-right: none;
    border-left: none;
`;
const ChatsContainer = styled.div`
    height: 81.38vh;
    overflow-y: scroll;
`;
const Title = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
`;
const ListContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
