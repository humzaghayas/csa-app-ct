import MoneyField from '@commercetools-uikit/money-field';
import { func } from 'prop-types';

export function getOrderRows(orderPaginationResult){
    console.log(orderPaginationResult.results);
    if(orderPaginationResult?.results){
        return orderPaginationResult?.results.map(order =>{
            return {
                id:order?.id, 
                orderNumber: order?.orderNumber,
                customer: fullName(order?.customer?.firstName,order?.customer?.lastName),
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

function fullName(firstName, lastName){
    const f1 = firstName?firstName:"";
    const f2 = lastName?lastName:"";
    return f1+" "+f2;
}