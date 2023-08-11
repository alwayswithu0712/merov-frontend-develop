export type ProveStart = { type: 'otp' | 'prove' };
export type ProveFinish = {
    isPhoneVerified: boolean;
};
