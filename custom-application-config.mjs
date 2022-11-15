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
      initialProjectKey: '${env:CTP_INITIAL_PROJECT_KEY}',
    },
    production: {
      applicationId: 'cl977ym6c00042501ex12tk0d',
      url: 'https://commerce-tools-b2b-services.firebaseapp.com',
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
        'http://localhost:4459',
        'mc-api.us-central1.gcp.commercetools.com',
        'commerce-tools-b2b-services.firebaseapp.com',
        'https://ms-company-f4b4o225iq-ue.a.run.app',
        'https://ms-gateway-f4b4o225iq-ue.a.run.app',
      ],
      'connect-src': [
        'http://localhost:4459',
        'mc-api.us-central1.gcp.commercetools.com',
        'commerce-tools-b2b-services.firebaseapp.com',
        'https://ms-company-f4b4o225iq-ue.a.run.app',
        'https://ms-gateway-f4b4o225iq-ue.a.run.app',
      ],
      'style-src': [
        'http://localhost:4459',
        'mc-api.us-central1.gcp.commercetools.com',
        'commerce-tools-b2b-services.firebaseapp.com',
        'https://ms-company-f4b4o225iq-ue.a.run.app',
        'https://ms-gateway-f4b4o225iq-ue.a.run.app',
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
  ],
};

export default config;
