import React from 'react';
import CopyLogo from '../../../../../assets/icons/CopyLogo';
import ShareLogo from '../../../../../assets/icons/shareLogo';
import { copyToClipboard } from '../../../../../helpers/copyToClipboard';
import { useMobile } from '../../../../../hooks/useMobile';
import { Benefits, CopyButton, CopySpan, Referral, ReferralBox, ShareLogoDiv, Url, UrlDiv } from '../ProfileComponents.styled';

export default function ReferralCode({ code }: { code: string }) {
    const mobile = useMobile();

    return (
        <>
            <ReferralBox>
                <ShareLogoDiv>
                    <ShareLogo height={25} width={25} />
                    <Referral>Referral Program</Referral>
                </ShareLogoDiv>

                <Benefits>Invite your friends to join Merov and earn benefits.</Benefits>
                <UrlDiv onClick={() => copyToClipboard(code)} className="animate__animated animate__fadeIn animate__faster">
                    <Url>{code}</Url>
                    {mobile ? (
                        <CopySpan>Share</CopySpan>
                    ) : (
                        <CopyButton>
                            <CopyLogo height={18} width={18} />
                            <CopySpan>Copy</CopySpan>
                        </CopyButton>
                    )}
                </UrlDiv>
            </ReferralBox>
        </>
    );
}
