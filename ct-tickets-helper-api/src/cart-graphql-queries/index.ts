export const FETCH_CARTS = `query FetchAllCarts($where:String,$limit: Int!, $offset: Int!, $sort: [String!]) {
    carts(where:$where,limit: $limit, offset: $offset, sort: $sort) {
        total
        count
        offset
        results {
            id
            cartState
            key

            customer {
                firstName
                lastName
            }
            custom {
                type {
                    id
                    key
                }
                customFieldsRaw{
                value
              }
                
            }
            customerEmail
            createdAt
            createdBy {
                customerRef {
                    typeId
                    id
                }
            }
            lastModifiedAt
            shippingInfo {
                shippingMethodName
                shippingMethodState
            }
            lineItems {
                quantity
            }
            totalPrice {
                type
                centAmount
                currencyCode
                fractionDigits
            }
            
        }
    }
}
`;

export const FETCH_CART_BY_CARTNUMBER = `query($id:String!){
    cart(id:$id){
        id
        version
        key
        createdAt
        lastModifiedAt
          createdBy{
          customerRef{
            typeId
            id
          }
        }
        customerId
        customerEmail
        country
        cartState
        origin
        ...lineItems
        ...shippingAddress
        ...shippingInfo
        ...paymentInfo
        ...billingAddress
        ...taxedPrice
        ...custom
        customLineItems{
            __typename
        }
        ...discountCodes
        directDiscounts{
            __typename
        }
    }
  }
  
  fragment discountCodes on Cart{
    discountCodes{
      discountCodeRef{
        typeId
        id
      }
      state
      discountCode{
        code
        isActive
        cartPredicate
        validFrom
        validUntil
        version
        name(locale:"en-US")
        ...cartDiscounts
      }
    }
  }
  
  fragment cartDiscounts on DiscountCode{
    cartDiscounts{
      key
      name(locale:"en-US")
      isActive
      validFrom
      validUntil
      version
      value{
              ... on AbsoluteDiscountValue{
                type
                money{
                  centAmount
                  currencyCode
                  fractionDigits
                }
              }
              ... on RelativeDiscountValue{
                permyriad
                type
              }
            }
    }
  }
  
  fragment taxedPrice on Cart{
        taxedPrice{
           totalNet{
                type
                currencyCode
                centAmount
                fractionDigits
           }
           totalGross{
                type
                currencyCode
                centAmount
                fractionDigits
           }
           totalTax{
                type
                currencyCode
                centAmount
                fractionDigits
           }
           taxPortions{
               rate
               amount{
                    type
                    currencyCode
                    centAmount
                    fractionDigits
               }
               name
           }
        }            
    }
 
  
  fragment lineItems on Cart{
    lineItems{
        id
        productId
        productKey
        name(locale:"en-US")
        ...productType
        ...variant
        ...price
        quantity
        discountedPricePerQuantity{
            __typename
        }
        ...taxRate
        lastModifiedAt
        ...state
        priceMode
        lineItemMode
        ...totalPriceLineItem
        ...taxedPriceLineItem
    }
  }
  
  fragment state on LineItem{
    state{
        quantity
        state{
            id
              name(locale:"en-US")
              description(locale:"en-US")
              initial
        }        
    }
  }
  fragment productType on LineItem{
    productType{
            id
            name
        }
  }
  fragment variant on LineItem{
    variant{
        
        sku
        key
        prices{
            id
            value{
                type
                currencyCode
                centAmount
                fractionDigits
            }
            country
        }
        images{
            url
        }
        attributesRaw{
            name
            value
        }
        assets{
            __typename
        }
    }
  }
  fragment price on LineItem{
    price{
        id
            value{
                type
                currencyCode
                centAmount
                fractionDigits
            }
            country
    }
  }
  fragment taxRate on LineItem{
    taxRate{
        name
        amount
        includedInPrice
        country
        id
        subRates{
            __typename
        }
    }
  }
  fragment totalPriceLineItem on LineItem{
    totalPrice{
            type
            currencyCode
            centAmount
            fractionDigits
        }
  }
  fragment taxedPriceLineItem on LineItem{
    taxedPrice{
           totalNet{
                type
                currencyCode
                centAmount
                fractionDigits
           }
           totalGross{
                type
                currencyCode
                centAmount
                fractionDigits
           }
           totalTax{
                type
                currencyCode
                centAmount
                fractionDigits
           }
        } 
  }
   fragment shippingInfo on Cart{
    shippingInfo{
        shippingMethodName
        shippingMethodState
        price{
            type
            currencyCode
            centAmount
            fractionDigits
        }
        shippingRate{
            price{
                type
                currencyCode
                centAmount
                fractionDigits
            }
            freeAbove{
                type
                currencyCode
                centAmount
                fractionDigits
            }
            tiers{
                type
                __typename
            }
        }
        taxRate{
            name
            amount
            country
            includedInPrice
            id
            subRates{
                __typename
            }
        }
        taxCategory{
            id
            name
        }
        shippingMethod{
            id
            name
        }
        taxedPrice{
            totalNet{
                type
                currencyCode
                centAmount
                fractionDigits
            }
            totalGross{
                type
                currencyCode
                centAmount
                fractionDigits
            }
            totalTax{
                type
                currencyCode
                centAmount
                fractionDigits
            }
        }
    }
  }
  
  fragment shippingAddress on Cart{
    shippingAddress{
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
  fragment paymentInfo on Cart{
    paymentInfo{
        payments{
          id
          amountPlanned{
            currencyCode
            centAmount
          }
          paymentMethodInfo{
            method
          }
          transactions{
            timestamp
            amount{
              centAmount
            }
            state
          }
        }
    }
  }
  fragment billingAddress on Cart{
    billingAddress{
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
  fragment custom on Cart{
    custom {
                type {
                    id
                    key
                }
               customFieldsRaw{
                value
              } 
            }
  }`;

