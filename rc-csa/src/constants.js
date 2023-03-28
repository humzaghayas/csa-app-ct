// Make sure to import the helper functions from the `ssr` entry point.
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

export const entryPointUriPath = 'csa-customer-tickets';

export const groupNames = {
    "csa-customer": 'csa-customer',
    "customer-carts": 'customer-carts',
    "customer-orders": 'customer-orders',
    "product-search": 'product-search',
    "csa-dashboard": 'csa-dashboard',
    "customer-payments":'customer-payments',
    "csa-tickets":'csa-tickets'
  };

export const PERMISSIONS = entryPointUriPathToPermissionKeys(
                            entryPointUriPath,
                           ['csa-customer','customer-carts','customer-orders','csa-tickets',
                           'customer-payments','product-search','csa-dashboard'] );                         
