import { useState, useEffect, useRef } from 'react';
import { hasPermissions as verifyPermission } from '../helpers/permissions/hasPermissions';
import { Permission } from '../typings/permissions';

export function usePermissionVerifier(permissionsToCheck: Permission[] = []): {
    permissions: { [key: string]: boolean };
    hasPermissions: (permission?: Permission) => boolean;
} {
    const [permissions, setPermission] = useState<{ [key: string]: boolean }>({});
    const firstRender = useRef(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && !!sessionStorage.getItem('accessToken') && !firstRender.current) {
            const permissionsVerified: { [key: string]: boolean } = [Permission.Owner, Permission.Admin, ...permissionsToCheck].reduce(
                (o, key) => Object.assign(o, { [key]: verifyPermission([key]) }),
                {},
            );
            setPermission(permissionsVerified);
            firstRender.current = true;
        }
    }, [permissionsToCheck]);

    const hasPermissions = (permission?: Permission): boolean => {
        if (permissions.owner || permissions.admin) return true;
        return permission ? !!permissions[permission.toLowerCase()] : false;
    };

    return {
        permissions,
        hasPermissions,
    };
}
