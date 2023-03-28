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
      applicationId: 'clajfnkej00b71f012e79u0r0',
      url: 'https://csa-project-1d161.firebaseapp.com',
    },
  },
  additionalEnv: {
    atgPublicURL: '${env:atgProtocol}' + '${env:atgPublicURL}',
    SEND_EMAIL_API: '${env:atgProtocol}' + '${env:SEND_EMAIL_API}',
    MC_APP_ENV: '${env:ENV_VAL}',
    NODE_ENV: '${env:ENV_VAL}',
    SEND_EMAIL_API: '${env:atgProtocol}' + '${env:SEND_EMAIL_API}',
    STRIPE_SECRET_KEY: '${env:STRIPE_SECRET_KEY}',
    SEND_EMAIL_API: '${env:atgProtocol}' + '${env:SEND_EMAIL_API}',
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
  "additionalOAuthScopes": [
    {
      "name": "csa-customer",
      "view": ["view_customers"],
      "manage": ["manage_customers"]
    },
    {
      "name": "csa-tickets",
      "view": ["view_products"],
      "manage":[]
    },
    {
      "name": "csa-dashboard",
      "view": ["view_customers"],
      "manage":[]
    },
    {
      "name": "customer-carts",
      "view": ["view_orders"],
      "manage": ["manage_orders"]
    },
    {
      "name": "customer-orders",
      "view": ["view_orders"]
    },
    {
      "name": "product-search",
      "view": ["view_products"],
      "manage":[]
    }
  ],
  headers: {
    csp: {
      'script-src': [
        'http://localhost:3001',
        'mc-api.us-central1.gcp.commercetools.com',
        'csa-project-1d161.firebaseapp.com',
        'https://firebasestorage.googleapis.com/',
        '${env:ALGOLIA_SEARCH}',
        '${env:ALGOLIA_SEARCH_CSA}'
      ],
      'connect-src': [
        'http://localhost:3001',
        'mc-api.us-central1.gcp.commercetools.com',
        'csa-project-1d161.firebaseapp.com',
        'https://firebasestorage.googleapis.com/',
        '${env:atgPublicURL}',
        'https://api.stripe.com/',
        '${env:SEND_EMAIL_API}',
        '${env:ALGOLIA_SEARCH}',
        '${env:ALGOLIA_SEARCH_CSA}'
      ],
      'style-src': [
        'http://localhost:3001',
        'mc-api.us-central1.gcp.commercetools.com',
        'csa-project-1d161.firebaseapp.com',
        'https://firebasestorage.googleapis.com/',
      ],
      'img-src': [
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
      uriPath: 'dashboard',
      defaultLabel: 'Dashboard',
      labelAllLocales: [],
      permissions: [PERMISSIONS.ViewCsaDashboard],
    },
    {
      uriPath: 'Tickets',
      defaultLabel: 'Tickets',
      labelAllLocales: [],
      permissions: [PERMISSIONS.ViewCsaTickets],
    },
    {
      uriPath: 'Customers',
      defaultLabel: 'Customers',
      labelAllLocales: [],
      permissions: [PERMISSIONS.ViewCsaCustomer],
    },
    {
      uriPath: 'Orders',
      defaultLabel: 'Orders',
      labelAllLocales: [],
      permissions: [PERMISSIONS.ViewCustomerOrders],
    },
    {
      uriPath: 'Cart',
      defaultLabel: 'Cart',
      labelAllLocales: [],
      permissions: [PERMISSIONS.ViewCustomerCarts],
    },
    {
      uriPath: 'ATG',
      defaultLabel: 'ATG',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'Products',
      defaultLabel: 'Products',
      labelAllLocales: [],
      permissions: [PERMISSIONS.ViewProductSearch],
    },
  ],
};

export default config;
