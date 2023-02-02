import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (order, languages) => ({
  id:order?.id,
  quantity:order?.lineItems.map(item => item.quantity).reduce((a,b)=>a+b,0),
  streetNumber:order?.shippingAddress?.streetNumber,
  streetName:order?.shippingAddress?.streetName,
  postalCode:order?.shippingAddress?.postalCode,
  country:order?.shippingAddress?.country,
  city:order?.shippingAddress?.city,
  state:order?.shippingAddress?.state,
  building:order?.shippingAddress?.building
});

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