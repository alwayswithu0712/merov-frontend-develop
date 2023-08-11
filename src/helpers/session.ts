import { User } from '../typings/user';

export const transformAuth0User = (user: User & any) => {
    if (!user) {
        return user;
    }
    return {
        username: user['https://merov.io/username'],
        roles: user['https://merov.io/roles'],
        id: user.sub,
        verified: user.email_verified,
    };
};
