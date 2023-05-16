export const FETCH_ORDERS = `query FetchAllOrders($limit: Int!, $offset: Int!, $sort: [String!]) {
  orders(limit: $limit, offset: $offset, sort: $sort) {
    total
    count
    offset
    results {
      id
      orderState
      orderNumber
      paymentState
      shipmentState
      customer {
        firstName
        lastName
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
      shippingAddress {
        id
        streetNumber
        streetName
        building
        city
        postalCode
        state
        country
      }
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
      totalPrice {
        type
        centAmount
        currencyCode
        fractionDigits
      }
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
      paymentInfo{
        payments{
          id
      key
      interfaceId
      version
      createdAt
      lastModifiedAt
      custom{
        customFieldsRaw{
          name
          value
        }
      }
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
        id
        type
        interactionId
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
    }
  }
}`
export const FETCH_ORDER_BY_ID = `query($id:String!){
  order(id:$id){
      id
      version
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
      orderState
      orderNumber
      paymentState
        shipmentState
      origin
      ...shippingInfo
      ...shippingAddress
      ...billingAddress
      ...lineItems
      ...cart
      ...paymentInfo
      ...totalPrice
      ...taxedPrice
      ...returnInfo
      ...custom
      customLineItems{
          __typename
      }
      discountCodes{
        discountCode{
          code
          cartDiscounts{
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
            name(locale:"en-Us")
          }
        }
          __typename
      }
      directDiscounts{
          __typename
      }
  }
}
fragment totalPrice on Order{
      totalPrice{
          type
          currencyCode
          centAmount
          fractionDigits
      }            
  }
fragment taxedPrice on Order{
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
fragment shippingInfo on Order{
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
fragment shippingAddress on Order{
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
fragment lineItems on Order{
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
        quantity
        discountedPrice{
          value{
            fractionDigits
            currencyCode
            centAmount
          }
          includedDiscounts{
            discount{
              name(locale:"en-US")
            }
            discountedAmount{
             fractionDigits
              centAmount
              currencyCode
            }
          }
        }
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
fragment cart on Order{
  cart{
      id        
  }
}
fragment paymentInfo on Order{
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
fragment billingAddress on Order{
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
        discounted{
          value{
            type
              currencyCode
              centAmount
              fractionDigits
          }
          discount{
            name(locale:"en-US")
          }
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
    discounted{
          value{
            type
              currencyCode
              centAmount
              fractionDigits
          }
          discount{
            name(locale:"en-US")
          }
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
fragment custom on Order{
  custom{
        customFieldsRaw{
          name
          value
        }
      }
}`
export const UPDATE_ORDER_BY_ID = `mutation updateOrderById($version:Long!,
    $actions:[OrderUpdateAction!]!,
    $id:String!){
      updateOrder(version:$version,actions:$actions,id:$id){
        id
        orderState
        orderNumber
        shipmentState
        paymentState
        version
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

          lineItems{
              id
              productId
              productKey
              name(locale:"en-US")
              quantity
          }
      }
}`
export const CREATE_EDIT_ORDER_BY_ID = `mutation createOrderEdit($draft:OrderEditDraft!){
  createOrderEdit(draft:$draft){
    id
    version
    result{
      type
      ... on PreviewFailure{
        type
        errors
      }
      ... on PreviewSuccess{
        type
        preview{
          id
        }
        messagePayloads{
          type
        }
      }
    }
  }
}`
export const REPLICATE_ORDER = `mutation orderReplicate($referenceInput:ReferenceInput!) {
  replicateCart(reference:$referenceInput){
    id
  }
}`
export const FETCH_PAYMENTS_TO_DISPLAY = `query FETCH_PAYMENTS_TO_DISPLAY($where:String,$offset:Int,$limit:Int) {
  orders(where:$where,offset:$offset,limit:$limit){
  	count
    total
    results{
      id
      paymentInfo{
        payments{
          transactions{
            timestamp
            state
          }
          paymentStatus{
            interfaceCode
            interfaceText
            state{
              key
            }
          }
          paymentMethodInfo{
            method
            name(locale:"en")
          }
        }
      }
    }
  }
}
`
export const FETCH_ORDER_PAYMENTS_BY_ID = `query FetchOrderPaymentsByOrderId($id:String!){
  order(id:$id){
      id
      version
      createdAt
      lastModifiedAt
      customerId
      customerEmail
      country
      orderState
      orderNumber
      paymentInfo{
        payments{
          id
      key
      interfaceId
      version
      createdAt
      lastModifiedAt
      custom{
        customFieldsRaw{
          name
          value
        }
      }
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
        id
        type
        interactionId
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
  }
}`
export const FETCH_ORDER_RETURNINFO_BY_ID = `query fetchOrderReturnInfo($id:String!){
  order(id:$id){
      id
      version
      orderNumber
      ...lineItems
      ...returnInfo
  }
}

fragment lineItems on Order{
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

fragment returnInfo on Order{
  returnInfo{
        returnTrackingId
        returnDate
        items{
          ... on LineItemReturnItem{
            lineItemId
          }
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
`
export const FETCH_DISCOUNT_CODES = `query{
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
}`
export const CREATE_ORDER_FROM_QUOTE = `mutation createOrderFromQuote($draft:OrderQuoteCommand!){
  createOrderFromQuote(draft:$draft){
    id
  }
}`
export const FETCH_SHIPPING_METHODS = `query fetchShippingMethods{
  shippingMethods{
    results{
      id
      key
      name
    }
  }
}`