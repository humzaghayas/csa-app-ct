export const PRODUCT_PROJECTION_SEARCH = `query PRODUCT_PROJECTION_SEARCH($locale:Locale,
  $text:String,$fuzzy:Boolean,$fuzzyLevel:Int,
    $facets:[SearchFacetInput!],$currency:Currency!,$queryFilters:[SearchFilterInput!]){
  productProjectionSearch(locale:$locale,
    text:$text,fuzzy:$fuzzy,fuzzyLevel:$fuzzyLevel,
    facets:$facets,queryFilters:$queryFilters){
    offset
    count
      total
    results{
      id
      key
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