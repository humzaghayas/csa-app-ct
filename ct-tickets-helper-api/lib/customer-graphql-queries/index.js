"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_CUSTOMERS_DETAILS = exports.UPDATE_CUSTOMERS_ADDRESS_DETAILS = exports.FETCH_CUSTOMERS_GRAPHQL = exports.FETCH_CUSTOMERS_ORDERS = exports.FETCH_CUSTOMERS_DETAILS = exports.FETCH_CUSTOMERS_ADDRESS_DETAILS = void 0;
exports.FETCH_CUSTOMERS_ADDRESS_DETAILS = "query CustomerDetailsAddressesQuery($id: String!) {\n    customer(id: $id) {\n      ...CustomerDetailsAddressesFragment\n      __typename\n    }\n  }\n  \n  fragment CustomerDetailsAddressesFragment on Customer {\n    id\n    firstName\n    lastName\n    version\n    defaultBillingAddress {\n      ...FullAddress\n      __typename\n    }\n    defaultShippingAddress {\n      ...FullAddress\n      __typename\n    }\n    addresses {\n      ...FullAddress\n      __typename\n    }\n    billingAddresses {\n      ...FullAddress\n      __typename\n    }\n    shippingAddresses {\n      ...FullAddress\n      __typename\n    }\n    __typename\n  }\n  \n  fragment FullAddress on Address {\n    id\n    key\n    streetName\n    streetNumber\n    apartment\n    building\n    pOBox\n    city\n    postalCode\n    region\n    state\n    country\n    additionalStreetInfo\n    additionalAddressInfo\n    firstName\n    lastName\n    salutation\n    title\n    company\n    department\n    email\n    phone\n    mobile\n    fax\n    externalId\n    custom {\n      type {\n        ...CustomFieldsTypeFragment\n        __typename\n      }\n      customFieldsRaw {\n        name\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  \n  fragment CustomFieldsTypeFragment on TypeDefinition {\n    id\n    key\n    createdAt\n    lastModifiedAt\n    nameAllLocales {\n      locale\n      value\n      __typename\n    }\n    fieldDefinitions {\n      name\n      inputHint\n      type {\n        name\n        ... on ReferenceType {\n          referenceTypeId\n          __typename\n        }\n        ... on EnumType {\n          values {\n            key\n            label\n            __typename\n          }\n          __typename\n        }\n        ... on LocalizedEnumType {\n          values {\n            key\n            labelAllLocales {\n              locale\n              value\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        ... on SetType {\n          elementType {\n            name\n            ... on ReferenceType {\n              referenceTypeId\n              __typename\n            }\n            ... on EnumType {\n              values {\n                key\n                label\n                __typename\n              }\n              __typename\n            }\n            ... on LocalizedEnumType {\n              values {\n                key\n                labelAllLocales {\n                  locale\n                  value\n                  __typename\n                }\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        ... on ReferenceType {\n          referenceTypeId\n          __typename\n        }\n        __typename\n      }\n      inputHint\n      required\n      labelAllLocales {\n        locale\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  ";
exports.FETCH_CUSTOMERS_DETAILS = "query FetchCustomerDetails($id: String!) {\n    customer(id: $id) {\n      id\n      version\n      firstName\n      dateOfBirth\n      email\n      customerNumber\n      externalId\n      lastName\n      companyName\n      customerGroup{\n        name\n      }\n      defaultBillingAddress {\n        id\n        streetName\n        streetNumber\n        apartment\n        building\n        pOBox\n        city\n        postalCode\n        region\n        state\n        country\n        additionalStreetInfo\n        additionalAddressInfo\n        firstName\n        lastName\n        salutation\n        title\n        company\n        department\n        externalId\n        __typename\n      }\n      defaultShippingAddress {\n        id\n        streetName\n        streetNumber\n        apartment\n        building\n        pOBox\n        city\n        postalCode\n        region\n        state\n        country\n        additionalStreetInfo\n        additionalAddressInfo\n        firstName\n        lastName\n        salutation\n        title\n        company\n        department\n        externalId\n        __typename\n      }\n      addresses {\n        id\n        externalId\n        key\n        streetName\n        streetNumber\n        apartment\n        building\n        pOBox\n        city\n        postalCode\n        region\n        state\n        country\n        additionalStreetInfo\n        additionalAddressInfo\n        firstName\n        lastName\n        salutation\n        title\n        company\n        department\n        externalId\n      }\n      custom{\n        customFieldsRaw{\n          name\n          value\n        }\n      }\n    }\n  }\n  ";
exports.FETCH_CUSTOMERS_ORDERS = "query FectchCustomerOrdersListQuery(\n    $limit: Int\n    $offset: Int\n    $sort: [String!]\n    $where: String\n  ) {\n    orders(limit: $limit, offset: $offset, sort: $sort, where: $where) {\n      total\n      count\n      results {\n        id\n        orderNumber\n        totalPrice {\n          centAmount\n          currencyCode\n          fractionDigits\n          __typename\n        }\n        orderState\n        paymentState\n        shipmentState\n        customerEmail\n        createdAt\n        __typename\n      }\n      __typename\n    }\n  }\n  ";
exports.FETCH_CUSTOMERS_GRAPHQL = "query FetchCustomers($limit: Int!, $offset: Int!, $sort: [String!]) {\n    customers(limit: $limit, offset: $offset, sort: $sort) {\n      total\n      count\n      offset\n      results {\n        id\n        customerNumber\n        externalId\n        firstName\n        dateOfBirth\n        lastName\n        companyName\n        email\n        customerGroup{\n        name\n        }\n        createdAt\n        lastModifiedAt\n        key\n      }\n    }\n  } \n  ";
exports.UPDATE_CUSTOMERS_ADDRESS_DETAILS = "mutation UpdateCustomerAddressesDetailsMutation(\n  $customerId: String!\n  $version: Long!\n  $actions: [CustomerUpdateAction!]!\n) {\n  updateCustomer(id: $customerId, version: $version, actions: $actions) {\n    ...CustomerDetailsAddressesFragment\n    __typename\n  }\n}\nfragment CustomerDetailsAddressesFragment on Customer {\n  id\n  firstName\n  lastName\n  version\n  defaultBillingAddress {\n    ...FullAddress\n    __typename\n  }\n  defaultShippingAddress {\n    ...FullAddress\n    __typename\n  }\n  addresses {\n    ...FullAddress\n    __typename\n  }\n  billingAddresses {\n    ...FullAddress\n    __typename\n  }\n  shippingAddresses {\n    ...FullAddress\n    __typename\n  }\n  __typename\n}\n\nfragment FullAddress on Address {\n  id\n  key\n  streetName\n  streetNumber\n  apartment\n  building\n  pOBox\n  city\n  postalCode\n  region\n  state\n  country\n  additionalStreetInfo\n  additionalAddressInfo\n  firstName\n  lastName\n  salutation\n  title\n  company\n  department\n  email\n  phone\n  mobile\n  fax\n  externalId\n  custom {\n    type {\n      ...CustomFieldsTypeFragment\n      __typename\n    }\n    customFieldsRaw {\n      name\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CustomFieldsTypeFragment on TypeDefinition {\n  id\n  key\n  createdAt\n  lastModifiedAt\n  nameAllLocales {\n    locale\n    value\n    __typename\n  }\n  fieldDefinitions {\n    name\n    inputHint\n    type {\n      name\n      ... on ReferenceType {\n        referenceTypeId\n        __typename\n      }\n      ... on EnumType {\n        values {\n          key\n          label\n          __typename\n        }\n        __typename\n      }\n      ... on LocalizedEnumType {\n        values {\n          key\n          labelAllLocales {\n            locale\n            value\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      ... on SetType {\n        elementType {\n          name\n          ... on ReferenceType {\n            referenceTypeId\n            __typename\n          }\n          ... on EnumType {\n            values {\n              key\n              label\n              __typename\n            }\n            __typename\n          }\n          ... on LocalizedEnumType {\n            values {\n              key\n              labelAllLocales {\n                locale\n                value\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      ... on ReferenceType {\n        referenceTypeId\n        __typename\n      }\n      __typename\n    }\n    inputHint\n    required\n    labelAllLocales {\n      locale\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n  ";
exports.UPDATE_CUSTOMERS_DETAILS = "mutation UpdateCustomerDetails(\n    $id: String!\n    $version: Long!\n    $actions: [CustomerUpdateAction!]!\n  ) {\n    updateCustomer(id: $id, version: $version, actions: $actions) {\n      id\n      version\n      firstName\n      dateOfBirth\n      email\n      customerNumber\n      externalId\n      lastName\n      companyName\n      customerGroup{\n        name\n      }\n      custom{\n        customFieldsRaw{\n          name\n          value\n        }\n      }\n    }\n    }\n  \n  ";