module.exports.FETCH_ORDER_BY_ID = `query ($id:String){
  order(id:$id){
    id
    version
    lineItems{
      id
      variant{
        sku
      }
      custom{
        customFieldsRaw{
          name
          value
        }
      }
      quantity
      price{
        value{
          centAmount
        }
        discounted{
          value{
            centAmount
          }
        }
      }
      taxedPrice{
        totalNet{
          centAmount
          currencyCode
        }
      }
    }
    paymentInfo{
      payments{
        interfaceId
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
}`



module.exports.FETCH_CUSTOMER_BY_ID = `query FetchCustomer($id:String){
    customer(id:$id){
      id
      email
    }
  }`

  module.exports.FETCH_CART_BY_ID = `query ($id:String!){
    cart(id:$id){
      id
      version
      lineItems{
        id
        variant{
          sku
        }
        custom{
          customFieldsRaw{
            name
            value
          }
        }
        quantity
        price{
          value{
            centAmount
          }
          discounted{
            value{
              centAmount
            }
          }
        }
        taxedPrice{
          totalNet{
            centAmount
            currencyCode
          }
        }
      }

      paymentInfo{
        payments{
          interfaceId
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
  }`


  module.exports.CREATE_PAYMENT = `mutation ($draft:PaymentDraft!){
    createPayment(draft:$draft){
      key
      id
    }
  }`

  module.exports.ADD_PAYMENT_TO_CART = `mutation ($id:String,$version:Long!,
    $actions:[CartUpdateAction!]!){
      updateCart(id:$id,version:$version,
      actions:$actions){
        key
        id
      }
  }`


  module.exports.ADD_PAYMENT_TO_ORDER = `mutation ($id:String,$version:Long!,
    $actions:[OrderUpdateAction!]!){
      updateOrder(id:$id,version:$version,
      actions:$actions){
        
        id
      }
  }`