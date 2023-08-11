import React, { useEffect, useState } from 'react';
import ErrorWarningLogo from '../../../../../assets/icons/ErrorWarningLogo';
import ShieldLogo from '../../../../../assets/icons/ShieldLogo';
import {
    Approved,
    GetVerified,
    InReview,
    Reject,
    ShareLogoDiv,
    ShareLogoDivVerify,
    TasksDiv,
    TaskTest,
    VerificationsDiv,
} from '../ProfileComponents.styled';
import Button, { SIZE, VARIANT } from '../../../../components/buttons/Button';
import { createSardineTab } from '../../../../../helpers/sardine';
import { STATUS } from '../../../../../typings/user';
import isFromUSA from '../../../../../helpers/isFromUSA';
import { IUser } from '../../../../../hooks/useMerovUser';

type State = { status: JSX.Element; description?: string };

export default function UserIdentityVerification({ user }: { user: IUser }) {
    const [verification, setVerification] = useState<State>({ status: <InReview>In Review</InReview> });
    const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

    const getStatus = () => {
        switch (user.idVerificationStatus) {
            case STATUS.Rejected:
                return { status: <Reject>Rejected</Reject>, description: 'To operate please do the verification.' };
            case STATUS.Reviewing:
                return { status: <InReview>In Review</InReview> };
            case STATUS.Lite:
                return { status: <Approved>Lite</Approved> };
            case STATUS.Full:
                return { status: <Approved>Full</Approved> };
            case STATUS.Blocked:
                return { status: <Reject>Blocked</Reject> };
            default:
                return { status: <InReview>Unverified</InReview>, description: 'To operate please do the verification.' };
        }
    };

    const handleCompleteIdentityVerification = async (): Promise<void> => {
        if (!isFromUSA(user.phone)) return;
        if (isSubmittingForm) return;
        setIsSubmittingForm(true);
        const isTabCreated = await createSardineTab();
        if (!isTabCreated) setIsSubmittingForm(false);
    };

    useEffect(() => {
        setVerification(getStatus());
    }, [user.idVerificationStatus]);
    return (
        <div>
            <ShareLogoDiv>
                <ShieldLogo width={25} height={25} />
                <GetVerified>User Verification</GetVerified>
            </ShareLogoDiv>

            <VerificationsDiv className="animate__animated animate__fadeIn animate__faster">
                <TasksDiv>
                    <div>
                        <ShareLogoDivVerify>
                            <ErrorWarningLogo width={26} height={26} />
                            <div className="flex flex-col ml-1">
                                <TaskTest>Identity Verification - {verification.status}</TaskTest>
                                {verification.description && <TaskTest>{verification.description}</TaskTest>}
                            </div>
                        </ShareLogoDivVerify>
                    </div>
                    {user.idVerificationStatus !== STATUS.Blocked &&
                        user.idVerificationStatus !== STATUS.Full &&
                        user.idVerificationStatus !== STATUS.Reviewing && (
                            <Button
                                disabled={isSubmittingForm || (user.phone && !isFromUSA(user.phone))}
                                loading={isSubmittingForm}
                                variant={VARIANT.QUATERNARY}
                                bold
                                size={SIZE.SMALL}
                                onClick={handleCompleteIdentityVerification}
                                title={
                                    user.phone && !isFromUSA(user.phone) ? 'Complete profile only valid for USA users' : 'Complete profile'
                                }
                            >
                                Complete
                            </Button>
                        )}
                </TasksDiv>
            </VerificationsDiv>
        </div>
    );
}
