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

 export const FETCH_USERS_INFO=`
 query FetchUsers($container:String!,$where:String) {
    customObjects(container: $container,where:$where){
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
 query Test($where:String){
  customers(where:$where){
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