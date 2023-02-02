import MoneyField from '@commercetools-uikit/money-field';

export function getOrderRows(orderPaginationResult){
    console.log(orderPaginationResult.results);
    if(orderPaginationResult?.results){
        return orderPaginationResult?.results.map(order =>{
            return {
                id:order?.id, 
                orderNumber: order?.orderNumber,
                customer: order?.customer?.firstName+" "+order?.customer?.lastName,
                createdAt: order?.createdAt,
                lastModifiedAt:order?.lastModifiedAt,
                orderState:order?.orderState,
                shipmentStatus:order?.shipmentState,
                paymentStatus:order?.paymentState,
                shippingMethodName:order?.shippingInfo?.shippingMethodName,
                totalPrice:amountCalculator(order?.totalPrice?.centAmount,order?.totalPrice?.fractionDigits),
                noOforderItems:order?.lineItems?.length,
                totalItems:order?.lineItems.map(item => item.quantity).reduce((a,b)=>a+b,0),
            }
        });
    }
}

function amountCalculator(centAmount,fractionDigits){
  centAmount = centAmount/100;
  centAmount = "$"+centAmount+".00";
  return centAmount;
}