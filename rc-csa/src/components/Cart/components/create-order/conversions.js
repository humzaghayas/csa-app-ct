import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (cart, languages) => ({
  id: cart?.id,
  version: cart?.version,
  quantity: cart?.lineItems
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0),
  streetNumber: cart?.shippingAddress?.streetNumber,
  streetName: cart?.shippingAddress?.streetName,
  postalCode: cart?.shippingAddress?.postalCode,
  country: cart?.shippingAddress?.country,
  city: cart?.shippingAddress?.city,
  state: cart?.shippingAddress?.state,
  building: cart?.shippingAddress?.building,
  shippingMethodName: cart?.shippingInfo?.shippingMethodName ?? '--',
});

export const formValuesToDoc = (formValues) => ({
  cartId: formValues?.id,
  version: formValues?.version,
  actions: [
    {
      setShippingAddress: {
        address: {
          country: formValues?.country,
          streetName: formValues?.streetName,
          streetNumber: formValues?.streetNumber,
          postalCode: formValues?.postalCode,
          city: formValues?.city,
          region: formValues?.region,
          state: formValues?.state,
          building: formValues?.building,
        },
      },
    },
  ],
});
