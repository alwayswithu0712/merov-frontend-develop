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
import { Organization, OrganizationVerificationStatus } from '../../../../../typings/organization';

type State = { status: JSX.Element; description?: string };
// todo: check what is the flow of the Minsk
export default function OrganizationIdentityVerification({ organization }: { organization: Organization }) {
    const [verification, setVerification] = useState<State>({ status: <InReview>In Review</InReview> });

    const getStatus = () => {
        switch (organization.organizationVerificationStatus) {
            case OrganizationVerificationStatus.Rejected:
                return { status: <Reject>Rejected</Reject>, description: 'To operate please do the verification.' };
            case OrganizationVerificationStatus.Pending:
                return { status: <InReview>Pending</InReview> };
            case OrganizationVerificationStatus.Approved:
                return { status: <Approved>Approved</Approved> };
            default:
                return { status: <InReview>Unverified</InReview>, description: 'To operate please do the verification.' };
        }
    };

    useEffect(() => {
        setVerification(getStatus());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization.organizationVerificationStatus]);
    return (
        <div>
            <ShareLogoDiv>
                <ShieldLogo width={25} height={25} />
                <GetVerified>Organization Verification</GetVerified>
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
                </TasksDiv>
            </VerificationsDiv>
        </div>
    );
}
