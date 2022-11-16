export const FETCH_TICKETS=`
 query FetchClaims($container:String!,$limit:Int,$offset:Int) {
    customObjects(container: $container,limit:$limit,offset:$offset){
      total
      count
      offset
    results{
      container
      value
      key
    }
  }
  }
 `

 export const CREATE_TICKET_MUTATION=`
 mutation CreateClaimObject($draft:CustomObjectDraft!){
  createOrUpdateCustomObject(draft:$draft){
    container
    value
  }
}
 `