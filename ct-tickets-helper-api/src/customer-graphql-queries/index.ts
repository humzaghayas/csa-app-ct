export const FETCH_CUSTOMERS_ADDRESS_DETAILS = `query CustomerDetailsAddressesQuery($id: String!) {
    customer(id: $id) {
      ...CustomerDetailsAddressesFragment
      __typename
    }
  }
  
  fragment CustomerDetailsAddressesFragment on Customer {
    id
    firstName
    lastName
    version
    defaultBillingAddress {
      ...FullAddress
      __typename
    }
    defaultShippingAddress {
      ...FullAddress
      __typename
    }
    addresses {
      ...FullAddress
      __typename
    }
    billingAddresses {
      ...FullAddress
      __typename
    }
    shippingAddresses {
      ...FullAddress
      __typename
    }
    __typename
  }
  
  fragment FullAddress on Address {
    id
    key
    streetName
    streetNumber
    apartment
    building
    pOBox
    city
    postalCode
    region
    state
    country
    additionalStreetInfo
    additionalAddressInfo
    firstName
    lastName
    salutation
    title
    company
    department
    email
    phone
    mobile
    fax
    externalId
    custom {
      type {
        ...CustomFieldsTypeFragment
        __typename
      }
      customFieldsRaw {
        name
        value
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment CustomFieldsTypeFragment on TypeDefinition {
    id
    key
    createdAt
    lastModifiedAt
    nameAllLocales {
      locale
      value
      __typename
    }
    fieldDefinitions {
      name
      inputHint
      type {
        name
        ... on ReferenceType {
          referenceTypeId
          __typename
        }
        ... on EnumType {
          values {
            key
            label
            __typename
          }
          __typename
        }
        ... on LocalizedEnumType {
          values {
            key
            labelAllLocales {
              locale
              value
              __typename
            }
            __typename
          }
          __typename
        }
        ... on SetType {
          elementType {
            name
            ... on ReferenceType {
              referenceTypeId
              __typename
            }
            ... on EnumType {
              values {
                key
                label
                __typename
              }
              __typename
            }
            ... on LocalizedEnumType {
              values {
                key
                labelAllLocales {
                  locale
                  value
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on ReferenceType {
          referenceTypeId
          __typename
        }
        __typename
      }
      inputHint
      required
      labelAllLocales {
        locale
        value
        __typename
      }
      __typename
    }
    __typename
  }
  `;
export const FETCH_CUSTOMERS_DETAILS = `query FetchCustomerDetails($id: String!) {
    customer(id: $id) {
      id
      version
      firstName
      dateOfBirth
      email
      customerNumber
      externalId
      lastName
      companyName
      customerGroup{
        name
        id
      }
      defaultBillingAddress {
        id
        streetName
        streetNumber
        apartment
        building
        pOBox
        city
        postalCode
        region
        state
        country
        additionalStreetInfo
        additionalAddressInfo
        firstName
        lastName
        salutation
        title
        company
        department
        externalId
        __typename
      }
      defaultShippingAddress {
        id
        streetName
        streetNumber
        apartment
        building
        pOBox
        city
        postalCode
        region
        state
        country
        additionalStreetInfo
        additionalAddressInfo
        firstName
        lastName
        salutation
        title
        company
        department
        externalId
        __typename
      }
      addresses {
        id
        externalId
        key
        streetName
        streetNumber
        apartment
        building
        pOBox
        city
        postalCode
        region
        state
        country
        additionalStreetInfo
        additionalAddressInfo
        firstName
        lastName
        salutation
        title
        company
        department
        externalId
      }
      custom{
        customFieldsRaw{
          name
          value
        }
      }
    }
  }
  `;
export const FETCH_CUSTOMERS_ORDERS = `query FectchCustomerOrdersListQuery(
    $limit: Int
    $offset: Int
    $sort: [String!]
    $where: String
  ) {
    orders(limit: $limit, offset: $offset, sort: $sort, where: $where) {
      total
      count
      results {
        id
        orderNumber
        totalPrice {
          centAmount
          currencyCode
          fractionDigits
          __typename
        }
        orderState
        paymentState
        shipmentState
        customerEmail
        createdAt
        lineItems {
        quantity
        nameAllLocales {
          value
        }
        variant{
          sku
        }
        price {
          value {
            centAmount
            currencyCode
            fractionDigits
          }
        }
      }
        ...returnInfo
        __typename
      }
      __typename
    }
  }
  fragment returnInfo on Order{
    returnInfo{
          returnTrackingId
          returnDate
          items{
            type
            id
            quantity
            comment
            shipmentState
            paymentState
            lastModifiedAt
            createdAt
          }
        }
  }
  `;
