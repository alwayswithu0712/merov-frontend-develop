import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NotificationsCard from './NotificationsCard';
import { Notification } from '../../../../typings/notification';
import NoItems from '../../../components/NoItems';
import { RootState } from '../../../../store/root/rootReducer';
import merovService from '../../../../services/merov';

const Notifications = () => {
    const { notifications, unread } = useSelector((state: RootState) => state.notifications);

    const [notificationsByDate, setNotificationsByDate] = useState<Record<string, Notification[]>>({});

    useEffect(() => {
        const readNotifications = async () => {
            await Promise.all(
                unread.map(async (notification) => {
                    await merovService.secureApi().setNotificationAsRead(notification.id);
                }),
            );
        };

        readNotifications();
    }, [unread]);

    useEffect(() => {
        const initNotificationsByDate: Record<string, Notification[]> = {};
        notifications.forEach((notification: Notification) => {
            const date = moment(notification.createdAt).format('MM/DD/YYYY');
            if (!initNotificationsByDate[date]) {
                initNotificationsByDate[date] = [];
            }

            initNotificationsByDate[date].push(notification);
        });

        setNotificationsByDate(initNotificationsByDate);
    }, [notifications]);

    if (!notifications.length) {
        return (
            <InnerDivNoProds>
                <RightDivBorder>
                    <NoItems title="No notifications yet" description="Here we will display your notifications" />
                </RightDivBorder>
            </InnerDivNoProds>
        );
    }
    return (
        <InnerDivNoProds>
            {Object.keys(notificationsByDate)
                .sort((a, b) => moment(b).diff(moment(a)))
                .map((date) => (
                    <div className="w-full" key={date}>
                        <Date>{date.toString()}</Date>
                        {notificationsByDate[date]
                            .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
                            .map((notification: Notification) => (
                                <div className="mb-3" key={notification.id}>
                                    <NotificationsCard notification={notification} />
                                </div>
                            ))}
                    </div>
                ))}
        </InnerDivNoProds>
    );
};

export default Notifications;

const InnerDivNoProds = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: start;
`;

const RightDivBorder = styled.div`
    display: flex;
    padding: 3% 2%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70%;
    border: 2px solid #1f2123;
    border-radius: 5px;
`;

const Date = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: start;
    margin: 0px;
    margin-left: 10px;
    width: 100%;
    color: #8c8a93;
`;
