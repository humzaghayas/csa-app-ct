import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from './constants';

export const getPermission = (permissionName) => {

  let isPermissionGranted = false;

  if (PERMISSIONS[permissionName]) {
    isPermissionGranted = useIsAuthorized({
      demandedPermissions: [PERMISSIONS[permissionName]],
    });
  }

  return isPermissionGranted;
}                           
