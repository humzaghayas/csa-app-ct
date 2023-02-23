import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';
import { CART_STATE } from './constants';

export const docToFormValues = (employee, languages) => ({
  id: employee?.id ?? '',
  salutation: employee?.salutation ?? '',
  // cartState: 'Day',
  // cartState: CART_STATE,
  // cartState: employee?.country ?? '',
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
    : '--',
  title: !TextInput.isEmpty(formValues.title) ? formValues.title : '--',
  firstName: !TextInput.isEmpty(formValues.firstName)
    ? formValues.firstName
    : '--',
  cartState: !TextInput.isEmpty(formValues.country) ? formValues.country : '--',
  middleName: !TextInput.isEmpty(formValues.middleName)
    ? formValues.middleName
    : '--',
  lastName: !TextInput.isEmpty(formValues.lastName)
    ? formValues.lastName
    : '--',
  email: formValues.email,
  dateOfBirth: !TextInput.isEmpty(formValues.dateOfBirth)
    ? formValues.dateOfBirth
    : '--',
  employeeNumber: !TextInput.isEmpty(formValues.employeeNumber)
    ? formValues.employeeNumber
    : '--',
  externalId: !TextInput.isEmpty(formValues.externalId)
    ? formValues.externalId
    : '--',
  customerGroup: { key: formValues.customerGroup },
  roles: formValues.roles,
  password: formValues.password,
  confirmedPassword: '--',
});