export const FETCH_CUSTOMERS_GRAPHQL = `query FetchCustomers($limit: Int!, $offset: Int!, $sort: [String!]) {
    customers(limit: $limit, offset: $offset, sort: $sort) {
      total
      count
      offset
      results {
        id
        customerNumber
        externalId
        firstName
        dateOfBirth
        lastName
        companyName
        email
        customerGroup{
        name
        }
        createdAt
        lastModifiedAt
        key
      }
    }
  } 
  `;
export const UPDATE_CUSTOMERS_ADDRESS_DETAILS = `mutation UpdateCustomerAddressesDetailsMutation(
  $customerId: String!
  $version: Long!
  $actions: [CustomerUpdateAction!]!
) {
  updateCustomer(id: $customerId, version: $version, actions: $actions) {
    ...CustomerDetailsAddressesFragment
    __typename
  }
}
fragment CustomerDetailsAddressesFragment on Customer {
  id
  firstName
  lastName
  version
  defaultBillingAddress {
    ...FullAddress
    __typename
  }
  defaultShippingAddress {
    ...FullAddress
    __typename
  }
  addresses {
    ...FullAddress
    __typename
  }
  billingAddresses {
    ...FullAddress
    __typename
  }
  shippingAddresses {
    ...FullAddress
    __typename
  }
  __typename
}

fragment FullAddress on Address {
  id
  key
  streetName
  streetNumber
  apartment
  building
  pOBox
  city
  postalCode
  region
  state
  country
  additionalStreetInfo
  additionalAddressInfo
  firstName
  lastName
  salutation
  title
  company
  department
  email
  phone
  mobile
  fax
  externalId
  custom {
    type {
      ...CustomFieldsTypeFragment
      __typename
    }
    customFieldsRaw {
      name
      value
      __typename
    }
    __typename
  }
  __typename
}

fragment CustomFieldsTypeFragment on TypeDefinition {
  id
  key
  createdAt
  lastModifiedAt
  nameAllLocales {
    locale
    value
    __typename
  }
  fieldDefinitions {
    name
    inputHint
    type {
      name
      ... on ReferenceType {
        referenceTypeId
        __typename
      }
      ... on EnumType {
        values {
          key
          label
          __typename
        }
        __typename
      }
      ... on LocalizedEnumType {
        values {
          key
          labelAllLocales {
            locale
            value
            __typename
          }
          __typename
        }
        __typename
      }
      ... on SetType {
        elementType {
          name
          ... on ReferenceType {
            referenceTypeId
            __typename
          }
          ... on EnumType {
            values {
              key
              label
              __typename
            }
            __typename
          }
          ... on LocalizedEnumType {
            values {
              key
              labelAllLocales {
                locale
                value
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      ... on ReferenceType {
        referenceTypeId
        __typename
      }
      __typename
    }
    inputHint
    required
    labelAllLocales {
      locale
      value
      __typename
    }
    __typename
  }
  __typename
}
  `;
export const UPDATE_CUSTOMERS_DETAILS = `mutation UpdateCustomerDetails(
    $id: String!
    $version: Long!
    $actions: [CustomerUpdateAction!]!
  ) {
    updateCustomer(id: $id, version: $version, actions: $actions) {
      id
      version
      firstName
      dateOfBirth
      email
      customerNumber
      externalId
      lastName
      companyName
      customerGroup{
        name
      }
      custom{
        customFieldsRaw{
          name
          value
        }
      }
    }
    }
  
  `;

export const GET_PASSWORD_RESET_TOKEN = `
  mutation GET_PASSWORD_RESET_TOKEN($email:String!){
    customerCreatePasswordResetToken(email:$email){
      customerId
      value
      id
      version
    }
  }
  `;

export const RESET_PASSWORD_FOR_CUSTOMER = `
  mutation RESET_PASSWORD_FOR_CUSTOMER($version:Long,$tokenValue:String!,$newPassword:String!){
    customerResetPassword(version:$version,
      tokenValue:$tokenValue,newPassword:$newPassword){
      customerNumber
      email
      key
    }
  }
  `;
