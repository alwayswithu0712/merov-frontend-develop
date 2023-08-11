import { getUserPermissions } from './getPermissions';
import { Permission } from '../../typings/permissions';

export const hasPermissions = (requiredPermissions: Permission[], token?: string): boolean => {
    const permissionsToCheck = getUserPermissions(token);
    if (permissionsToCheck.includes(Permission.Owner) || permissionsToCheck.includes(Permission.Admin)) return true;
    if (requiredPermissions.length === 0) return false;
    return requiredPermissions.every((permission) => permissionsToCheck.includes(permission));
};
