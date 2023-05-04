module.exports.FETCH_ORDER_BY_ID = `query ($id:String){
  order(id:$id){
    lineItems{
      variant{
        sku
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
      version
      lineItems{
        variant{
          sku
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