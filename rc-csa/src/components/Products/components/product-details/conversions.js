import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (product, languages) => ({
  id: product?.id,
  version: product?.version,
  key: product?.key,
  productName: product?.masterData?.current?.name,
  description: product?.masterData?.current?.description?? '--',
  category: product?.masterData?.current?.categories[0]?.name?? '--',
  taxCategory: product?.taxCategory?.name,
  priceMode:product?.priceMode?? '--',
  allVariants: getAllVariants(product?.masterData?.current?.allVariants),
  
  //prices: getPrices(product?.masterData?.current?.masterVariant?.prices)
  // sku: product?.masterData?.current?.allVariants?.sku,
  // productKey: product?.masterData?.current?.allVariants?.key,
  // unitPrice: amountCalculator(
  //         product?.masterData?.current?.allVariants?.prices?.value?.centAmount,
  //         product?.masterData?.current?.allVariants?.prices?.value?.fractionDigits
  //       ),
  // image: product?.masterData?.current?.allVariants?.images?.url,
  
  //masterVariant: getMasterVariant(product?.masterData?.current?.masterVariant)
  
});

export function getAllVariants(allVariants){
  if(allVariants){
      return allVariants.map(allVariant =>{
          return {
             variantId:allVariant?.id,
             sku: allVariant?.sku,
             key: allVariant?.key,
             prices: getPrices(allVariant?.prices),
        //      unitPrice:  amountCalculator(
        //   allVariant?.price?.value?.centAmount,
        //   allVariant?.price?.value?.fractionDigits
        // ),
            // unitPrice: allVariant?.price?.value?.centAmount,
             images:allVariant?.images[0]?.url,
             quantity: allVariant?.quantity?? '--',
             attributes: allVariant?.attributesRaw?.value?.count,

          }
      });
  }
}
export function getPrices(prices){
  if(prices){
      return prices.map(pricee =>{
          return {
          id: pricee?.id,
          currencyCode: pricee?.value?.currencyCode,   
          type:pricee?.value?.type,
             unitPrice: amountCalculator(
          pricee?.value?.centAmount,
          pricee?.value?.fractionDigits
        ),
             
          }
      });
  }
}


function amountCalculator(centAmount, fractionDigits) {
  centAmount = centAmount / 100;
  centAmount = '$' + centAmount + '.00';
  return centAmount;
}



export const formValuesToDoc = (formValues) => ({
  id: !TextInput.isEmpty(formValues.id) ? formValues.id : undefined,
  version: !TextInput.isEmpty(formValues.version)
    ? formValues.version
    : undefined,
  productName: !TextInput.isEmpty(formValues.productName)
    ? formValues.productName
    : undefined,
  createdAt: !TextInput.isEmpty(formValues.createdAt)
    ? formValues.createdAt
    : undefined,
  lastModifiedAt: !TextInput.isEmpty(formValues.lastModifiedAt)
    ? formValues.lastModifiedAt
    : undefined,
  variantId: !TextInput.isEmpty(formValues.variantId)
    ? formValues.variantId
    : undefined,
  totalPrice: !TextInput.isEmpty(formValues.totalPrice)
    ? formValues.totalPrice
    : undefined,
  noOforderItems: !TextInput.isEmpty(formValues.noOforderItems)
    ? formValues.noOforderItems
    : undefined,
  totalItems: !TextInput.isEmpty(formValues.totalItems)
    ? formValues.totalItems
    : undefined,
});
