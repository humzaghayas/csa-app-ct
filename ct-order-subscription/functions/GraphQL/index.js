module.exports.FETCH_ORDER_BY_ID = `query FetchOrder($id:String){
    order(id:$id){
      id
      customerId
      customerEmail
      orderNumber
    }
  }`



module.exports.FETCH_CUSTOMER_BY_ID = `query FetchCustomer($id:String){
    customer(id:$id){
      id
      email
    }
  }`