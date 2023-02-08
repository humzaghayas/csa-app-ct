export const FETCH_CARTS = `query FetchAllCarts($limit: Int!, $offset: Int!, $sort: [String!]){
    carts(limit: $limit, offset: $offset, sort: $sort){
      total
      count
      offset
      results{
        id
        cartState
        key
        
        customer{
            firstName
            lastName
        }
        custom{
      type{
        id
      }
    }
        customerEmail
        createdAt
        createdBy{
          customerRef{
            typeId
            id
          }
        }
        lastModifiedAt
        shippingInfo{
            shippingMethodName
            shippingMethodState
        }
        lineItems{
          quantity
        }
        totalPrice{
          type
          centAmount
          currencyCode
          fractionDigits
        }
      }
    }
  }`;

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
        ...billingAddress
        ...taxedPrice
        ...custom
        customLineItems{
            __typename
        }
        discountCodes{
            __typename
        }
        directDiscounts{
            __typename
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
        ...prioductType
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
  fragment prioductType on LineItem{
    productType{
            id
            name
        }
  }
  fragment variant on LineItem{
    variant{
        id
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
  
  fragment shippingAddress on Cart{
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
  }
  fragment billingAddress on Cart{
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
  fragment custom on Cart{
    custom{
      type{
        id
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
      }
    }
  }`;
