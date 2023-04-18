import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (shippingAddress, languages) => ({
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

export const formValuesToDoc = (formValues) => ({
  cartId: formValues?.id,
  version: formValues?.version,
  actions: [
    {
      setShippingAddress: {
        address: {
          streetNumber: formValues?.streetNumber,
          streetName: formValues?.streetName,
          postalCode: formValues?.postalCode,
          country: formValues?.country,
          city: formValues?.city,
          state: "",//formValues?.state,
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
