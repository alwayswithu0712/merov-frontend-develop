import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import merovService from '../services/merov';
import { SET_NOTIFICATIONS, READ_NOTIFICATION, ADD_NOTIFICATION } from '../store/notifications/types';
import { useMerovUser } from './useMerovUser';

export const useNotificationListener = () => {
    const user = useMerovUser();

    const dispatch = useDispatch();

    const [isListening, setIsListening] = React.useState(false);

    useEffect(() => {
        if (user.id && user.email_verified && !isListening) {
            const fetchNotifications = async () => {
                const notifications = await merovService.secureApi().getNotifications();
                dispatch({ type: SET_NOTIFICATIONS, payload: notifications });
            };

            fetchNotifications();

            console.log(`Listening to notifications for user ${user.id}`);

            const eventSource = merovService.secureApi().listenEvents(user.id, (data) => {
                if (data?.type === 'notification.read') {
                    dispatch({ type: READ_NOTIFICATION, payload: data });
                } else {
                    dispatch({ type: ADD_NOTIFICATION, payload: data });
                }
            });

            setIsListening(true);

            return () => {
                eventSource.close();
                setIsListening(false);
            };
        }
        return () => {};
    }, [user.email_verified, user.id]);
};
