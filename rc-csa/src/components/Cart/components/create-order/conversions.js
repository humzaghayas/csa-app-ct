import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';
import CartAccount from '../cart-account/cart-account';

export const docToFormValues = (employee, languages) => ({
    id: employee?.id ?? '',
    //version:cart.version ??'',
    streetNumber: employee?.streetNumber ?? '',
    streetName: employee?.streetName ?? '',
    apartment: employee?.apartment ?? '',
    building: employee?.building ?? '',
    pobox: employee?.pobox ?? '',
    city: employee?.city ?? '',
    postalCode: employee?.postalCode ?? '',
    region: employee?.region ?? '',
    state: employee?.state ?? '',
    country: employee?.country ?? '',
    streetInfo: employee?.streetInfo ?? '',
    addressInfo: employee?.addressInfo ?? '',
  
});


export const formValuesToDoc = (formValues) => ({
    streetNumber: !TextInput.isEmpty(formValues.streetNumber)
    ? formValues.streetNumber
    : undefined,
    version: !TextInput.isEmpty(formValues.version)
    ? formValues.version
    : undefined,
    streetName: !TextInput.isEmpty(formValues.streetName)
    ? formValues.streetName
    : undefined,
    apartment: !TextInput.isEmpty(formValues.apartment)
    ? formValues.apartment
    : undefined,
    building: !TextInput.isEmpty(formValues.building)
    ? formValues.building
    : undefined,
    pobox: !TextInput.isEmpty(formValues.pobox)
    ? formValues.pobox
    : undefined,
    city: !TextInput.isEmpty(formValues.city)
    ? formValues.city
    : undefined,
    postalCode: !TextInput.isEmpty(formValues.postalCode)
    ? formValues.postalCode
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
    streetInfo: !TextInput.isEmpty(formValues.streetInfo)
    ? formValues.streetInfo
    : undefined,
    addressInfo: !TextInput.isEmpty(formValues.addressInfo)
    ? formValues.addressInfo
    : undefined,
  
  });