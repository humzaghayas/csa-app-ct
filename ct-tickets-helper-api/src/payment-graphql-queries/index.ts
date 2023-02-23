export const FETCH_PAYMENT_BY_ID = `query FetchPaymentById($id:String!){
    payment(id:$id){
       id
          key
          interfaceId
          version
          createdAt
          lastModifiedAt
          paymentStatus{
            interfaceCode
            interfaceText
          }
          customer{
            id
          }
          amountPlanned{
            type
            currencyCode
            centAmount
            fractionDigits
          }
          paymentMethodInfo{
            paymentInterface
            method
            name(locale:"en")
          }
          transactions{
            timestamp
            type
            state
            amount{
              type
              currencyCode
              fractionDigits
              centAmount
            }
        }
    }
  }`