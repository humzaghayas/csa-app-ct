export const FETCH_TICKETS=`
 query FetchTickets($container:String!,$limit:Int,$offset:Int) {
    customObjects(container: $container,limit:$limit,offset:$offset){
      total
      count
      offset
    results{
      id
      version
      createdAt
      lastModifiedAt
      container
      value
      key
    }
  }
  }
 `

 export const FETCH_TICKETS_BY_ID=`
 query FetchTicketById($id:String) {
    customObject(id: $id){
      id
      version
      createdAt
      lastModifiedAt
      container
      value
      key
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

 export const FETCH_CUSTOMERS=`
 query($limit:Int,$offset:Int){
  customers(limit:$limit,offset:$offset){
    total
    count
    offset
    results{
      email
      id
    }
  }
}
 `