export const CREATE_SHIPPING_BILLING_ADDRESS = `mutation updateCart(
    $version: Long!
    $actions: [CartUpdateAction!]!
  ) {
    updateCart(

      version: $version
      actions: $actions
    ) {
      ...CartFrag
    }
  }
  
   fragment CartFrag on Cart{
    shippingAddress{
      id
      streetName
      streetNumber
      postalCode
      city
      state
      building
      country
    }
    billingAddress{
      id
      streetName
      streetNumber
      postalCode
      city
      state
      building
      country
    }
  }
  `;

export const CREATE_ORDER_FROMCART = `mutation createOrder(
    $draft: OrderCartCommand!
  ) {
    createOrderFromCart(draft: $draft
) {
    id
    ...cart
    version
    customerEmail
    customerId
    purchaseOrderNumber
    paymentState
    orderState
    ...state
    shipmentState
    orderNumber
    ...custom
}
    
  }
  fragment cart on Order{
  cart{
      id        
  }
}
fragment state on Order{
  state{
     id      
  }
}
  fragment custom on Order{
    custom{
      type{
        id
        key
      }
    }
  }`;
export const UPDATE_CART_BY_ID = `mutation updateCartById($version:Long!,
    $actions:[CartUpdateAction!]!,
    $id:String!){
      updateCart(version:$version,actions:$actions,id:$id){
        id
        cartState
        version
        lineItems{
          productId
           price{
        id
            value{
                type
                currencyCode
                centAmount
                fractionDigits
            }
            country
    }
          variant{
        
        sku
        key
        prices{
            id
            value{
                type
                currencyCode
                centAmount
                fractionDigits
            }
            country
        }
        images{
            url
        }
        attributesRaw{
            name
            value
        }
        assets{
            __typename
        }
    }

        }
        shippingAddress{
      id
      streetName
      streetNumber
      city
      region
      state
      country
      company
      department
      building
      apartment
      pOBox
      additionalStreetInfo
      additionalAddressInfo
    }
    billingAddress{
      id
      streetName
      streetNumber
      city
      region
      state
      country
      company
      department
      building
      apartment
      pOBox
      additionalStreetInfo
      additionalAddressInfo
    }
     discountCodes{
          discountCodeRef{
            typeId
            id
          }
          state
          discountCode{
            code
        isActive
        cartPredicate
        validFrom
        validUntil
        version
        name(locale:"en-US")
          }
        }
      }
    }`;

export const FETCH_ACTIVE_CART_COUNT = `query FetchActiveCarts ($where:String){
  carts(where:$where){
      total
      count
      offset
  }
}
  `;

export const FETCH_ORDER_COUNT = `query FETCH_ORDER_COUNT ($where:String){
    orders(where:$where){
        total
        count
        offset
        }
    }
    `;

export const FETCH_CART_DISCOUNT_CODES = `query{
  discountCodes{
    results{
      id
      validFrom
      validUntil
      isActive
      name(locale:"en-US")
      code
      
    }
  }
}`;

export const FETCH_CART_DISCOUNTS = `query{
  cartDiscounts{
    results{
      id
      validFrom
      validUntil
      isActive
      name(locale:"en-US")
      cartPredicate
      stackingMode
      requiresDiscountCode
      sortOrder
      key
      value{
        type
      }
    }
  }
}`;

export const FETCH_SHIPPING_ADDRESS_BY_CART = `
query($id:String!){
    cart(id:$id){
        id
        version
        key
        createdAt
        lastModifiedAt
        customerId
    shippingAddress{
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
        billingAddress{
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

export const FETCH_BILLING_ADDRESS_BY_CART = `
query($id:String!){
    cart(id:$id){
        id
        version
        key
        createdAt
        lastModifiedAt
    billingAddress{
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

export const FETCH_SHIPPING_METHODS = `
query{
    shippingMethods{
      results{
        id
        name
        key
        predicate
        taxCategory{
          name
        }
        createdAt
        lastModifiedAt
      }
    }
}`;
