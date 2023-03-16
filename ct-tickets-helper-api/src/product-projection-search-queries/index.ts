export const PRODUCT_PROJECTION_SEARCH = `query PRODUCT_PROJECTION_SEARCH($locale:Locale,
  $text:String,$fuzzy:Boolean,$fuzzyLevel:Int,
    $facets:[SearchFacetInput!],$currency:Currency!){
  productProjectionSearch(locale:$locale,
    text:$text,fuzzy:$fuzzy,fuzzyLevel:$fuzzyLevel,
    facets:$facets){
    offset
    count
      total
    results{
      key,
      name(locale:$locale)
      variants{
        sku
       price(currency:$currency){
          value{
            centAmount
            currencyCode
            fractionDigits
          }
        }
      }
      
      productType{
        name
      }
      
      masterVariant{
        sku
        
        price(currency:$currency){
          value{
            centAmount
            currencyCode
            fractionDigits
          }
        }
      }
      
      createdAt
      lastModifiedAt
    }
    facets{
      facet
      value{
        type
        ... on TermsFacetResult{
          dataType
          type
          total
          other
          terms{
            term
            count
          }
        }
      }
    }
  }
}`;