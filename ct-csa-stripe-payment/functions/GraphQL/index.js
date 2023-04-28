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