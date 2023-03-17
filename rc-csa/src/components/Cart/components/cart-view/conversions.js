import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (carts, languages) => ({
  id: carts?.id,
  version: carts?.version,
  cartState: carts?.cartState,
  cartNumber: carts?.cartNumber ?? '--',
  //orderNumber: order?.orderNumber,
  cart_ordernumber: carts?.custom?.type?.key ?? '--',
  //cart_ordernumber: getValue(carts?.custom?.customFieldsRaw ?? '--'),
  lineItems: getLineItems(carts?.lineItems),
  totalPrice: amountCalculator(
    carts?.totalPrice?.centAmount,
    carts?.totalPrice?.fractionDigits
  ),
  taxedPrice: {
    totalGross: amountCalculator(
      carts?.taxedPrice?.totalGross?.centAmount,
      carts?.taxedPrice?.totalGross?.fractionDigits
    ),
    totalNet: amountCalculator(
      carts?.taxedPrice?.totalNet?.centAmount,
      carts?.taxedPrice?.totalNet?.fractionDigits
    ),
    totalTax: amountCalculator(
      carts?.taxedPrice?.totalTax?.centAmount,
      carts?.taxedPrice?.totalTax?.fractionDigits
    ),
  },
  totalItems: carts?.lineItems?.length,
});

export function getLineItems(lineItems) {
  if (lineItems) {
    return lineItems.map((lineItem) => {
      return {
        id: lineItem?.id,
        productName: lineItem?.orderNumber,
        productId: lineItem?.productId,
        productKey: lineItem?.productKey,
        quantity: lineItem?.quantity,
        product: {
          name: lineItem?.name,
          sku: lineItem?.variant?.sku,
          key: lineItem?.variant?.key,
          image: lineItem?.variant?.images[0]?.url,
        },
        variant: {
          id: lineItem?.variant?.id,
          sku: lineItem?.variant?.sku,
          key: lineItem?.variant?.key,
          price: getPrices(lineItem?.variant?.prices),
        },
        unitPrice: amountCalculator(
          lineItem?.price?.value?.centAmount,
          lineItem?.price?.value?.fractionDigits
        ),
        state: lineItem?.state,
        tax: lineItem?.taxRate?.amount,
        subTotalPrice: amountCalculator(
          lineItem?.totalPrice?.centAmount,
          lineItem?.totalPrice?.fractionDigits
        ),
        totalPrice: amountCalculator(
          lineItem?.totalPrice?.centAmount,
          lineItem?.totalPrice?.fractionDigits
        ),
      };
    });
  }
}

export function getPrices(prices) {
  if (prices) {
    return prices.map((price) => {
      return {
        id: price?.id,
        currencyCode: price?.value?.currencyCode,
        amount: amountCalculator(
          price?.value?.centAmount,
          price?.value?.fractionDigits
        ),
      };
    });
  }
}

function amountCalculator(centAmount, fractionDigits) {
  centAmount = centAmount / 100;
  centAmount = '$' + centAmount + '.00';
  return centAmount;
}

export const getSearchProductRows = (productProjectionSearchResults) => {
  if (productProjectionSearchResults) {
    const searchProdRows = productProjectionSearchResults?.map((product) => {
      return {
        productId: product.id,
        product: product?.name,
        unitPrice: amountCalculator(
          product?.masterVariant?.price?.value?.centAmount,
          product?.masterVariant?.price?.value?.fractionDigits
        ),
        quantity: 1,
        sku: product?.masterVariant?.sku,
        key: product?.masterVariant?.key,
        variantId: product?.masterVariant?.id,
        slug: product?.slug,
        image: {
          url: product?.masterVariant?.images[0]?.url,
          // dimensions:{
          //   height : product?.masterVariant?.images[0]?dimensions?height,
          //   width : product?.masterVariant?.images[0]?dimensions?width
          // }
        },
      };
    });
    return searchProdRows;
  }
};
// export function getValue(customFieldsRaw) {
//   if (customFieldsRaw) {
//     return customFieldsRaw.map((customFieldsRaw) => {
//       return {
//         value: customFieldsRaw?.value,
//       };
//     });
//   }
// }

export const formValuesToDoc = (formValues) => ({
  id: !TextInput.isEmpty(formValues.id) ? formValues.id : undefined,
  version: !TextInput.isEmpty(formValues.version)
    ? formValues.version
    : undefined,
  customer: !TextInput.isEmpty(formValues.customer)
    ? formValues.customer
    : undefined,
  // createdAt: !TextInput.isEmpty(formValues.createdAt)
  //   ? formValues.createdAt
  //   : undefined,
  // lastModifiedAt: !TextInput.isEmpty(formValues.lastModifiedAt)
  //   ? formValues.lastModifiedAt
  //   : undefined,
  cartState: !TextInput.isEmpty(formValues.cartState)
    ? formValues.cartState
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
