import Router from 'next/router';

export const handleChatClick = async (chatId: string) => {
    Router.push(`/account/inbox/${chatId}`);
};
