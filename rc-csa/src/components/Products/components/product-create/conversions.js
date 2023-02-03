import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (order, languages) => ({
  id:order?.id,
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


/*export const formValuesToDoc = (formValues) => ({
  salutation: formValues.salutation,
  title: formValues.title,
  firstName: formValues.firstName,
  middleName: formValues.middleName,
  lastName: formValues.lastName,
  email: formValues.email,
  dateOfBirth: formValues.dateOfBirth,
  employeeNumber: formValues.employeeNumber,
  externalId: formValues.externalId,
  customerGroup:{key:formValues.customerGroup} ,
  roles: formValues.roles,
  password: formValues.password,
});*/
export const formValuesToDoc = (formValues) => ({
  salutation: !TextInput.isEmpty(formValues.salutation)
  ? formValues.salutation
  : undefined,
  title: !TextInput.isEmpty(formValues.title)
  ? formValues.title
  : undefined,
  firstName: !TextInput.isEmpty(formValues.firstName)
  ? formValues.firstName
  : undefined,
  middleName: !TextInput.isEmpty(formValues.middleName)
  ? formValues.middleName
  : undefined,
  lastName: !TextInput.isEmpty(formValues.lastName)
  ? formValues.lastName
  : undefined,
  email: formValues.email,
  dateOfBirth: !TextInput.isEmpty(formValues.dateOfBirth)
  ? formValues.dateOfBirth
  : undefined,
  employeeNumber: !TextInput.isEmpty(formValues.employeeNumber)
  ? formValues.employeeNumber
  : undefined,
  externalId: !TextInput.isEmpty(formValues.externalId)
  ? formValues.externalId
  : undefined,
  customerGroup:{key:formValues.customerGroup} ,
  roles: formValues.roles,
  password: formValues.password,
  confirmedPassword: undefined,
  });