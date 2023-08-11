import jwtDecode from 'jwt-decode';
import { Permission } from '../../typings/permissions';

type DecodedToken = {
    permissions: Permission[];
};

export const getUserPermissions = (token?: string): Permission[] => {
    const tokenToDecode = getToken(token);
    if (!tokenToDecode) return [];
    const decodedToken: DecodedToken = jwtDecode(tokenToDecode);
    return decodedToken.permissions;
};

const getToken = (token?: string): string | null => {
    if (token) {
        return token;
    }
    if (sessionStorage.getItem('accessToken')) {
        return sessionStorage.getItem('accessToken');
    }
    return null;
};
