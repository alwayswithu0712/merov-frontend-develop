import { Permission } from '../../typings/permissions';
import { getUserPermissions } from './getPermissions';

export const isOwnerOverAdmin = (memberPermissions: Permission[]): boolean => {
    const userPermissions: Permission[] = getUserPermissions();
    if (
        userPermissions.includes(Permission.Admin) &&
        (memberPermissions.includes(Permission.Admin) || memberPermissions.includes(Permission.Owner))
    ) {
        return false;
    }

    if (userPermissions.includes(Permission.Owner) && memberPermissions.includes(Permission.Owner)) {
        return false;
    }

    if (userPermissions.includes(Permission.Owner) || userPermissions.includes(Permission.Admin)) {
        return true;
    }
    return false;
};
