import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (employee, languages) => ({
  id: employee?.id ?? '',
  tokenValue: employee?.tokenValue ?? '',
  email: employee?.email ?? '',
  password: employee?.password ?? '',
  confirmedPassword: employee?.confirmedPassword ?? '',
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
  id: !TextInput.isEmpty(formValues.id) ? formValues.id : undefined,
  tokenValue: !TextInput.isEmpty(formValues.tokenValue)
    ? formValues.tokenValue
    : undefined,
  email: !TextInput.isEmpty(formValues.email) ? formValues.email : undefined,
  password: !TextInput.isEmpty(formValues.password)
    ? formValues.password
    : undefined,
  // password: formValues.password,
  confirmedPassword: undefined,
});