export const FETCH_CUSTOMER_PAYMENTS = `query FectchCustomerPaymentsListQuery(
  $limit: Int
  $offset: Int
  $sort: [String!]
  $where: String
) {
  payments(limit: $limit, offset: $offset, sort: $sort, where: $where) {
    total
    count
    results{
      id
      key
      interfaceId
      version
      createdAt
      lastModifiedAt
      paymentStatus{
        interfaceCode
        interfaceText
      }
      customer{
        id
      }
      amountPlanned{
        type
        currencyCode
        centAmount
        fractionDigits
      }
      paymentMethodInfo{
        paymentInterface
        method
        name(locale:"en")
      }
      transactions{
        timestamp
        type
        state
        amount{
          type
          currencyCode
          fractionDigits
          centAmount
        }
      }
    }
}
}`;
export const FETCH_CUSTOMER_CARTS = `query FectchCustomerOrdersListQuery(
  $limit: Int
  $offset: Int
  $sort: [String!]
  $where: String
) {
  carts(limit: $limit, offset: $offset, sort: $sort, where: $where) {
    total
    count
    results {
      id
      key
      totalPrice {
        centAmount
        currencyCode
        fractionDigits
        __typename
      }
      lineItems{
        id
        quantity
      }
      cartState
      customerEmail
      customerId
      createdAt
      lastModifiedAt
      __typename
    }
    __typename
  }
}`;
export const FETCH_CUSTOMER_ADDRESSES = `query fetchCustomerAddresses($id:String){
  customer(id:$id){
    addresses{
      id
      streetName
      streetNumber
      salutation
      additionalStreetInfo
      additionalAddressInfo
      city
      region
      state
      country
      company
      department
      building
      apartment
      pOBox
      phone
      mobile
      email
      firstName
      lastName
      postalCode
      apartment
    }
  }

}`;



export const FETCH_CUSTOMERS_EMAIL_BY_ID =`query CustomerEmailByID($id:String) {
  customer(id:$id) {
    version
    email
  }
}`;

export const FETCH_CUSTOMERS_WISHLIST = `query FetchWishlist($limit: Int, $offset: Int, $sort: [String!], $where: String) {
  shoppingLists( limit: $limit, offset: $offset, sort: $sort, where: $where) {
    total
    count
    offset
    exists
    results {
      id
      key
      nameAllLocales{
        locale
        value
      }
      name(locale:"en")
      description(locale:"en")
      customer{
        id
        customerNumber
        email
      }
      lineItems{
        id
        productId
        variantId
        productType{
          name
        }
        quantity
        name(locale:"en-US")
        variant{
          id
          key
          sku
          availability{
            noChannel{
              isOnStock
            }
          }
          images{
            url
            label
          }
          prices{
            id
            value{
              type
              currencyCode
              centAmount
              fractionDigits
            }
          }
        }
      }
    	custom{
        typeRef{
          typeId
        }
        type{
          id
          key
          name(locale:"en")
          }
        
        customFieldsRaw{
          name
          value
          
        }
      }
      createdAt
      lastModifiedAt
      
    }
  }

`;

export const FETCH_CUSTOMERS_SHOPPINGLIST = `query FetchShoppinglist($limit: Int, $offset: Int, $sort: [String!], $where: String) {
  shoppingLists( limit: $limit, offset: $offset, sort: $sort, where: $where) {
    total
    count
    offset
    exists
    results {
      id
      key
      nameAllLocales{
        locale
        value
      }
      name(locale:"en")
      description(locale:"en")
      customer{
        id
        customerNumber
        email
      }
      lineItems{
        id
        productId
        variantId
        productType{
          name
        }
        quantity
        name(locale:"en-US")
        variant{
          id
          key
          sku
          availability{
            noChannel{
              isOnStock
            }
          }
          images{
            url
            label
          }
          prices{
            id
            value{
              type
              currencyCode
              centAmount
              fractionDigits
            }
          }
        }
      }
    	custom{
        typeRef{
          typeId
        }
        type{
          id
          key
          name(locale:"en")
          }
        
        customFieldsRaw{
          name
          value
          
        }
      }
      createdAt
      lastModifiedAt
      
    }
  }
}`;


