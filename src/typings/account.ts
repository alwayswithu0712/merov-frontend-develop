import { Organization } from './organization';
import { User } from './user';

export type Invitation = {
    id: string;
    email: string;
    accountId: string;
    status: InvitationStatus;
    dueDate: Date;
    senderIdstring: string;
    permissions: any;
    createdAt: Date;
    updatedAt: Date;
    account: Account;
    sender: User;
};

export type Account = {
    id: string;
    name: string;
    avatarUrl: string;
    email: string;
    reviewCount: number;
    rating: number;
    sendBirdAccessToken: string;
    referralId: string;
    createdAt: Date;
    organization?: Organization;
};

enum InvitationStatus {
    Confirmed = 'Confirmed',
    Pending = 'Pending',
    Expired = 'Expired',
}

export interface IUpdateAccount {
    avatarUrl?: string;
    myReviews?: string[];
}
