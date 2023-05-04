export const PRODUCT_SEARCH_QUERY = `query productSearchQuery($locale:Locale!,$text:String!){
    productProjectionSearch(locale:$locale,text:$text){
      results{
        id
        name(locale:$locale)
        masterVariant{
          sku
          id
          key
          images{
            url
            dimensions{
              height
              width
            }
          }
          price(currency:"USD"){
            id
            value{
              centAmount
              currencyCode
              fractionDigits
            }
          }
        }
        variants{
          sku
          id
          price(currency:"USD"){
            value{
              currencyCode
              centAmount
              fractionDigits
            }
          }
          images{
            url
          }
        }
        slug(locale:$locale)
      }
    }
  }`;
export const FETCH_PRODUCT_LIST = `query productsList($limit: Int!, $offset: Int!, $sort: [String!]){
  products(limit:$limit,offset:$offset,sort:$sort){
    count
    total
    results{
      id
      key
      skus
      version
      productType{
        key
        name
      }
      createdAt
      lastModifiedAt
      masterData{
        published
        hasStagedChanges
        current{
          name(locale:"en-US")
          masterVariant{
            id
            sku
            key
            images{
              url
            }
            prices{
              id
              value{
                type
                centAmount
                currencyCode
                fractionDigits
              }
            }
          }
        }
      }
    }
  }
}`;

export const FETCH_PRODUCT_BY_ID = `query($id:String!){
  product(id:$id){
        id
        version
        key
        createdAt
        lastModifiedAt
        productType{
            key
            name
        }
        taxCategory{
          id
          name
        }
        priceMode
     masterData{
        current{
          name(locale:"en-US")
          description(locale:"en-US")
          categories{
            id
            name(locale:"en-US")
          }
           allVariants{
            id
            sku
            key
            availability{
              noChannel{
                availableQuantity
              }
            }
            images{
              url
            }
            prices
              {
              id
              value{
                type
                centAmount
                currencyCode
                fractionDigits
              }
            }
          }
          masterVariant{
            id
            sku
            key
            images{
              url
            }
            prices
              {
              id
              value{
                type
                centAmount
                currencyCode
                fractionDigits
              }
            }
          }
        }
      }
     
  }
}
`
