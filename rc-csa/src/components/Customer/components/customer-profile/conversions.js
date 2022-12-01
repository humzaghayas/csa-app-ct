import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (customer,customeCustomerFields, languages) => ({
  firstName: customer?.firstName ?? '',
  middleName: customer?.middleName ?? '',
  lastName: customer?.lastName ?? '',
  //email: customer?.email ?? '',
  dateOfBirth: customer?.dateOfBirth ?? '',
  customerNumber: customer?.customerNumber ?? '',
  customerGroup:customer?.customerGroup?.name ?? '',
  companyName:customer?.companyName ?? '',
  externalId: customer?.externalId ?? '',
  occupation:customeCustomerFields?.occupation ?? '',
  preferredLanguage:customeCustomerFields?.preferredLanguage[0] ?? '',
  ageGroup:customeCustomerFields?.ageGroup[0] ?? '',
  gender:customeCustomerFields?.gender[0] ?? '',
  preferredCurrency:customeCustomerFields?.preferredCurrency[0] ?? '',
});

export const formValuesToDoc = (formValues) => ({
  firstName: !TextInput.isEmpty(formValues.firstName)
  ? formValues.firstName
  : undefined,
  dateOfBirth: !TextInput.isEmpty(formValues.dateOfBirth)
  ? formValues.dateOfBirth
  : undefined,
  companyName: !TextInput.isEmpty(formValues.companyName)
  ? formValues.companyName
  : undefined,
  occupation: !TextInput.isEmpty(formValues.occupation)
  ? formValues.occupation
  : undefined,
  // dateOfBirth: !TextInput.isEmpty(formValues.dateOfBirth)
  // ? formValues.dateOfBirth
  // : undefined,
  // dateOfBirth: !TextInput.isEmpty(formValues.dateOfBirth)
  // ? formValues.dateOfBirth
  // : undefined,
  // dateOfBirth: !TextInput.isEmpty(formValues.dateOfBirth)
  // ? formValues.dateOfBirth
  // : undefined,
  // dateOfBirth: !TextInput.isEmpty(formValues.dateOfBirth)
  // ? formValues.dateOfBirth
  // : undefined,
  });