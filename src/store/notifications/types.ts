import { Notification } from '../../typings/notification';

export const READ_NOTIFICATION = 'READ_NOTIFICATION';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATIONS';
export const DELETE_NOTIFICATIONS = 'DELETE_NOTIFICATIONS';

export interface AddNotificationAction {
    type: typeof ADD_NOTIFICATION;
    payload: Notification;
}

export interface DeleteNotificationAction {
    type: typeof DELETE_NOTIFICATIONS;
    payload: [];
}

export interface SetNotificationsAction {
    type: typeof SET_NOTIFICATIONS;
    payload: Notification[];
}

export interface ReadNotificationAction {
    type: typeof READ_NOTIFICATION;
    payload: {
        id: string;
        readAt: Date;
    };
}

export type NotificationAction =
    | DeleteNotificationAction
    | AddNotificationAction
    | SetNotificationsAction
    | ReadNotificationAction
    | { type: '' };

export interface NotificationsState {
    notifications: Notification[];
    unread: Notification[];
}
