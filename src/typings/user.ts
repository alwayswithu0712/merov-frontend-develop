/**
 * Model User
 *
 */

import { Account } from './account';

export type User = {
    id: string;
    createdAt: string;
    updatedAt?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    address: string;
    isSeller?: boolean;
    rating: number;
    dateOfBirth: Date;
    sendBirdAccessToken: string;
    isPhoneVerified: boolean;
    idVerificationStatus: STATUS;
    account: Account;
    accountId: string;
};

export type Auth0User = {
    email: string;
    email_verified: boolean;
    'https://merov.io/roles': Array<string>;
    'https://merov.io/username': string;
    'https://merov.io/userId': string;
    'https://merov.io/accountId': string;
    id: string;
    name: string;
    nickname: string;
    picture: string;
    sessionId: string;
    sid: string;
    sub: string;
    updated_at: string;
    username: string;
};

export interface IUpdateUser {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    dateOfBirth?: Date;
    myReviews?: string[];
    rating?: number;
}

export enum STATUS {
    Rejected = 'Rejected',
    Reviewing = 'Reviewing',
    Full = 'Full',
    Lite = 'Lite',
    Blocked = 'Blocked',
    Unverified = 'Unverified',
}
