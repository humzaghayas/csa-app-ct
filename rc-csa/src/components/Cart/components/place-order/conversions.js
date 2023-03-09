import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';
import CartAccount from '../cart-account/cart-account';

export const docToFormValues = (carts, order, languages) => ({
  id: carts?.id,
  cartState: carts?.cartState,
  orderNumber: order?.orderNumber,
  orderId: carts?.orderId,
  customerEmail:carts?.customerEmail,
  lineItems: getLineItems(carts?.lineItems),
  //totalPrice:amountCalculator(carts?.totalPrice?.centAmount,carts?.totalPrice?.fractionDigits),
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

// export const docToFormValues = (carts, languages) => ({
//   id: carts?.id,
//   cartState: carts?.cartState,
// })

export const formValuesToDoc = (formValues) => ({
  id: !TextInput.isEmpty(formValues.id) ? formValues.id : undefined,
  version: !TextInput.isEmpty(formValues.version)
    ? formValues.version
    : undefined,
  customer: !TextInput.isEmpty(formValues.customer)
    ? formValues.customer
    : undefined,
  orderId: !TextInput.isEmpty(formValues.orderId)
    ? formValues.orderId
    : undefined,
  customerEmail: !TextInput.isEmpty(formValues.customerEmail)
    ? formValues.customerEmail
    : undefined,
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
