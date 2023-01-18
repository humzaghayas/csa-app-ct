export const FETCH_ORDERS = `query FetchAllOrders($limit: Int!, $offset: Int!, $sort: [String!]){
    orders(limit: $limit, offset: $offset, sort: $sort){
      total
      count
      offset
      results{
        id
        orderState
        orderNumber
        paymentState
        shipmentState
        customer{
            firstName
            lastName
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
  }`
export const FETCH_ORDER_BY_ORDER_NUMBER = `query($orderNumber:String!){
  order(orderNumber:$orderNumber){
      id
      createdAt
      lastModifiedAt
      customerId
      customerEmail
      country
      orderState
      paymentState
      origin
      ...shippingInfo
      ...shippingAddress
      ...billingAddress
      ...lineItems
      ...cart
      ...paymentInfo
      ...totalPrice
      ...taxedPrice
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
fragment cart on Order{
  cart{
      id        
  }
}
fragment paymentInfo on Order{
  paymentInfo{
      payments{
          id
      }
  }
}
fragment billingAddress on Order{
  billingAddress{
      id
      streetName
      streetNumber
      postalCode
      country
  }
}
fragment state on LineItem{
  state{
      quantity
      state{
          id
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
          __typename
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
}`
export const FETCH_ORDER_BY_ID = `query($id:String!){
    order(id:$id){
        id
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
  }`