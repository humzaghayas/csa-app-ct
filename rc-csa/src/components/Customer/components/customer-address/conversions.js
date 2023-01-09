import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (customerAddress, languages) => ({
  streetNumber: customerAddress?.streetNumber ?? '',
  apartment: customerAddress?.apartment ?? '',
  building: customerAddress?.building ?? '',
  city: customerAddress?.city ?? '',
  region: customerAddress?.region ?? '',
  state: customerAddress?.state ?? '',
  country: customerAddress?.country ?? '',
  postalCode: customerAddress?.postalCode ?? '',
});

export const formValuesToDoc = (formValues) => ({
  streetNumber: !TextInput.isEmpty(formValues.streetNumber)
  ? formValues.streetNumber
  : undefined,
  apartment: !TextInput.isEmpty(formValues.apartment)
  ? formValues.apartment
  : undefined,
  building: !TextInput.isEmpty(formValues.building)
  ? formValues.building
  : undefined,
  city: !TextInput.isEmpty(formValues.city)
  ? formValues.city
  : undefined,
  region: !TextInput.isEmpty(formValues.region)
  ? formValues.region
  : undefined,
  state: !TextInput.isEmpty(formValues.state)
  ? formValues.state
  : undefined,
  country: !TextInput.isEmpty(formValues.country)
  ? formValues.country
  : undefined,
  postalCode: !TextInput.isEmpty(formValues.postalCode)
  ? formValues.postalCode
  : undefined,
  });