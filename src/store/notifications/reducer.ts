import {
    NotificationAction,
    ADD_NOTIFICATION,
    NotificationsState,
    DELETE_NOTIFICATIONS,
    READ_NOTIFICATION,
    SET_NOTIFICATIONS,
} from './types';

const initialState: NotificationsState = {
    notifications: [],
    unread: [],
};

export default function notificationsReducer(state = initialState, action: NotificationAction = { type: '' }) {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
                unread: [...state.unread, action.payload],
            };
        case DELETE_NOTIFICATIONS:
            return {
                ...state,
                notifications: [],
                unread: [],
            };
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
                unread: action.payload.filter((notification) => !notification.readAt),
            };
        case READ_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.map((notification) => {
                    if (notification.id === action.payload.id) {
                        return {
                            ...notification,
                            readAt: action.payload.readAt,
                        };
                    }
                    return notification;
                }),
                unread: state.unread.filter((notification) => notification.id !== action.payload.id),
            };
        default:
            return state;
    }
}
