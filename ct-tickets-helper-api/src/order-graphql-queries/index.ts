export const FETCH_ORDERS = `query FetchAllOrders($limit: Int!, $offset: Int!, $sort: [String!]){
    orders(limit: $limit, offset: $offset, sort: $sort){
      total
      count
      offset
      results{
        id
        orderState
        orderNumber
        customer{
            firstName
            lastName
        }
        customerEmail
        createdAt
        lastModifiedAt
        orderState
        shippingInfo{
            shippingMethodName
            shippingMethodState
        }    
      }
    }
  } `