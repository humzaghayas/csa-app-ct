import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (order, languages) => ({
  id:order?.id,
  version:order?.version,
  orderState:order?.orderState,
  paymentState:order?.paymentState,
  shipmentState:order?.shipmentState,
  lineItems:getLineItems(order?.lineItems),
  totalPrice:amountCalculator(order?.totalPrice?.centAmount,order?.totalPrice?.fractionDigits),
  taxedPrice:{
    totalGross:amountCalculator(order?.taxedPrice?.totalGross?.centAmount,order?.taxedPrice?.totalGross?.fractionDigits),
    totalNet:amountCalculator(order?.taxedPrice?.totalNet?.centAmount,order?.taxedPrice?.totalNet?.fractionDigits),
    totalTax:amountCalculator(order?.taxedPrice?.totalTax?.centAmount,order?.taxedPrice?.totalTax?.fractionDigits),
  },
  totalItems:order?.lineItems?.length
});

export function getLineItems(lineItems){
  if(lineItems){
      return lineItems.map(lineItem =>{
          return {
              id:lineItem?.id, 
              productName: lineItem?.orderNumber,
              productId:lineItem?.productId,
              productKey:lineItem?.productKey,
              quantity:lineItem?.quantity,
              product:{
                name:lineItem?.name,
                sku:lineItem?.variant?.sku,
                key:lineItem?.variant?.key,
                image:lineItem?.variant?.images[0]?.url
              },
              variant:{
                id:lineItem?.variant?.id,
                sku:lineItem?.variant?.sku,
                key:lineItem?.variant?.key,
                price:getPrices(lineItem?.variant?.prices),
              },
              unitPrice:amountCalculator(lineItem?.price?.value?.centAmount,lineItem?.price?.value?.fractionDigits),
              state:lineItem?.state,
              tax:lineItem?.taxRate?.amount,
              subTotalPrice:amountCalculator(lineItem?.totalPrice?.centAmount,lineItem?.totalPrice?.fractionDigits),
              totalPrice:amountCalculator(lineItem?.totalPrice?.centAmount,lineItem?.totalPrice?.fractionDigits)
          }
      });
  }
}

export function getPrices(prices){
  if(prices){
    return prices.map(price=>{
      return{
        id:price?.id,
        currencyCode:price?.value?.currencyCode,
        amount:amountCalculator(price?.value?.centAmount,price?.value?.fractionDigits)
      }
    })
  }
}

function amountCalculator(centAmount,fractionDigits){
  centAmount = centAmount/100;
  centAmount = "$"+centAmount+".00";
  return centAmount;
}

export const formValuesToDoc = (formValues) => ({
  id: !TextInput.isEmpty(formValues.id)
  ? formValues.id
  : undefined,
  version: !TextInput.isEmpty(formValues.version)
  ? formValues.version
  : undefined,
  actions:[{
    changeOrderState:{
      orderState: !TextInput.isEmpty(formValues.orderState)
      ? formValues.orderState
      :undefined
    }},
    {changePaymentState: {
      paymentState: !TextInput.isEmpty(formValues.paymentState)
      ? formValues.paymentState
      :undefined
    }},
    {changeShipmentState: {
      shipmentState:!TextInput.isEmpty(formValues.shipmentState)
      ? formValues.shipmentState
      :undefined
    }}
  ]
  });