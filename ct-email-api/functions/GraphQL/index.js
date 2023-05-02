module.exports.FETCH_CART_BY_ID = `query($id:String!,$locale:Locale!){
  cart(id:$id){
    id
    key
    lineItems{

      name(locale:$locale)
      quantity
      price{
        value{
          currencyCode
          centAmount
        }
      }
      
      taxedPrice{
        totalNet{
          currencyCode
          centAmount
        }
      }
    }
    taxedPrice{
      totalNet{
        currencyCode
        centAmount
      }
    }
  }
}`
