export type Organization = {
    id: string;
    count: number;
    name: string;
    taxId: string;
    address: string;
    website?: string;
    accountId: string;
    createdAt: string;
    updatedAt: string;
    organizationVerificationStatus: OrganizationVerificationStatus;
};

export enum OrganizationVerificationStatus {
    Unverified = 'Unverified',
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
}
