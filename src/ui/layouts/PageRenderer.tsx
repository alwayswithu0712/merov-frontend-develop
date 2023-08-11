import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSardine } from '../../hooks/useSardine';
import { useMerovUser } from '../../hooks/useMerovUser';
import { useNotificationListener } from '../../hooks/useNotificationListener';
import { MyAppProps } from '../../pages/_app';
import DontHaveAccess from '../components/DontHaveAccess';
import { isProduction } from '../../helpers/enviroments';
import { postLoginEnvironment } from '../../services/auth';

const PageRenderer = ({ Component, pageProps }: MyAppProps): JSX.Element => {
    const user = useMerovUser();
    const getLayout = Component.getLayout ?? ((page) => page);
    const router = useRouter();
    const userForm = useRef<{ user: string | null; password: string | null }>({ user: '', password: '' });
    const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

    const { setupSardineWithConfig } = useSardine();

    const isSardineSetUp = useRef<boolean>(true);

    useNotificationListener();

    const login = async () => {
        if (!localStorage.getItem('authorized') && !isProduction()) {
            userForm.current.user = await prompt('Please enter your user');
            userForm.current.password = await prompt('Please enter your password');
            try {
                const response = await postLoginEnvironment(userForm.current);
                if (response.data) {
                    localStorage.setItem('authorized', JSON.stringify(true));
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                setIsAuthorized(false);
            }
        }
    };

    useEffect(() => {
        login();
    }, []);

    useEffect(() => {
        if (isSardineSetUp.current && user && user.id && user.sessionId) {
            setupSardineWithConfig({
                customerId: user.id as string,
                sessionKey: user.sessionId as string,
            });
            isSardineSetUp.current = false;
        }
    }, [user]);

    useEffect(() => {
        if (
            user.id &&
            user.isPhoneVerified === false &&
            !router.pathname.includes('profile/complete') &&
            !router.pathname.includes('verify')
        ) {
            router.push('/verify');
        }
    }, [user, user.isPhoneVerified, router.pathname]);

    return <>{isAuthorized ? getLayout(<Component {...pageProps} />) : <DontHaveAccess />}</>;
};

export default PageRenderer;
