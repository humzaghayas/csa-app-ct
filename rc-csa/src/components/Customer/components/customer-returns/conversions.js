export const docToFormValues = (orderResults) => {
  return orderResults?.filter(order=>order?.returnInfo?.length!=0).map((order)=>{
    if(order?.returnInfo?.length!=0){
      return {
        id:order?.id,
        orderNumber:order?.orderNumber,
        customerEmail:order?.customerEmail,
        shipmentState:order?.shipmentState,
        createdAt:order?.createdAt,
        orderState:order?.orderState,
        returnInfo:getOrderReturnInfo(order?.returnInfo)
      }
    }
  })
};

const getOrderReturnInfo = (returnInfo) =>{
  return returnInfo?.map((returnItem=>{
      return{
          returnTrackingId:returnItem?.returnTrackingId,
          returnDate:returnItem?.returnDate,
          lineItemsCount: returnItem?.items?.length
      }
  })
  )
}

const getReturnLineItems = (lineItems)=>{
  return lineItems?.map((lineItem=>{
      return{
          type:lineItem?.type,
          id:lineItem?.id,
          quantity:lineItem?.quantity,
          comment:lineItem?.comment,
          shipmentState:lineItem?.shipmentState,
          paymentState:lineItem?.paymentState,
          lastModifiedAt:lineItem?.lastModifiedAt,
          createdAt:lineItem?.createdAt
      }
  }))
}


export const getOrdersReturnInfo = (orderResults) => {
  return orderResults?.filter(order=>order?.returnInfo?.length!=0).map((order)=>{
    if(order?.returnInfo?.length!=0){
      return {
        id:order?.id,
        orderNumber:order?.orderNumber,
        customerEmail:order?.customerEmail,
        shipmentState:order?.shipmentState,
        createdAt:order?.createdAt,
        orderState:order?.orderState,
        ...getOrderReturnInfo(order?.returnInfo)
      }
    }
  })
};