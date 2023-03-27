// Make sure to import the helper functions from the `ssr` entry point.
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

export const entryPointUriPath = 'csa-customer-tickets';

export const groupNames = {
    "tickets":'tickets',
    "csa-customer": 'csa-customer',
    "customer-profile": 'customer-profile',
    "customer-carts": 'customer-carts',
    "customer-orders": 'customer-orders',
    "customer-payments": 'customer-payments',
    "product-search": 'product-search',
    "csa-dashboard": 'csa-dashboard',
  };

export const PERMISSIONS = entryPointUriPathToPermissionKeys(
                            entryPointUriPath,
                           ['tickets','csa-customer','customer-carts',
                           'customer-profile','customer-orders',
                           'customer-payments','product-search','csa-dashboard'] );
