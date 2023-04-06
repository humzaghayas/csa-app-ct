import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';


export function getProductItemsRows(customersWishlistResult) {
  console.log(customersWishlistResult);
  if (customersWishlistResult) {
    return customersWishlistResult.map((item) => {
      return {
        id: item?.custom?.fields?.wishlistName??'--',
        key: item?.key??'--',
        //lineItems: getLineItems(item?.lineItems),
        productName: item?.lineItems[0]?.name,
        productType:item?.lineItems[0]?.productType?.name,
        productKey:item?.lineItems[0]?.variant?.key,
        price:amountCalculator(
          item?.lineItems[0]?.variant?.price?.value?.centAmount,
          item?.lineItems[0]?.variant?.price?.value?.fractionDigits),
        createdAt: item?.createdAt,
        lastModifiedAt: item?.lastModifiedAt,
      };
    });
  }
}
export function getLineItems(lineItems) {
  console.log(lineItems);
  if (lineItems) {
    return lineItems.map((lineItem) => {
      return {
        id: lineItem?.id,
        productName: lineItem?.name,
        productId: lineItem?.productId,
        productKey: lineItem?.productKey,
        quantity: lineItem?.quantity,
        productType: lineItem?.productType?.name,
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
        unitPrice: amountCalculator(
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

export const docToFormValues = (employee, languages) => ({
  id: employee?.id ?? '',
  salutation: employee?.salutation ?? '',
  title: employee?.title ?? '',
  firstName: employee?.firstName ?? '',
  middleName: employee?.middleName ?? '',
  lastName: employee?.lastName ?? '',
  email: employee?.email ?? '',
  dateOfBirth: employee?.dateOfBirth ?? '',
  employeeNumber: employee?.employeeNumber ?? '',
  externalId: employee?.externalId ?? '',
  customerGroup: employee?.customerGroup ?? '',
  roles: employee?.roles ?? '',
  password: employee?.password ?? '',
  confirmedPassword: employee?.confirmedPassword ?? '',
});


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