export type Notification = {
    id: string;
    userId: string;
    title: string;
    message?: string;
    metadata?: Record<string, unknown>;
    createdAt: Date;
    readAt?: Date;
    type: string;
};

export enum BackendEvents {
    SardineDocumentVerification = 'sardine.document_verification.processed',
    PhoneVerificationFinish = 'verify.phone.finish',
}
