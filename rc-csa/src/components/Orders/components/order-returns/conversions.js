export const docToFormValues = (order, languages) => ({
    id:order?.id,
    version:order?.version,
    orderNumber:order?.orderNumber,
    returnInfo:getOrderReturnInfo(order?.returnInfo),
    lineItem:getLineItems(order?.lineItems,order?.returnInfo)
  });

  const getOrderReturnInfo = (returnInfo) =>{
    return returnInfo?.map((returnItem=>{
        return{
            returnTrackingId:returnItem?.returnTrackingId,
            returnDate:returnItem?.returnDate,
            items: getReturnLineItems(returnItem?.items)
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

  export function getLineItems(lineItems,returnInfoItems){
    console.log("Return info items",returnInfoItems);
    if(lineItems){
        return lineItems.map(lineItem =>{
            return {
                id:lineItem?.id, 
                productName: lineItem?.orderNumber,
                productId:lineItem?.productId,
                productKey:lineItem?.productKey,
                quantity:lineItem?.quantity,
                isEditQuantity:false,
                product:{
                  name:lineItem?.name,
                  sku:lineItem?.variant?.sku,
                  key:lineItem?.variant?.key,
                  image:lineItem?.variant?.images[0]?.url
                },
                orderdQuantity:lineItem?.quantity,
                quantityInPreviousReturns:0,
                returnQuantity:0,
                comment:" "
            }
        });
    }
  }

const getReturnItemsQuantity = (lineItemId,returnInfoItems) =>{
  const l = returnInfoItems?.filter(i=>i.items?.filter(e=>e.id==lineItemId));
  let quantity = 0;

  returnInfoItems?.forEach(element => {
    element?.items?.forEach(e=>{
      console.log("line Item Id",lineItemId+" item id",e.id);
      console.log("Element items",lineItemId==e.id);
    })
  });
  console.log(quantity);
  return quantity;
}