export const FETCH_CUSTOMER_PROMOTIONS = `query FetchCustomerPromotions($id:String!) {
  customer(id:$id) {
      id
      version
      customerNumber
      custom{
        customFieldsRaw{
          name
          value
          referencedResourceSet{
            ... on CartDiscount{
              id
              key
              name(locale:"en-US")
              validFrom
              validUntil
              isActive
              requiresDiscountCode
              value{
                ... on AbsoluteDiscountValue{
                  money{
                    currencyCode
                    fractionDigits
                    centAmount
                  }
                }
                ... on FixedPriceDiscountValue{
                  money{
                    currencyCode
                    fractionDigits
                    centAmount
                  }
                }
                ... on RelativeDiscountValue{
                  permyriad
                }
              }

            }
          }
        }
      }

    	custom{
        typeRef{
          typeId
        }
        type{
          id
          key
          name(locale:"en")
          }
        
        customFieldsRaw{
          name
          value
          
        }
      }
      createdAt
      lastModifiedAt
      
    }
  }`;


export const FETCH_CUSTOMER_PROMOTIONS_LIST = `query FetchCustomerPromotionsList($sort:[String!],$where:String) {
  cartDiscounts(sort:$sort,where:$where) {
    count
    total
    results{
      id
      key
      name(locale:"en-US")
      validFrom
      validUntil
      isActive
      requiresDiscountCode
      value{
        ... on AbsoluteDiscountValue{
          type
          money{
            centAmount
            fractionDigits
            currencyCode
          }
        }
        ... on FixedPriceDiscountValue{
          type
          money{
            centAmount
            fractionDigits
            currencyCode
          }
        }
        ... on RelativeDiscountValue{
          permyriad
          type
        }
      }
    }
  }
}`;
export const UPDATE_CUSTOMER_PROMOTIONS = `mutation updateCustomerPromotion($id:String!,$verison:Long!,$actions:[CustomerUpdateAction!]!){
  updateCustomer(id:$id,version:$verison,actions:$actions){
    custom{
      customFieldsRaw{
        name
        value
        referencedResourceSet{
          ... on CartDiscount{
              	id
                key
                name(locale:"en-US")
                validFrom
                validUntil
                isActive
                requiresDiscountCode
                value{
                  ... on AbsoluteDiscountValue{
                    money{
                      currencyCode
                      fractionDigits
                      centAmount
                    }
                  }
                  ... on FixedPriceDiscountValue{
                    money{
                      currencyCode
                      fractionDigits
                      centAmount
                    }
                  }
                  ... on RelativeDiscountValue{
                    permyriad
                  }
                }
            	}
        }
      }
    }
  }
}`;
export const FETCH_PROMOTIONS_LIST = `query FetchCustomerPromotionsList($sort:[String!],$where:String) {
  cartDiscounts(sort:$sort,where:$where) {
    count
    total
    results{
      id
      key
      name(locale:"en-US")
      validFrom
      validUntil
      isActive
      requiresDiscountCode
      value{
        ... on AbsoluteDiscountValue{
          type
          money{
            centAmount
            fractionDigits
            currencyCode
          }
        }
        ... on FixedPriceDiscountValue{
          type
          money{
            centAmount
            fractionDigits
            currencyCode
          }
        }
        ... on RelativeDiscountValue{
          permyriad
          type
        }
      }
    }
  }

}`;
export const FETCH_QUOTES_LIST = ` query fetchAllQuotes($limit: Int,
  $offset: Int,
  $sort: [String!],
  $where: String){
  quotes(limit: $limit, offset: $offset, sort: $sort, where: $where){
    total
    count
    results{
      id
      customer{
       email
        id
        customerGroup{
          name
        }
      }
      totalPrice{
        centAmount
        currencyCode
        fractionDigits
      }
      quoteState
      createdAt
      lastModifiedAt
      validTo
    }
  }
}`


export const FETCH_QUOTES_REQUEST_LIST = ` query fetchAllQuotesRequests($limit: Int,
  $offset: Int,
  $sort: [String!],
  $where: String){
  quoteRequests(limit: $limit, offset: $offset, sort: $sort, where: $where){
    total
    count
    results{
      id
      customer{
       email
        id
        customerGroup{
          name
        }
      }
      totalPrice{
        centAmount
        currencyCode
        fractionDigits
      }
      createdAt
      lastModifiedAt
    }
  }
}`

export const FETCH_CUSTOMER_GROUPS_LIST = `query fetchCustomerGroupList{
  customerGroups{
    results{
      id
      name
    }
  }
}`
