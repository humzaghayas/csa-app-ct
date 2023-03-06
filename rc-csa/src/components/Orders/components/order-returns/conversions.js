import { func } from "prop-types";

export const docToFormValues = (order, languages) => ({
    id:order?.id,
    version:order?.version,
    orderNumber:order?.orderNumber,
    returnInfo:getOrderReturnInfo(order?.returnInfo,order?.lineItems),
    lineItem:getLineItems(order?.lineItems,order?.returnInfo)
  });

  const getOrderReturnInfo = (returnInfo,lineItems) =>{
    return returnInfo?.map((returnItem=>{
        return{
            returnTrackingId:returnItem?.returnTrackingId,
            returnDate:returnItem?.returnDate,
            items: getReturnLineItems(returnItem?.items,lineItems)
        }
    })
    )
  }

  const getReturnLineItems = (lineItems,orderLineItems)=>{
    return lineItems?.map((lineItem=>{
        return{
            type:lineItem?.type,
            id:lineItem?.id,
            quantity:lineItem?.quantity,
            comment:lineItem?.comment,
            shipmentState:lineItem?.shipmentState,
            paymentState:lineItem?.paymentState,
            lastModifiedAt:lineItem?.lastModifiedAt,
            createdAt:lineItem?.createdAt,
            lineItemId:lineItem?.lineItemId,
            lineItemDetails: getActualLineItemsDetails(lineItem?.lineItemId,orderLineItems)
        }
    }))
  }

  function getActualLineItemsDetails(lineItemId,lineItems){
    const lineItem = lineItems?.filter(item=>item.id==lineItemId)[0];
    console.log(lineItem)
    return {
        name:lineItem?.name,
        image:lineItem?.variant?.images[0],
        sku:lineItem?.variant?.sku,
        key:lineItem?.productKey
    }
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
                quantityInPreviousReturns:getReturnItemsQuantity(lineItem?.id,returnInfoItems),
                returnQuantity:0,
                comment:" "
            }
        });
    }
  }

const getReturnItemsQuantity = (lineItemId,returnInfoItems) =>{
  let quantity = 0;
  returnInfoItems?.forEach(e=>{
    e?.items?.forEach(e2=>{
      if(e2?.lineItemId == lineItemId){
        quantity = quantity +e2?.quantity
      }
    });
  });
  return quantity;
}