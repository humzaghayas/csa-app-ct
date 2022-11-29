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
 query FetchUsers($container:String!,$key:String) {
    customObject(container: $container,key:$key){
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

 export const FETCH_USERS_LIST=`
 query FetchUsers($container:String!) {
    customObjects(container: $container){
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

 export const CREATE_CUSTOMOBJECT_MUTATION=`
 mutation CreateCustomObject($draft:CustomObjectDraft!){
  createOrUpdateCustomObject(draft:$draft){
    container
    key
    value
  }
}
 `

 export const FETCH_CUSTOMERS=`
 query FetchCustomer($where:String){
  customers(where:$where){
    total
    count
    offset
    results{
      email
      id
      firstName
      lastName
      middleName
      salutation
      title
      dateOfBirth
      companyName
    }
  }
}
 `