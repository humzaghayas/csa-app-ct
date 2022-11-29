import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptions}
 */
const config = {
  name: 'CT B2B Custom App',
  entryPointUriPath,
  cloudIdentifier: 'gcp-us',
  env: {
    development: {
      initialProjectKey: '${env:CTP_INITIAL_PROJECT_KEY}'
    },
    production: {
      applicationId: 'clajfnkej00b71f012e79u0r0',
      url: 'https://csa-project-1d161.firebaseapp.com',
    },
  },
  oAuthScopes: {
    view: [
      'view_customer_groups',
      'view_customers',
      'view_orders',
      'view_products',
    ],
    manage: [
      'manage_orders',
      'manage_customers',
      'manage_products',
      'manage_project',
    ],
  },
  headers: {
    csp: {
      'script-src': [
        'http://localhost:3001',
        'mc-api.us-central1.gcp.commercetools.com',
        'csa-project-1d161.firebaseapp.com',
        'https://firebasestorage.googleapis.com/',
      ],
      'connect-src': [
        'http://localhost:3001',
        'mc-api.us-central1.gcp.commercetools.com',
        'csa-project-1d161.firebaseapp.com',
        'https://firebasestorage.googleapis.com/',
      ],
      'style-src': [
        'http://localhost:3001',
        'mc-api.us-central1.gcp.commercetools.com',
        'csa-project-1d161.firebaseapp.com',
        'https://firebasestorage.googleapis.com/',
      ],
      'img-src':[
        'http://localhost:3001',
        'mc-api.us-central1.gcp.commercetools.com',
        'csa-project-1d161.firebaseapp.com',
        'https://firebasestorage.googleapis.com/',
      ],
    },
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'CSA Admin',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'channels',
      defaultLabel: 'Channels',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'Tickets',
      defaultLabel: 'Tickets',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'Customers',
      defaultLabel: 'Customers',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'Orders',
      defaultLabel: 'Orders',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
  ],
};

export default config;