"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH_PROMOTIONS_LIST = exports.UPDATE_CUSTOMER_PROMOTIONS = exports.FETCH_CUSTOMER_PROMOTIONS_LIST = exports.FETCH_CUSTOMERS_SHOPPINGLIST = exports.FETCH_CUSTOMER_PROMOTIONS = exports.FETCH_CUSTOMERS_WISHLIST = exports.FETCH_CUSTOMERS_EMAIL_BY_ID = exports.FETCH_CUSTOMER_ADDRESSES = exports.FETCH_CUSTOMER_CARTS = exports.FETCH_CUSTOMER_PAYMENTS = exports.RESET_PASSWORD_FOR_CUSTOMER = exports.GET_PASSWORD_RESET_TOKEN = exports.UPDATE_CUSTOMERS_DETAILS = exports.UPDATE_CUSTOMERS_ADDRESS_DETAILS = exports.FETCH_CUSTOMERS_GRAPHQL = exports.FETCH_CUSTOMERS_ORDERS = exports.FETCH_CUSTOMERS_DETAILS = exports.FETCH_CUSTOMERS_ADDRESS_DETAILS = void 0;
exports.FETCH_CUSTOMERS_ADDRESS_DETAILS = "query CustomerDetailsAddressesQuery($id: String!) {\n    customer(id: $id) {\n      ...CustomerDetailsAddressesFragment\n      __typename\n    }\n  }\n  \n  fragment CustomerDetailsAddressesFragment on Customer {\n    id\n    firstName\n    lastName\n    version\n    defaultBillingAddress {\n      ...FullAddress\n      __typename\n    }\n    defaultShippingAddress {\n      ...FullAddress\n      __typename\n    }\n    addresses {\n      ...FullAddress\n      __typename\n    }\n    billingAddresses {\n      ...FullAddress\n      __typename\n    }\n    shippingAddresses {\n      ...FullAddress\n      __typename\n    }\n    __typename\n  }\n  \n  fragment FullAddress on Address {\n    id\n    key\n    streetName\n    streetNumber\n    apartment\n    building\n    pOBox\n    city\n    postalCode\n    region\n    state\n    country\n    additionalStreetInfo\n    additionalAddressInfo\n    firstName\n    lastName\n    salutation\n    title\n    company\n    department\n    email\n    phone\n    mobile\n    fax\n    externalId\n    custom {\n      type {\n        ...CustomFieldsTypeFragment\n        __typename\n      }\n      customFieldsRaw {\n        name\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  \n  fragment CustomFieldsTypeFragment on TypeDefinition {\n    id\n    key\n    createdAt\n    lastModifiedAt\n    nameAllLocales {\n      locale\n      value\n      __typename\n    }\n    fieldDefinitions {\n      name\n      inputHint\n      type {\n        name\n        ... on ReferenceType {\n          referenceTypeId\n          __typename\n        }\n        ... on EnumType {\n          values {\n            key\n            label\n            __typename\n          }\n          __typename\n        }\n        ... on LocalizedEnumType {\n          values {\n            key\n            labelAllLocales {\n              locale\n              value\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        ... on SetType {\n          elementType {\n            name\n            ... on ReferenceType {\n              referenceTypeId\n              __typename\n            }\n            ... on EnumType {\n              values {\n                key\n                label\n                __typename\n              }\n              __typename\n            }\n            ... on LocalizedEnumType {\n              values {\n                key\n                labelAllLocales {\n                  locale\n                  value\n                  __typename\n                }\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        ... on ReferenceType {\n          referenceTypeId\n          __typename\n        }\n        __typename\n      }\n      inputHint\n      required\n      labelAllLocales {\n        locale\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  ";
exports.FETCH_CUSTOMERS_DETAILS = "query FetchCustomerDetails($id: String!) {\n    customer(id: $id) {\n      id\n      version\n      firstName\n      dateOfBirth\n      email\n      customerNumber\n      externalId\n      lastName\n      companyName\n      customerGroup{\n        name\n      }\n      defaultBillingAddress {\n        id\n        streetName\n        streetNumber\n        apartment\n        building\n        pOBox\n        city\n        postalCode\n        region\n        state\n        country\n        additionalStreetInfo\n        additionalAddressInfo\n        firstName\n        lastName\n        salutation\n        title\n        company\n        department\n        externalId\n        __typename\n      }\n      defaultShippingAddress {\n        id\n        streetName\n        streetNumber\n        apartment\n        building\n        pOBox\n        city\n        postalCode\n        region\n        state\n        country\n        additionalStreetInfo\n        additionalAddressInfo\n        firstName\n        lastName\n        salutation\n        title\n        company\n        department\n        externalId\n        __typename\n      }\n      addresses {\n        id\n        externalId\n        key\n        streetName\n        streetNumber\n        apartment\n        building\n        pOBox\n        city\n        postalCode\n        region\n        state\n        country\n        additionalStreetInfo\n        additionalAddressInfo\n        firstName\n        lastName\n        salutation\n        title\n        company\n        department\n        externalId\n      }\n      custom{\n        customFieldsRaw{\n          name\n          value\n        }\n      }\n    }\n  }\n  ";
exports.FETCH_CUSTOMERS_ORDERS = "query FectchCustomerOrdersListQuery(\n    $limit: Int\n    $offset: Int\n    $sort: [String!]\n    $where: String\n  ) {\n    orders(limit: $limit, offset: $offset, sort: $sort, where: $where) {\n      total\n      count\n      results {\n        id\n        orderNumber\n        totalPrice {\n          centAmount\n          currencyCode\n          fractionDigits\n          __typename\n        }\n        orderState\n        paymentState\n        shipmentState\n        customerEmail\n        createdAt\n        lineItems {\n        quantity\n        nameAllLocales {\n          value\n        }\n        variant{\n          sku\n        }\n        price {\n          value {\n            centAmount\n            currencyCode\n            fractionDigits\n          }\n        }\n      }\n        ...returnInfo\n        __typename\n      }\n      __typename\n    }\n  }\n  fragment returnInfo on Order{\n    returnInfo{\n          returnTrackingId\n          returnDate\n          items{\n            type\n            id\n            quantity\n            comment\n            shipmentState\n            paymentState\n            lastModifiedAt\n            createdAt\n          }\n        }\n  }\n  ";
exports.FETCH_CUSTOMERS_GRAPHQL = "query FetchCustomers($limit: Int!, $offset: Int!, $sort: [String!]) {\n    customers(limit: $limit, offset: $offset, sort: $sort) {\n      total\n      count\n      offset\n      results {\n        id\n        customerNumber\n        externalId\n        firstName\n        dateOfBirth\n        lastName\n        companyName\n        email\n        customerGroup{\n        name\n        }\n        createdAt\n        lastModifiedAt\n        key\n      }\n    }\n  } \n  ";
exports.UPDATE_CUSTOMERS_ADDRESS_DETAILS = "mutation UpdateCustomerAddressesDetailsMutation(\n  $customerId: String!\n  $version: Long!\n  $actions: [CustomerUpdateAction!]!\n) {\n  updateCustomer(id: $customerId, version: $version, actions: $actions) {\n    ...CustomerDetailsAddressesFragment\n    __typename\n  }\n}\nfragment CustomerDetailsAddressesFragment on Customer {\n  id\n  firstName\n  lastName\n  version\n  defaultBillingAddress {\n    ...FullAddress\n    __typename\n  }\n  defaultShippingAddress {\n    ...FullAddress\n    __typename\n  }\n  addresses {\n    ...FullAddress\n    __typename\n  }\n  billingAddresses {\n    ...FullAddress\n    __typename\n  }\n  shippingAddresses {\n    ...FullAddress\n    __typename\n  }\n  __typename\n}\n\nfragment FullAddress on Address {\n  id\n  key\n  streetName\n  streetNumber\n  apartment\n  building\n  pOBox\n  city\n  postalCode\n  region\n  state\n  country\n  additionalStreetInfo\n  additionalAddressInfo\n  firstName\n  lastName\n  salutation\n  title\n  company\n  department\n  email\n  phone\n  mobile\n  fax\n  externalId\n  custom {\n    type {\n      ...CustomFieldsTypeFragment\n      __typename\n    }\n    customFieldsRaw {\n      name\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CustomFieldsTypeFragment on TypeDefinition {\n  id\n  key\n  createdAt\n  lastModifiedAt\n  nameAllLocales {\n    locale\n    value\n    __typename\n  }\n  fieldDefinitions {\n    name\n    inputHint\n    type {\n      name\n      ... on ReferenceType {\n        referenceTypeId\n        __typename\n      }\n      ... on EnumType {\n        values {\n          key\n          label\n          __typename\n        }\n        __typename\n      }\n      ... on LocalizedEnumType {\n        values {\n          key\n          labelAllLocales {\n            locale\n            value\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      ... on SetType {\n        elementType {\n          name\n          ... on ReferenceType {\n            referenceTypeId\n            __typename\n          }\n          ... on EnumType {\n            values {\n              key\n              label\n              __typename\n            }\n            __typename\n          }\n          ... on LocalizedEnumType {\n            values {\n              key\n              labelAllLocales {\n                locale\n                value\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      ... on ReferenceType {\n        referenceTypeId\n        __typename\n      }\n      __typename\n    }\n    inputHint\n    required\n    labelAllLocales {\n      locale\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n  ";
exports.UPDATE_CUSTOMERS_DETAILS = "mutation UpdateCustomerDetails(\n    $id: String!\n    $version: Long!\n    $actions: [CustomerUpdateAction!]!\n  ) {\n    updateCustomer(id: $id, version: $version, actions: $actions) {\n      id\n      version\n      firstName\n      dateOfBirth\n      email\n      customerNumber\n      externalId\n      lastName\n      companyName\n      customerGroup{\n        name\n      }\n      custom{\n        customFieldsRaw{\n          name\n          value\n        }\n      }\n    }\n    }\n  \n  ";
exports.GET_PASSWORD_RESET_TOKEN = "\n  mutation GET_PASSWORD_RESET_TOKEN($email:String!){\n    customerCreatePasswordResetToken(email:$email){\n      customerId\n      value\n      id\n      version\n    }\n  }\n  ";
exports.RESET_PASSWORD_FOR_CUSTOMER = "\n  mutation RESET_PASSWORD_FOR_CUSTOMER($version:Long,$tokenValue:String!,$newPassword:String!){\n    customerResetPassword(version:$version,\n      tokenValue:$tokenValue,newPassword:$newPassword){\n      customerNumber\n      email\n      key\n    }\n  }\n  ";
exports.FETCH_CUSTOMER_PAYMENTS = "query FectchCustomerPaymentsListQuery(\n  $limit: Int\n  $offset: Int\n  $sort: [String!]\n  $where: String\n) {\n  payments(limit: $limit, offset: $offset, sort: $sort, where: $where) {\n    total\n    count\n    results{\n      id\n      key\n      interfaceId\n      version\n      createdAt\n      lastModifiedAt\n      paymentStatus{\n        interfaceCode\n        interfaceText\n      }\n      customer{\n        id\n      }\n      amountPlanned{\n        type\n        currencyCode\n        centAmount\n        fractionDigits\n      }\n      paymentMethodInfo{\n        paymentInterface\n        method\n        name(locale:\"en\")\n      }\n      transactions{\n        timestamp\n        type\n        state\n        amount{\n          type\n          currencyCode\n          fractionDigits\n          centAmount\n        }\n      }\n    }\n}\n}";
exports.FETCH_CUSTOMER_CARTS = "query FectchCustomerOrdersListQuery(\n  $limit: Int\n  $offset: Int\n  $sort: [String!]\n  $where: String\n) {\n  carts(limit: $limit, offset: $offset, sort: $sort, where: $where) {\n    total\n    count\n    results {\n      id\n      key\n      totalPrice {\n        centAmount\n        currencyCode\n        fractionDigits\n        __typename\n      }\n      lineItems{\n        id\n        quantity\n      }\n      cartState\n      customerEmail\n      customerId\n      createdAt\n      lastModifiedAt\n      __typename\n    }\n    __typename\n  }\n}";
exports.FETCH_CUSTOMER_ADDRESSES = "query fetchCustomerAddresses($id:String){\n  customer(id:$id){\n    addresses{\n      id\n      streetName\n      streetNumber\n      salutation\n      additionalStreetInfo\n      additionalAddressInfo\n      city\n      region\n      state\n      country\n      company\n      department\n      building\n      apartment\n      pOBox\n      phone\n      mobile\n      email\n      firstName\n      lastName\n      postalCode\n      apartment\n    }\n  }\n}";
exports.FETCH_CUSTOMERS_EMAIL_BY_ID = "query CustomerEmailByID($id:String) {\n  customer(id:$id) {\n    version\n    email\n  }\n}";
exports.FETCH_CUSTOMERS_WISHLIST = "query FetchWishlist($limit: Int, $offset: Int, $sort: [String!], $where: String) {\n  shoppingLists( limit: $limit, offset: $offset, sort: $sort, where: $where) {\n    total\n    count\n    offset\n    exists\n    results {\n      id\n      key\n      nameAllLocales{\n        locale\n        value\n      }\n      name(locale:\"en\")\n      description(locale:\"en\")\n      customer{\n        id\n        customerNumber\n        email\n      }\n      lineItems{\n        id\n        productId\n        variantId\n        productType{\n          name\n        }\n        quantity\n        name(locale:\"en-US\")\n        variant{\n          id\n          key\n          sku\n          availability{\n            noChannel{\n              isOnStock\n            }\n          }\n          images{\n            url\n            label\n          }\n          prices{\n            id\n            value{\n              type\n              currencyCode\n              centAmount\n              fractionDigits\n\n}";
exports.FETCH_CUSTOMER_PROMOTIONS = "query FetchCustomerPromotions($id:String!) {\n  customer(id:$id) {\n      id\n      version\n      customerNumber\n      custom{\n        customFieldsRaw{\n          name\n          value\n          referencedResourceSet{\n            ... on CartDiscount{\n              id\n              key\n              name(locale:\"en-US\")\n              validFrom\n              validUntil\n              isActive\n              requiresDiscountCode\n              value{\n                ... on AbsoluteDiscountValue{\n                  money{\n                    currencyCode\n                    fractionDigits\n                    centAmount\n                  }\n                }\n                ... on FixedPriceDiscountValue{\n                  money{\n                    currencyCode\n                    fractionDigits\n                    centAmount\n                  }\n                }\n                ... on RelativeDiscountValue{\n                  permyriad\n                }\n              }\n\n            }\n          }\n        }\n      }\n\n    \tcustom{\n        typeRef{\n          typeId\n        }\n        type{\n          id\n          key\n          name(locale:\"en\")\n          }\n        \n        customFieldsRaw{\n          name\n          value\n          \n        }\n      }\n      createdAt\n      lastModifiedAt\n      \n    }\n  }\n\n";
exports.FETCH_CUSTOMERS_SHOPPINGLIST = "query FetchShoppinglist($limit: Int, $offset: Int, $sort: [String!], $where: String) {\n  shoppingLists( limit: $limit, offset: $offset, sort: $sort, where: $where) {\n    total\n    count\n    offset\n    exists\n    results {\n      id\n      key\n      nameAllLocales{\n        locale\n        value\n      }\n      name(locale:\"en\")\n      description(locale:\"en\")\n      customer{\n        id\n        customerNumber\n        email\n      }\n      lineItems{\n        id\n        productId\n        variantId\n        productType{\n          name\n        }\n        quantity\n        name(locale:\"en-US\")\n        variant{\n          id\n          key\n          sku\n          availability{\n            noChannel{\n              isOnStock\n            }\n          }\n          images{\n            url\n            label\n          }\n          prices{\n            id\n            value{\n              type\n              currencyCode\n              centAmount\n              fractionDigits\n            }\n          }\n        }\n      }\n    \tcustom{\n        typeRef{\n          typeId\n        }\n        type{\n          id\n          key\n          name(locale:\"en\")\n          }\n        \n        customFieldsRaw{\n          name\n          value\n          \n        }\n      }\n      createdAt\n      lastModifiedAt\n      \n    }\n  }\n}";
exports.FETCH_CUSTOMER_PROMOTIONS_LIST = "query FetchCustomerPromotionsList($sort:[String!],$where:String) {\n  cartDiscounts(sort:$sort,where:$where) {\n    count\n    total\n    results{\n      id\n      key\n      name(locale:\"en-US\")\n      validFrom\n      validUntil\n      isActive\n      requiresDiscountCode\n      value{\n        ... on AbsoluteDiscountValue{\n          type\n          money{\n            centAmount\n            fractionDigits\n            currencyCode\n          }\n        }\n        ... on FixedPriceDiscountValue{\n          type\n          money{\n            centAmount\n            fractionDigits\n            currencyCode\n          }\n        }\n        ... on RelativeDiscountValue{\n          permyriad\n          type\n        }\n      }\n    }\n  }\n}";
exports.UPDATE_CUSTOMER_PROMOTIONS = "mutation updateCustomerPromotion($id:String!,$verison:Long!,$actions:[CustomerUpdateAction!]!){\n  updateCustomer(id:$id,version:$verison,actions:$actions){\n    custom{\n      customFieldsRaw{\n        name\n        value\n        referencedResourceSet{\n          ... on CartDiscount{\n              \tid\n                key\n                name(locale:\"en-US\")\n                validFrom\n                validUntil\n                isActive\n                requiresDiscountCode\n                value{\n                  ... on AbsoluteDiscountValue{\n                    money{\n                      currencyCode\n                      fractionDigits\n                      centAmount\n                    }\n                  }\n                  ... on FixedPriceDiscountValue{\n                    money{\n                      currencyCode\n                      fractionDigits\n                      centAmount\n                    }\n                  }\n                  ... on RelativeDiscountValue{\n                    permyriad\n                  }\n                }\n            \t}\n        }\n      }\n    }\n  }\n}";
exports.FETCH_PROMOTIONS_LIST = "query FetchCustomerPromotionsList($sort:[String!],$where:String) {\n  cartDiscounts(sort:$sort,where:$where) {\n    count\n    total\n    results{\n      id\n      key\n      name(locale:\"en-US\")\n      validFrom\n      validUntil\n      isActive\n      requiresDiscountCode\n      value{\n        ... on AbsoluteDiscountValue{\n          type\n          money{\n            centAmount\n            fractionDigits\n            currencyCode\n          }\n        }\n        ... on FixedPriceDiscountValue{\n          type\n          money{\n            centAmount\n            fractionDigits\n            currencyCode\n          }\n        }\n        ... on RelativeDiscountValue{\n          permyriad\n          type\n        }\n      }\n    }\n  }\n}";
