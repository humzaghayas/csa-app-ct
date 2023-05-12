import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const BillingInfo = (
  //carts,
  billingAddress,
  // shippingAddress,
  languages
) => ({
  streetNumber: billingAddress?.streetNumber,
  streetName: billingAddress?.streetName,
  postalCode: billingAddress?.postalCode,
  country: billingAddress?.country,
  city: billingAddress?.city,
  state: billingAddress?.state,
  building: billingAddress?.building,
  id: billingAddress?.id,
  additionalStreetInfo: billingAddress?.additionalStreetInfo,
  additionalAddressInfo: billingAddress?.additionalAddressInfo,
  region: billingAddress?.region,
  apartment: billingAddress?.apartment,
  pOBox: billingAddress?.pOBox,
  phone: billingAddress?.phone,
  mobile: billingAddress?.mobile,
  //discountCodes: getDiscountCodes(carts?.discountCodes),
});

export const docToFormValues = (
  //carts,
  // billingAddress,
  shippingAddress,
  languages
) => ({
  shippingMethodName: shippingAddress?.shippingMethodName ?? '--',
  streetNumber: shippingAddress?.streetNumber,
  streetName: shippingAddress?.streetName,
  postalCode: shippingAddress?.postalCode,
  country: shippingAddress?.country,
  city: shippingAddress?.city,
  state: shippingAddress?.state,
  building: shippingAddress?.building,
  id: shippingAddress?.id,
  additionalStreetInfo: shippingAddress?.additionalStreetInfo,
  additionalAddressInfo: shippingAddress?.additionalAddressInfo,
  region: shippingAddress?.region,
  apartment: shippingAddress?.apartment,
  pOBox: shippingAddress?.pOBox,
  phone: shippingAddress?.phone,
  mobile: shippingAddress?.mobile,
});

export const formValuesToDoc = (formValues, carts) => ({
  cartId: formValues?.id,
  version: formValues?.version,
  actions: [
    {
      setShippingAddress: {
        address: {
          id: formValues?.id,
          streetNumber: formValues?.streetNumber,
          streetName: formValues?.streetName,
          postalCode: formValues?.postalCode,
          country: formValues?.country,
          city: formValues?.city,
          state: formValues?.state,
          building: formValues?.building,
          additionalStreetInfo: formValues?.additionalStreetInfo,
          additionalAddressInfo: formValues?.additionalAddressInfo,
          region: formValues?.region,
          apartment: formValues?.apartment,
          pOBox: formValues?.pOBox,
          phone: formValues?.phone,
          mobile: formValues?.mobile,
        },
      },
    },
  ],
});
export const updateBilling = (formValues, carts) => ({
  cartId: formValues?.id,
  version: formValues?.version,
  actions: [
    {
      setBillingAddress: {
        address: {
          id: formValues?.id,
          streetNumber: formValues?.streetNumber,
          streetName: formValues?.streetName,
          postalCode: formValues?.postalCode,
          country: formValues?.country,
          city: formValues?.city,
          state: formValues?.state,
          building: formValues?.building,
          additionalStreetInfo: formValues?.additionalStreetInfo,
          additionalAddressInfo: formValues?.additionalAddressInfo,
          region: formValues?.region,
          apartment: formValues?.apartment,
          pOBox: formValues?.pOBox,
          phone: formValues?.phone,
          mobile: formValues?.mobile,
        },
      },
    },
  ],
});
// {
//   cartId: formValues?.id,
//   version: formValues?.version,
//   actions: [
//     {
//       setBillingAddress: {
//         address: {
//           streetNumber: formValues?.streetNumber,
//           streetName: formValues?.streetName,
//           postalCode: formValues?.postalCode,
//           country: formValues?.country,
//           city: formValues?.city,
//           state: formValues?.state,
//           building: formValues?.building,
//           additionalStreetInfo: formValues?.additionalStreetInfo,
//           additionalAddressInfo: formValues?.additionalAddressInfo,
//           region: formValues?.region,
//           apartment: formValues?.apartment,
//           pOBox: formValues?.pOBox,
//           phone: formValues?.phone,
//           mobile: formValues?.mobile,
//         },
//       },
//     },
//   ],
// }
