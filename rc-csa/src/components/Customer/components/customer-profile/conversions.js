import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (customer,customeCustomerFields, languages) => {
  
    let profile = {
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
      preferredLanguage: '',
      ageGroup: '',
      gender: '',
      preferredCurrency: '',
  }

  if(customeCustomerFields?.occupation){
    profile.occupation =customeCustomerFields?.occupation ;
  }

  if(customeCustomerFields?.preferredLanguage && customeCustomerFields?.preferredLanguage.length > 0){
    profile.preferredLanguage =customeCustomerFields?.preferredLanguage[0];
  
  }
  if(customeCustomerFields?.ageGroup && customeCustomerFields?.ageGroup.length > 0){
    profile.ageGroup =customeCustomerFields?.ageGroup[0];
  
  }
  if(customeCustomerFields?.gender && customeCustomerFields?.gender.length > 0){
    profile.gender =customeCustomerFields?.gender[0];
  
  }
  if(customeCustomerFields?.preferredCurrency && customeCustomerFields?.preferredCurrency.length > 0){
    profile.preferredCurrency =customeCustomerFields?.preferredCurrency[0];
  
  }

return profile;

};

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