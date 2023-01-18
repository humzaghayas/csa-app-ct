import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (customer, languages) => ({
  id: customer?.id ?? '',
  tokenValue: customer?.tokenValue ?? '',
  password: customer?.newPassword ?? '',
  confirmedPassword: customer?.confirmedPassword ?? '',
  email: customer?.email ?? undefined,
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
  tokenValue: !TextInput.isEmpty(formValues.tokenValue)
    ? formValues.tokenValue
    : undefined,

  password: !TextInput.isEmpty(formValues.password)
    ? formValues.newPassword
    : undefined,
  // password: formValues.password,
  confirmedPassword: undefined,
  email: !TextInput.isEmpty(formValues.email) ? formValues.email : undefined,
  id: !TextInput.isEmpty(formValues.id) ? formValues.id : undefined,
});
