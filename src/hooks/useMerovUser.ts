import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import router from 'next/router';
import useSWR from 'swr';
import { setAccessToken } from '../services/auth';
import merovService from '../services/merov';
import { User, Auth0User } from '../typings/user';

export type IUser = { logout: any; update: any } & User & Auth0User & UserProfile;

export const useMerovUser = (): IUser => {
    const { user: auth0User } = useUser();

    const { data: merovUser, mutate: updateMerovUser } = useSWR(
        ['/users/me', auth0User?.sub, auth0User?.email_verified],
        merovService.secureApi().getMyUser,
        {
            onErrorRetry: (error) => {
                // eslint-disable-next-line no-useless-return
                if (error.response && error.response.status === 401) return;
            },
            revalidateOnFocus: true,
            refreshWhenHidden: false,
            revalidateOnMount: false,
        },
    );

    return {
        ...auth0User,
        ...merovUser,
        update: async () => {
            await updateMerovUser();
        },
        logout: async () => {
            setAccessToken(null);
            await router.push('/api/auth/logout');
        },
    } as IUser;
};
