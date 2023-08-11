/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import '@sendbird/uikit-react/dist/index.css';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { IUser, useMerovUser } from '../../../../hooks/useMerovUser';
import { Chat } from '../../../../typings/chat';
import ChatList from './ChatList';
import { Account } from '../../../../typings/account';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import ChatHeaderProduct from './ChatHeaderProduct';
import ChatHeaderOrder from './ChatHeaderOrder';
import Stars from '../../../components/Stars';

const Channel = dynamic(import('@sendbird/uikit-react/Channel'), { ssr: false });

export default function ChatSection({ chats }: { chats: Chat[] }) {
    const user = useMerovUser() as IUser;

    const router = useRouter();
    const [showList, setShowList] = useState(false);
    const [showChat, setShowChat] = useState(true);
    const [showBackButton, setShowBackButton] = useState(true);
    const [otherUser, setOtherUser] = useState<Account | null>(null);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);

    const size = useWindowSize();

    useEffect(() => {
        const isSmallView = size.width <= 1250;
        const hideList = router.query.hideList === 'true' || false;
        setShowList(!hideList && !(isSmallView && !!router.query.id));
        setShowChat(!isSmallView || (isSmallView && !showList));
        setShowBackButton(isSmallView && !hideList);
    }, [router.query, size, chats]);

    useEffect(() => {
        if (router.query.id) {
            const currentChatId = router.query.id as string;
            setCurrentChatById(currentChatId);
        } else {
            const [firstChat] = chats;
            if (firstChat) {
                setCurrentChatById(firstChat.id);
            }
        }
    }, [router.query.id, chats]);

    const onChannelSelect = async (chat: Chat) => {
        router.push(`/account/inbox/${chat.id}`, undefined, { shallow: true });
    };

    const setCurrentChatById = (chatId: string) => {
        const currentChat = chats.find((c) => c.id === chatId);

        if (currentChat) {
            setOtherUser(user.accountId === currentChat.sellerId ? currentChat.buyer : currentChat.seller);
            setCurrentChat(currentChat);
        }
    };

    const myColorSet = useMemo(
        () => ({
            '--sendbird-dark-primary-500': '#288065',
            '--sendbird-dark-primary-400': '#47e6b6',
            '--sendbird-dark-primary-300': '#288065',
            '--sendbird-dark-primary-200': '#47e6b6',
            '--sendbird-dark-primary-100': '#288065',
        }),
        [],
    );

    return (
        <SendbirdProvider
            appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string}
            userId={user.accountId}
            nickname={user.username}
            accessToken={user.sendBirdAccessToken}
            theme={'dark'}
            colorSet={myColorSet}
        >
            <div className="sendbird-app__wrap">
                <>
                    {showList && (
                        <div className={'fullwidth'}>
                            <ChatList chatId={currentChat?.id} chats={chats} handleClick={onChannelSelect} />
                        </div>
                    )}
                    {showChat && (
                        <div className="sendbird-app__conversation-wrap">
                            {currentChat && (
                                <UserDiv>
                                    {showBackButton && (
                                        <button
                                            onClick={async () => {
                                                await router.push('/account/inbox', undefined, { shallow: true });
                                            }}
                                            className="btn btn-custom btn-secondary-transparent-thin-chat-back"
                                        >
                                            Back to Channel List
                                        </button>
                                    )}
                                    <ChatSeller>Chat with {user.accountId === currentChat?.sellerId ? 'buyer' : 'seller'}:</ChatSeller>
                                    <UserImage src={otherUser?.avatarUrl} />
                                    <UserName>@{otherUser?.name}</UserName>
                                    <Stars rating={user.rating} size={20} />
                                </UserDiv>
                            )}

                            {currentChat?.order ? (
                                <ChatHeaderOrder
                                    product={currentChat?.product}
                                    order={currentChat?.order}
                                    isBuyer={user.accountId === currentChat?.buyerId}
                                />
                            ) : (
                                <ChatHeaderProduct product={currentChat?.product} isBuyer={user.accountId === currentChat?.buyerId} />
                            )}
                            <Channel {...{ channelUrl: currentChat?.id }} />
                        </div>
                    )}
                </>
            </div>
        </SendbirdProvider>
    );
}

const UserImage = styled.img`
    width: 32px;
    height: 32px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 50px;
`;

const UserDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 0% 2%;
    height: 65px;
    background: #161616;
    border: 1px solid rgba(255, 255, 255, 0.12);
`;

const UserName = styled.h1`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    margin: 0px;
    margin-right: 10px;
`;
const ChatSeller = styled.h1`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    opacity: 0.5;
    margin: 0px;
    @media (max-width: 940px) {
        display: none;
    }
`;
