import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (employee, languages) => ({
  id: employee?.id ?? '',
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
});
