import React, { useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import merovService from '../../services/merov';
import useAccountContainer from '../../hooks/useAccountContainer';
import CompleteProfile from '../../ui/pages/CompleteProfile';
import { Auth0User, User } from '../../typings/user';
import ValidationSMS from '../../ui/pages/ValidationSMS';

type Props = {
    user: Auth0User;
    userFormData: User;
};

function Page({ user, userFormData }: Props) {
    const [showSMS, setShowSMS] = useState<boolean>(false);
    const { userData, setUserData, tableProps, handleDatePicker, handleSaveChanges } = useAccountContainer(userFormData);
    return showSMS ? (
        <ValidationSMS onSetShowSMS={setShowSMS} tableProps={tableProps} handleSaveChanges={handleSaveChanges} />
    ) : (
        <CompleteProfile
            sardineData={{ customerId: user.id, sessionKey: user.sessionId! }}
            onSetShowSMS={setShowSMS}
            tableProps={tableProps}
            userData={userData}
            setUserData={setUserData}
            handleDatePicker={handleDatePicker}
        />
    );
}

export default Page;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context: GetServerSidePropsContext) {
        try {
            const { req, res } = context;

            const session = await getSession(req, res);
            const user = await merovService.secureApi(session?.accessToken).getMyUser();
            if (!user) {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/',
                    },
                };
            }
            if (user.isPhoneVerified) {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/account/profile',
                    },
                };
            }
            return {
                props: { userFormData: user },
            };
        } catch (error) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/account/profile',
                },
            };
        }
    },
});
