/* eslint-disable no-nested-ternary */
import React from 'react';
import AccountAvatar, { VARIANT as PROFILE_VARIANT } from '../../../components/AccountAvatar';

import {
    AllDiv,
    Container,
    ImgContainer,
    ImgDiv,
    PerosnalInfoDiv,
    RightDivWidth,
    TextAndButtons,
    TextAndButtonsMobile,
    Title,
} from './ProfileComponents.styled';
import { useMobile } from '../../../../hooks/useMobile';
import UserIdentityVerification from './components/UserIdentityVerification';
import ReferralCode from './components/ReferralCode';
import UserInputs from './components/UserInputs';
import ProfileHeaderButtons from './components/ProfileHeaderButtons';
import { IUser, useMerovUser } from '../../../../hooks/useMerovUser';

const ProfileAccount = () => {
    const user = useMerovUser() as IUser;
    const mobile = useMobile();
    if (!user.account) {
        return null;
    }

    return (
        <Container className="profile">
            <AllDiv>
                <TextAndButtons>
                    <Title>Account Profile</Title>
                    <div className="flex">
                        <ProfileHeaderButtons />
                    </div>
                </TextAndButtons>

                {!mobile ? (
                    <ImgDiv className="animate__animated animate__fadeIn animate__faster">
                        <AccountAvatar
                            name={user.account.name}
                            avatarUrl={user.account.avatarUrl}
                            rating={user.account.rating}
                            reviewCount={user.account.reviewCount}
                            variant={PROFILE_VARIANT.HORIZONTAL}
                            href={`/account/profile`}
                            imageSize={75}
                            showName
                            showStars
                            showReviews
                            animatePhoto
                        />
                    </ImgDiv>
                ) : (
                    <>
                        <ImgContainer>
                            <AccountAvatar
                                name={user.account.name}
                                avatarUrl={user.account.avatarUrl}
                                rating={user.account.rating}
                                reviewCount={user.account.reviewCount}
                                variant={PROFILE_VARIANT.HORIZONTAL}
                                href={`/account/profile`}
                                imageSize={45}
                                showName
                                showStars
                                showReviews
                                animatePhoto
                            />
                        </ImgContainer>
                        <TextAndButtonsMobile className="animate__animated animate__fadeIn animate__faster">
                            <ProfileHeaderButtons />
                        </TextAndButtonsMobile>
                    </>
                )}
                <PerosnalInfoDiv className="animate__animated animate__fadeIn animate__faster">
                    <UserInputs />
                </PerosnalInfoDiv>
            </AllDiv>
            <RightDivWidth>
                <UserIdentityVerification user={user} />
                <ReferralCode code={user.account.name} />
            </RightDivWidth>
        </Container>
    );
};

export default ProfileAccount;
