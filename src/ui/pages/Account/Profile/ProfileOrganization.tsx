import React from 'react';
import { Form } from 'antd';
import AccountAvatar, { VARIANT as PROFILE_VARIANT } from '../../../components/AccountAvatar';
import {
    AllDiv,
    Container,
    ImgContainer,
    ImgDiv,
    InputWidth,
    Label,
    PerosnalInfoDiv,
    RightDivWidth,
    SmallerInputsDiv,
    TextAndButtons,
    TextAndButtonsMobile,
    Title,
} from './ProfileComponents.styled';
import { useMobile } from '../../../../hooks/useMobile';
import OrganizationIdentityVerification from './components/OrganizationIdentityVerification';
import ReferralCode from './components/ReferralCode';
import Input from '../../../components/inputs/Input';
import ProfileHeaderButtons from './components/ProfileHeaderButtons';
import { Account } from '../../../../typings/account';
import { usePermissionVerifier } from '../../../../hooks/usePermissionVerifier';

const ProfileOrganization = ({ account }: { account: Required<Account> }) => {
    const mobile = useMobile();
    const { hasPermissions } = usePermissionVerifier();

    const ConvertAddressJsonToString = () => {
        const address = JSON.parse(account.organization.address);
        return `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postcode}`;
    };

    const hideTaxPayerNumber = () => {
        let taxNumberHiden = '';
        const taxpayerNumber = account.organization.taxId;
        for (let i = 0; i < taxpayerNumber.length - 2; i += 1) {
            taxNumberHiden += '*';
        }
        taxNumberHiden += taxpayerNumber.charAt(taxpayerNumber.length - 1);
        taxNumberHiden += taxpayerNumber.charAt(taxpayerNumber.length - 2);

        return taxNumberHiden;
    };

    return (
        <Container className="profile">
            <AllDiv>
                {!mobile ? (
                    <TextAndButtons>
                        <Title>Organization Profile</Title>
                        <div className="flex">
                            <ProfileHeaderButtons />
                        </div>
                    </TextAndButtons>
                ) : null}
                {!mobile ? (
                    <ImgDiv className="animate__animated animate__fadeIn animate__faster">
                        <AccountAvatar
                            name={account.name}
                            avatarUrl={account.avatarUrl}
                            rating={account.rating}
                            reviewCount={account.rating}
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
                                name={account.name}
                                avatarUrl={account.avatarUrl}
                                rating={account.rating}
                                reviewCount={account.rating}
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
                    <Label>Business Name</Label>
                    <Form.Item>
                        <Input disabled value={account.organization.name} />
                    </Form.Item>
                    {hasPermissions() ? (
                        <SmallerInputsDiv>
                            <InputWidth>
                                <Label>Taxpayer Number</Label>
                                <Form.Item>
                                    <Input disabled type="text" value={hideTaxPayerNumber()} />
                                </Form.Item>
                            </InputWidth>
                            <InputWidth>
                                <Label>Website</Label>
                                <Form.Item>
                                    <Input disabled value={account.organization.website} />
                                </Form.Item>
                            </InputWidth>
                        </SmallerInputsDiv>
                    ) : (
                        <>
                            <Label>Website</Label>
                            <Form.Item>
                                <Input disabled value={account.organization.website} />
                            </Form.Item>
                        </>
                    )}
                    <Label>Business Address</Label>
                    <Form.Item>
                        <Input disabled value={ConvertAddressJsonToString()} />
                    </Form.Item>
                </PerosnalInfoDiv>
            </AllDiv>
            <RightDivWidth>
                <OrganizationIdentityVerification organization={account.organization} />
                <ReferralCode code={account.name} />
            </RightDivWidth>
        </Container>
    );
};

export default ProfileOrganization;
